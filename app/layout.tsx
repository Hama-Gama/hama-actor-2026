// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Khamit Arkayev | Actor',
	description:
		'Official portfolio of Khamit Arkayev - Actor and Martial Artist',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// В Next.js 16 для i18n корень просто пробрасывает детей дальше в [lang]
	return children
}
