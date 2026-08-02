import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['ru', 'kk', 'ko']
const DEFAULT_LOCALE = 'en'

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	// 1. Пропускаем статику
	if (
		pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|ico|webp)$/) ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next()
	}

	// 2. Если зашли на корень "/"
	if (pathname === '/') {
		const referer = req.headers.get('referer')
		const acceptLang = req.headers.get('accept-language') || ''

		// Если кликнули "EN" в меню (referer есть) — принудительно показываем английский
		if (referer && referer.includes(req.nextUrl.host)) {
			return NextResponse.rewrite(new URL('/en', req.url))
		}

		// Авто-определение только для новых посетителей
		if (acceptLang.includes('ru'))
			return NextResponse.redirect(new URL('/ru', req.url))
		if (acceptLang.includes('kk') || acceptLang.includes('kz'))
			return NextResponse.redirect(new URL('/kk', req.url))
		if (acceptLang.includes('ko'))
			return NextResponse.redirect(new URL('/ko', req.url))

		// По умолчанию делаем REWRITE на /en (чтобы не было 404)
		return NextResponse.rewrite(new URL('/en', req.url))
	}

	// 3. Если кто-то ввел /en вручную — убираем его для красоты (опционально)
	if (pathname === '/en') {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return NextResponse.next()
}
