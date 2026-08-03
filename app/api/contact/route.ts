import { NextRequest, NextResponse } from 'next/server'
import { getContactSchema } from '@/lib/validations/contact'

// Простая защита от спама через rate-limit по IP (in-memory, сбрасывается при рестарте
// сервера — для одностраничного портфолио этого достаточно; для более серьёзной
// защиты можно подключить Upstash/Vercel KV).
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 30_000

export async function POST(req: NextRequest) {
	try {
		const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
		const lastSubmission = rateLimitMap.get(ip)
		if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
			return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
		}

		const body = await req.json()
		const { locale, ...formData } = body

		const schema = getContactSchema(locale)
		const result = schema.safeParse(formData)

		if (!result.success) {
			return NextResponse.json(
				{ error: 'Validation failed', issues: result.error.issues },
				{ status: 400 }
			)
		}

		// honeypot заполнен — тихо возвращаем успех, ничего не отправляем
		if (result.data.company) {
			return NextResponse.json({ ok: true })
		}

		const { name, projectRole, deadline, preferredContact, contactValue, message } =
			result.data

		const text = [
			'🎬 Новая заявка с сайта',
			'',
			`Имя/студия: ${name}`,
			`Проект/роль: ${projectRole}`,
			deadline ? `Дедлайн: ${deadline}` : null,
			`Способ связи: ${preferredContact}`,
			`Контакт: ${contactValue}`,
			message ? `Сообщение: ${message}` : null,
		]
			.filter(Boolean)
			.join('\n')

		const botToken = process.env.TELEGRAM_BOT_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		if (!botToken || !chatId) {
			console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
			return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
		}

		const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat_id: chatId, text }),
		})

		if (!tgRes.ok) {
			throw new Error(`Telegram API error: ${tgRes.status}`)
		}

		rateLimitMap.set(ip, Date.now())

		return NextResponse.json({ ok: true })
	} catch (err) {
		console.error('Contact API error', err)
		return NextResponse.json({ error: 'Internal error' }, { status: 500 })
	}
}

/**
 * Альтернатива Telegram — если предпочитаешь email вместо/вместе с сообщением
 * в Telegram, замени блок отправки на, например, Resend (resend.com):
 *
 *   import { Resend } from 'resend'
 *   const resend = new Resend(process.env.RESEND_API_KEY)
 *   await resend.emails.send({
 *     from: 'site@yourdomain.com',
 *     to: 'your@email.com',
 *     subject: `Новая заявка: ${name}`,
 *     text,
 *   })
 *
 * Telegram выбран как основной вариант, потому что у тебя уже есть бот-подобный
 * workflow через Telegram-контакт — уведомления приходят сразу в приложение,
 * которым ты и так пользуешься, без необходимости проверять почту.
 */
