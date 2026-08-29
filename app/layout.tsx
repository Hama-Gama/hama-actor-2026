// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hama-actor.com'

export const metadata: Metadata = {
	// Без этого Next не сможет резолвить относительные пути в OG/canonical
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Khamit Arkayev | Actor',
		template: '%s | Khamit Arkayev',
	},
	description:
		'Official portfolio of Khamit Arkayev — Actor and Martial Artist',
	// Фолбэк на случай, если [lang]/layout.tsx почему-то не подставит
	// свой alternates — лучше дефолт en, чем отсутствие тега вообще
	alternates: {
		canonical: baseUrl,
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return children
}
