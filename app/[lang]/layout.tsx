import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LangProvider } from '@/lib/i18n-context'
import { Toaster } from 'sonner'
import { SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/locales'

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

// Next.js заранее знает валидные значения [lang] — остальное 404-ится.
export function generateStaticParams() {
	return SUPPORTED_LOCALES.map(lang => ({ lang }))
}

// hreflang/canonical — по одной строке на язык, добавление нового языка в
// lib/locales.ts автоматически появится и здесь, руками ничего дописывать не надо.
export function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>
}): Metadata {
	const languages = Object.fromEntries(
		SUPPORTED_LOCALES.map(locale => [
			locale,
			locale === 'en'
				? 'https://hama-actor.com/'
				: `https://hama-actor.com/${locale}`,
		]),
	)

	return {
		alternates: {
			// x-default — что показать краулеру/юзеру, чей язык не входит в список
			languages: { ...languages, 'x-default': 'https://hama-actor.com/' },
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
			className={`${displayFont.variable} ${monoFont.variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<body className='bg-white text-black antialiased font-mono'>
				<LangProvider lang={lang}>
					<Toaster position='bottom-right' richColors />
					{children}
				</LangProvider>
			</body>
		</html>
	)
}
