// app/api/contact/route.ts
//
// Принимает данные формы из ContactForm.tsx и должен отправить их на
// CONTACT_EMAIL. Почта берётся из переменной окружения (см.
// .env.local.example) — так её можно сменить на хостинге без правки кода
// и без коммита. Сама отправка пока не подключена — ниже TODO с тремя
// вариантами на выбор.
//
// Защита от ботов/спама — без визуальной капчи, три слоя:
//   1. honeypot (`company`) — уже проверяется общей zod-схемой (max 0 симв.)
//   2. timing-check — форма, отправленная быстрее MIN_SUBMIT_TIME_MS после
//      открытия, почти наверняка заполнена скриптом
//   3. rate limit по IP — не даёт спамить форму даже "терпеливому" боту

import { NextRequest, NextResponse } from 'next/server'
import { getContactSchema } from '@/lib/validations/contact'

const MIN_SUBMIT_TIME_MS = 2500 // быстрее 2.5с на всю форму — подозрительно
const MAX_SUBMIT_TIME_MS = 1000 * 60 * 60 * 2 // старше 2ч — протухший таймстемп

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // окно в 1 минуту
const RATE_LIMIT_MAX_REQUESTS = 3 // не больше 3 заявок с одного IP в минуту

// In-memory карта — достаточно для одного долгоживущего процесса (VPS,
// self-hosted Node). На serverless-хостинге (Vercel и т.п.) у каждого
// "холодного" инстанса функции своя карта, так что лимит на практике
// размывается между инстансами. Если это критично при масштабировании —
// вынести счётчик в Redis (например @upstash/ratelimit, есть бесплатный
// тариф на upstash.com).
const submissionsByIp = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
	const now = Date.now()
	const timestamps = (submissionsByIp.get(ip) ?? []).filter(
		t => now - t < RATE_LIMIT_WINDOW_MS,
	)

	if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
		submissionsByIp.set(ip, timestamps)
		return true
	}

	timestamps.push(now)
	submissionsByIp.set(ip, timestamps)
	return false
}

// Периодическая чистка карты, чтобы не текла память на долгоживущем
// процессе. На serverless не критично — инстанс и так пересоздаётся.
setInterval(
	() => {
		const now = Date.now()
		for (const [ip, timestamps] of submissionsByIp.entries()) {
			const fresh = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
			if (fresh.length === 0) submissionsByIp.delete(ip)
			else submissionsByIp.set(ip, fresh)
		}
	},
	5 * 60 * 1000,
).unref?.()

function getClientIp(req: NextRequest): string {
	// Прокси/CDN (в т.ч. Vercel) кладут реальный IP в x-forwarded-for —
	// это список "client, proxy1, proxy2", берём первый элемент.
	const forwardedFor = req.headers.get('x-forwarded-for')
	if (forwardedFor) return forwardedFor.split(',')[0].trim()

	const realIp = req.headers.get('x-real-ip')
	if (realIp) return realIp

	return 'unknown'
}

export async function POST(req: NextRequest) {
	const CONTACT_EMAIL = process.env.CONTACT_EMAIL

	if (!CONTACT_EMAIL) {
		// Если забыли завести .env.local (локально) или переменную на
		// хостинге — явная ошибка в логах вместо тихой отправки в никуда.
		console.error('CONTACT_EMAIL is not set — see .env.local.example')
		return NextResponse.json(
			{ ok: false, error: 'Server misconfigured' },
			{ status: 500 },
		)
	}

	const ip = getClientIp(req)
	if (isRateLimited(ip)) {
		// 429 тут не страшно "спалить" боту — сам факт частых запросов
		// и так его выдаёт, а честный человек в такой лимит почти никогда
		// не упрётся.
		return NextResponse.json(
			{ ok: false, error: 'Too many requests, try again later' },
			{ status: 429 },
		)
	}

	let body: Record<string, unknown>
	try {
		body = await req.json()
	} catch {
		return NextResponse.json(
			{ ok: false, error: 'Invalid JSON' },
			{ status: 400 },
		)
	}

	const { formLoadedAt, locale, ...formData } = body as {
		formLoadedAt?: number
		locale?: string
		[key: string]: unknown
	}

	// --- Серверная валидация ------------------------------------------------
	// Клиентская zod-схема в ContactForm.tsx — это UX, не защита: запрос
	// можно отправить в обход формы напрямую на /api/contact. Валидируем
	// те же данные ещё раз здесь. Заодно переиспользуем honeypot-правило
	// (`company`: max 0 символов) из общей схемы — двойная проверка.
	const schema = getContactSchema(
		typeof locale === 'string' ? locale : undefined,
	)
	const result = schema.safeParse(formData)

	if (!result.success) {
		const isHoneypotTriggered = result.error.issues.some(
			issue => issue.path[0] === 'company',
		)
		if (isHoneypotTriggered) {
			// Бот заполнил скрытое поле — тихий "успех", ничего не отправляем.
			return NextResponse.json({ ok: true })
		}

		return NextResponse.json(
			{ ok: false, error: 'Validation failed' },
			{ status: 400 },
		)
	}

	// --- Timing-check ---------------------------------------------------
	// Боту не нужно ждать — он шлёт POST сразу после GET. Живой человек
	// физически не заполнит форму быстрее MIN_SUBMIT_TIME_MS.
	const elapsed =
		typeof formLoadedAt === 'number' ? Date.now() - formLoadedAt : null
	const timingLooksLikeBot =
		elapsed === null ||
		elapsed < MIN_SUBMIT_TIME_MS ||
		elapsed > MAX_SUBMIT_TIME_MS

	if (timingLooksLikeBot) {
		console.warn('Contact form: timing check failed, treated as bot', {
			ip,
			elapsed,
		})
		return NextResponse.json({ ok: true })
	}

	const data = result.data

	// TODO: подключить реальную отправку письма на CONTACT_EMAIL.
	// Варианты (любой из них подставляется прямо сюда):
	//
	// 1) Resend (https://resend.com) — самый простой способ на Vercel:
	//    import { Resend } from 'resend'
	//    const resend = new Resend(process.env.RESEND_API_KEY)
	//    await resend.emails.send({
	//      from: 'Site <onboarding@resend.dev>',
	//      to: CONTACT_EMAIL,
	//      subject: `Новая заявка от ${data.name}`,
	//      text: JSON.stringify(data, null, 2),
	//    })
	//
	// 2) Nodemailer через SMTP (Gmail/Mail.ru — нужен пароль приложения):
	//    import nodemailer from 'nodemailer'
	//    const transporter = nodemailer.createTransport({
	//      host: 'smtp.mail.ru', port: 465, secure: true,
	//      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
	//    })
	//    await transporter.sendMail({
	//      from: process.env.SMTP_USER,
	//      to: CONTACT_EMAIL,
	//      subject: `Новая заявка от ${data.name}`,
	//      text: JSON.stringify(data, null, 2),
	//    })
	//
	// 3) Любой другой провайдер (SendGrid, Postmark, Telegram-бот и т.д.) —
	//    принцип тот же: CONTACT_EMAIL уже импортирован и готов к использованию.

	console.log('Contact form submission (email sending not wired up yet):', {
		to: CONTACT_EMAIL,
		data,
		ip,
	})

	return NextResponse.json({ ok: true })
}
