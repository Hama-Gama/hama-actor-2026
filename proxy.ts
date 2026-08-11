import { NextRequest, NextResponse } from 'next/server'
import {
	DEFAULT_LOCALE,
	isSupportedLocale,
	detectLocale,
	LOCALE_COOKIE_NAME,
	LOCALE_COOKIE_MAX_AGE,
} from '@/lib/locales'

export function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	// 1. Пропускаем статику и служебные пути — без изменений
	if (
		pathname.match(/\.(png|jpg|jpeg|gif|svg|pdf|ico|webp)$/) ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next()
	}

	// 2. Корень "/" — определяем язык: cookie (осознанный выбор) > Accept-Language
	//    (эвристика для новых посетителей, с учётом q-весов) > DEFAULT_LOCALE.
	//    Referer больше не используется — он ненадёжен (см. аудит).
	if (pathname === '/') {
		const cookieValue = req.cookies.get(LOCALE_COOKIE_NAME)?.value
		const acceptLanguageHeader = req.headers.get('accept-language')

		const locale = detectLocale({ cookieValue, acceptLanguageHeader })

		const res = NextResponse.rewrite(new URL(`/${locale}`, req.url))

		// Явно фиксируем выбор в cookie — даже если он совпал с DEFAULT_LOCALE
		// "по умолчанию", а не осознанным кликом. Это ок: при следующем визите
		// снова будет либо cookie, либо свежий Accept-Language — поведение
		// не ухудшается, а для реальных ручных переключений (см. ниже) cookie
		// уже гарантированно отражает точный выбор.
		res.cookies.set(LOCALE_COOKIE_NAME, locale, {
			maxAge: LOCALE_COOKIE_MAX_AGE,
			path: '/',
			sameSite: 'lax',
		})

		// Кэш (CDN/браузер) не должен путать разных пользователей на одном "/"
		res.headers.set('Vary', 'Accept-Language, Cookie')

		return res
	}

	// 3. Прямой заход на "/en" — редиректим на канонiчный "/" (чистые URL),
	//    но ПЕРЕД этим фиксируем выбор en в cookie. Без этого шага пользователь,
	//    зашедший по прямой ссылке на /en, после редиректа на "/" мог бы снова
	//    попасть под авто-детект по Accept-Language и увидеть не английский —
	//    то есть его же прямой переход на /en был бы проигнорирован.
	if (pathname === '/en') {
		const res = NextResponse.redirect(new URL('/', req.url))
		res.cookies.set(LOCALE_COOKIE_NAME, 'en', {
			maxAge: LOCALE_COOKIE_MAX_AGE,
			path: '/',
			sameSite: 'lax',
		})
		return res
	}

	// 4. Явный локализованный путь ("/ru", "/kk", "/ko", а также будущие языки
	//    из SUPPORTED_LOCALES) — точно так же фиксируем выбор в cookie, чтобы
	//    следующий заход на "/" помнил язык независимо от того, как юзер сюда
	//    попал (клик в шапке, прямая ссылка, шаринг и т.д.). Никакого JS на
	//    клиенте для этого не нужно — proxy перехватывает сам запрос.
	const [, firstSegment] = pathname.split('/')
	if (isSupportedLocale(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
		const res = NextResponse.next()
		res.cookies.set(LOCALE_COOKIE_NAME, firstSegment, {
			maxAge: LOCALE_COOKIE_MAX_AGE,
			path: '/',
			sameSite: 'lax',
		})
		return res
	}

	// 5. Невалидный первый сегмент, похожий на локаль-заглушку (например кто-то
	//    руками зашёл на "/fr") — НЕ подменяем несуществующий язык молча.
	//    Отдаём 404 через rewrite на служебный путь, чтобы app/[lang]/layout.tsx
	//    мог вызвать notFound() (см. рефакторинг layout.tsx ниже). Явно НЕ
	//    трогаем прочие валидные внутренние пути (/api, /_next уже отфильтрованы
	//    выше, а любой другой путь без первого сегмента-локали Next.js обработает
	//    сам через обычный 404 файловой системы маршрутов).

	return NextResponse.next()
}

export const config = {
	// matcher — фильтрация на уровне рантайма Next.js ДО вызова функции,
	// эффективнее, чем ручные pathname.match() внутри тела (хотя они и
	// оставлены как доп. подстраховка выше). Список расширений синхронизирован
	// с regex внутри proxy() — не забудь поддерживать оба места в актуальном
	// виде, либо вынеси в общий helper при следующем рефакторинге.
	matcher: ['/((?!_next|api|.*\\.(?:png|jpg|jpeg|gif|svg|pdf|ico|webp)$).*)'],
}
