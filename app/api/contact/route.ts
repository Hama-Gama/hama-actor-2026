// app/api/contact/route.ts
//
// Принимает данные формы из ContactForm.tsx и отправляет их на CONTACT_EMAIL
// через Resend. Почта и API-ключ берутся из переменных окружения (см.
// .env.local.example) — так их можно сменить на хостинге без правки кода
// и без коммита.
//
// Защита от ботов/спама — без визуальной капчи, три слоя:
//   1. honeypot (`company`) — уже проверяется общей zod-схемой (max 0 симв.)
//   2. timing-check — форма, отправленная быстрее MIN_SUBMIT_TIME_MS после
//      открытия, почти наверняка заполнена скриптом
//   3. rate limit по IP — не даёт спамить форму даже "терпеливому" боту

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
	getContactSchema,
	type ContactFormValues,
} from '@/lib/validations/contact'

const MIN_SUBMIT_TIME_MS = 2500 // быстрее 2.5с на всю форму — подозрительно
const MAX_SUBMIT_TIME_MS = 1000 * 60 * 60 * 2 // старше 2ч — протухший таймстемп

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // окно в 1 минуту
const RATE_LIMIT_MAX_REQUESTS = 3 // не больше 3 заявок с одного IP в минуту

// In-memory карта — трафик небольшой, договорились оставить как есть (см.
// обсуждение про Vercel/Upstash/Arcjet). Если со временем в логах увидите
// подозрительный паттерн — вернуться к этому вопросу.
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
	const forwardedFor = req.headers.get('x-forwarded-for')
	if (forwardedFor) return forwardedFor.split(',')[0].trim()

	const realIp = req.headers.get('x-real-ip')
	if (realIp) return realIp

	return 'unknown'
}

// Человекочитаемая подпись способа связи — для тела письма.
const CONTACT_METHOD_LABELS: Record<
	ContactFormValues['preferredContact'],
	string
> = {
	telegram: 'Telegram',
	whatsapp: 'WhatsApp',
	wechat: 'WeChat',
	kakaotalk: 'KakaoTalk',
	phone: 'Phone Call',
	email: 'Email',
	other: 'Other',
}


// Дата и время отправки — фиксированный часовой пояс Asia/Almaty, чтобы не
// зависеть от того, где физически стоит сервер Vercel (обычно US, время
// сервера сбило бы с толку в письме).
function formatSubmittedAt(): string {
	return new Intl.DateTimeFormat('ru-RU', {
		timeZone: 'Asia/Almaty',
		dateStyle: 'medium',
		timeStyle: 'short',
	}).format(new Date())
}

function buildEmailText(data: ContactFormValues): string {
	const methodLabel =
		data.preferredContact === 'other' && data.otherMethodLabel
			? data.otherMethodLabel
			: CONTACT_METHOD_LABELS[data.preferredContact]

	const lines = [
		`Name / Studio: ${data.name}`,
		`Project & Role: ${data.projectRole}`,
		data.deadline ? `Deadline: ${data.deadline}` : null,
		`Preferred contact: ${methodLabel}`,
		`Contact value: ${data.contactValue}`,
		`Submitted at: ${formatSubmittedAt()} (Asia/Almaty)`,
		data.message ? `\nMessage:\n${data.message}` : null,
	]

	return lines.filter(Boolean).join('\n')
}

export async function POST(req: NextRequest) {
	const CONTACT_EMAIL = process.env.CONTACT_EMAIL
	const RESEND_API_KEY = process.env.RESEND_API_KEY

	if (!CONTACT_EMAIL || !RESEND_API_KEY) {
		// Если забыли завести .env.local (локально) или переменные на
		// хостинге — явная ошибка в логах вместо тихой отправки в никуда.
		console.error(
			'CONTACT_EMAIL or RESEND_API_KEY is not set — see .env.local.example',
		)
		return NextResponse.json(
			{ ok: false, error: 'Server misconfigured' },
			{ status: 500 },
		)
	}

	const ip = getClientIp(req)
	if (isRateLimited(ip)) {
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

	// --- Отправка письма через Resend ---------------------------------------
	// onboarding@resend.dev — тестовый адрес Resend, работает без своего
	// домена, но может слать ТОЛЬКО на email, которым зарегистрирован
	// аккаунт Resend (то есть должен совпадать с CONTACT_EMAIL). Если позже
	// заведёте свой домен и верифицируете его в Resend — поменяйте `from`
	// на адрес с этого домена, тогда сможете слать куда угодно.
	const resend = new Resend(RESEND_API_KEY)

	try {
		const { error } = await resend.emails.send({
			from: 'Hama Actor Site <onboarding@resend.dev>',
			to: CONTACT_EMAIL,
			replyTo:
				data.preferredContact === 'email' ? data.contactValue : undefined,
			subject: `Новая заявка с сайта от ${data.name}`,
			text: buildEmailText(data),
		})

		if (error) {
			console.error('Resend error:', error)
			return NextResponse.json(
				{ ok: false, error: 'Email sending failed' },
				{ status: 502 },
			)
		}
	} catch (err) {
		console.error('Unexpected error sending email:', err)
		return NextResponse.json(
			{ ok: false, error: 'Email sending failed' },
			{ status: 502 },
		)
	}

	return NextResponse.json({ ok: true })
}
