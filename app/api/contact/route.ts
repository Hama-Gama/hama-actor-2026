// app/api/contact/route.ts
//
// Принимает данные формы из ContactForm.tsx и должен отправить их на
// CONTACT_EMAIL. Почта берётся из переменной окружения (см.
// .env.local.example) — так её можно сменить на хостинге без правки кода
// и без коммита. Сама отправка пока не подключена — ниже TODO с тремя
// вариантами на выбор.

import { NextRequest, NextResponse } from 'next/server'

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

	const data = await req.json()

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
	})

	return NextResponse.json({ ok: true })
}
