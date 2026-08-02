import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import { LangProvider } from '@/lib/i18n-context'
import { Toaster } from 'react-hot-toast' // Используем стандартный Toaster

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

	return (
		<html
			lang={lang}
			className={`${displayFont.variable} ${monoFont.variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<body className='bg-white text-black antialiased font-mono'>
				<LangProvider lang={lang}>
					<Toaster position='bottom-right' />
					{children}
				</LangProvider>
			</body>
		</html>
	)
}
