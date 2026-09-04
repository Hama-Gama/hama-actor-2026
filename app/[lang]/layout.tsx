import {
	Cormorant_Garamond,
	DM_Mono,
	JetBrains_Mono,
	Noto_Serif_KR,
} from 'next/font/google'
import localFont from 'next/font/local'


import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LangProvider } from '@/lib/i18n-context'
import { Toaster } from 'sonner'
import {
	SUPPORTED_LOCALES,
	isSupportedLocale,
	type Locale,
} from '@/lib/locales'

const displayFont = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-display',
	display: 'swap',
})

const monoFont = DM_Mono({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-mono',
	display: 'swap',
})

// Кириллица (ru/kk) — DM Mono официально не поддерживает cyrillic (только
// latin), поэтому для этих локалей используем другой моно-шрифт с тем же
// характером и той же CSS-переменной --font-mono. На <html> подключается
// только ОДИН из mono-шрифтов (см. monoFontByLocale ниже) — они не
// конфликтуют, потому что каждый рендерится на отдельной локали/странице.
const monoFontCyrillic = JetBrains_Mono({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500'],
	variable: '--font-mono',
	display: 'swap',
})

// Pretendard — де-факто стандарт для корейских сайтов (Toss, Naver и
// большинство корейских продуктов используют именно его): спроектирован
// как замена системному шрифту, метрика подогнана под Apple SD Gothic
// Neo/Malgun Gothic, поэтому корейский текст выглядит "родным". В Google
// Fonts его нет — используем next/font/local с файлом из пакета
// pretendard (см. app/fonts/PretendardVariable.woff2).
const monoFontKorean = localFont({
	src: '../fonts/PretendardVariable.woff2',
	weight: '45 920', // вариативный шрифт, диапазон осей веса
	variable: '--font-mono',
	display: 'swap',
})
// Cormorant Garamond не поддерживает корейский вообще — для заголовков
// (font-display) на корейской версии нужна отдельная засечка с хангылем.
// См. комментарий выше про subsets/preload для CJK.
const displayFontKorean = Noto_Serif_KR({
	weight: ['400', '500', '600', '700'],
	variable: '--font-display',
	preload: false,
	display: 'swap',
})

// По локали выбираем, какой именно шрифт займёт CSS-переменные
// --font-mono / --font-display. Компоненты (ContactForm.tsx и т.д.)
// ничего не знают об этом переключении — они как использовали
// className='font-mono'/'font-display', так и используют.
const monoFontByLocale: Record<Locale, { variable: string }> = {
	en: monoFont,
	ru: monoFontCyrillic,
	kk: monoFontCyrillic,
	ko: monoFontKorean,
}

const displayFontByLocale: Record<Locale, { variable: string }> = {
	en: displayFont,
	ru: displayFont,
	kk: displayFont,
	ko: displayFontKorean,
}

// Домен вынесен в константу — используется и в hreflang, и в OG/canonical
// ниже. Меняешь один раз здесь (или через .env), а не по всему файлу.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hama-actor.com'

// Next.js заранее знает валидные значения [lang] — остальное 404-ится.
export function generateStaticParams() {
	return SUPPORTED_LOCALES.map(lang => ({ lang }))
}

// Title/description по языкам — единственное место, где они заданы для
// метатегов (не путать с UI-переводами в ContactForm/Contacts — те для
// видимого текста, эти для <title>/OG/поисковой выдачи).
const content: Record<Locale, { title: string; description: string }> = {
	en: {
		title: 'Khamit Arkayev | Actor',
		description:
			'Official portfolio of Khamit Arkayev — Actor and Martial Artist',
	},
	ru: {
		title: 'Хамит Аркаев | Актёр',
		description:
			'Официальное портфолио Хамита Аркаева — актёра и мастера боевых искусств',
	},
	kk: {
		title: 'Хамит Аркаев | Актёр',
		description:
			'Хамит Аркаевтың ресми портфолиосы — актёр және жекпе-жек шебері',
	},
	ko: {
		title: '하밋 아르카예프 | 배우',
		description: '배우이자 무술가 하밋 아르카예프의 공식 포트폴리오',
	},
}

// JSON-LD Person — помогает Google показать Knowledge Panel / rich snippet
// с фото, профессией и ссылками на соцсети. sameAs собран из реальных
// href в Contacts.tsx — Kakao (href='#') и WeChat (без href) намеренно
// не включены, добавь их сюда, когда появятся настоящие ссылки.
function getPersonJsonLd(locale: Locale) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Khamit Arkayev',
		alternateName: content[locale].title.replace(' | Actor', ''),
		jobTitle: 'Actor',
		description: content[locale].description,
		url: locale === 'en' ? `${baseUrl}/` : `${baseUrl}/${locale}`,
		sameAs: [
			'https://wa.me/hama_gamma',
			'https://t.me/hama_gamma',
			'https://instagram.com/hama_gamma',
		],
	}
}

// hreflang/canonical — по одной строке на язык, добавление нового языка в
// lib/locales.ts автоматически появится и здесь, руками ничего дописывать не надо.
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>
}): Promise<Metadata> {
	const { lang } = await params
	// Мусорный сегмент долетит и сюда — фолбэк на en, чтобы не отдавать
	// пустые метатеги; итоговый 404 всё равно отрендерит LocaleLayout.
	const locale: Locale = isSupportedLocale(lang) ? lang : 'en'
	const { title, description } = content[locale]
	const path = locale === 'en' ? '/' : `/${locale}`
	const url = `${baseUrl}${path}`

	const languages = Object.fromEntries(
		SUPPORTED_LOCALES.map(l => [
			l,
			l === 'en' ? `${baseUrl}/` : `${baseUrl}/${l}`,
		]),
	)

	return {
		// title.absolute — заголовок уже полный ("Khamit Arkayev | Actor"),
		// подстановка в template из app/layout.tsx ('%s | Khamit Arkayev')
		// задублировала бы имя в конце <title>. absolute отключает template.
		title: { absolute: title },
		description,
		alternates: {
			canonical: url,
			// x-default — что показать краулеру/юзеру, чей язык не входит в список
			languages: { ...languages, 'x-default': `${baseUrl}/` },
		},
		openGraph: {
			title,
			description,
			url,
			siteName: 'Khamit Arkayev',
			locale,
			type: 'profile',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lang: string }>
}) {
	// Обязательный await для params в новых версиях Next.js
	const resolvedParams = await params
	const lang = resolvedParams.lang

	// Явная защита от мусорных сегментов вида /fr, /xx — раньше такие пути
	// молча рендерились с частично неверным фолбэком текста (см. аудит,
	// п.4). Теперь — честный 404 вместо бесконечных дублей для краулера.
	if (!isSupportedLocale(lang)) {
		notFound()
	}

	return (
		<html
			lang={lang}
			className={`${displayFontByLocale[lang].variable} ${monoFontByLocale[lang].variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<head>
				{/* Favicon — Н (Hama) жирным гротеском на чёрном + красная полоса #d90416,
				отдельно от Cormorant Garamond заголовков: засечки нечитаемы на 16px */}
				<link rel='icon' href='/favicon-32x32.png' sizes='32x32' />
				<link rel='icon' href='/favicon-16x16.png' sizes='16x16' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />

				{/* JSON-LD структурированные данные — Person schema для rich results.
				lang уже сужен до Locale проверкой isSupportedLocale + notFound() выше —
				явный каст `as Locale` тут избыточен и ловился линтером. */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(getPersonJsonLd(lang)),
					}}
				/>

				{/* Прогрев соединения с Vimeo до того, как понадобится плеер —
				самая ранняя точка (ещё до гидратации React), где это имеет смысл.
				Точечный hover/touch-прогрев для главного видео — в ShowReel.tsx. */}
				<link rel='preconnect' href='https://player.vimeo.com' />
				<link rel='preconnect' href='https://f.vimeocdn.com' />
				<link rel='preconnect' href='https://i.vimeocdn.com' />
			</head>
			<body className='bg-white text-black antialiased font-mono'>
				<LangProvider lang={lang}>
					<Toaster position='bottom-right' richColors />
					{children}
				</LangProvider>
			</body>
		</html>
	)
}
