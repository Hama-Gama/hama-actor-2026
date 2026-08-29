import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
	isSupportedLocale,
	type Locale,
} from '@/lib/locales'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Khamit Arkayev — Actor'

// Текст на самой картинке — специально короткий и без диакритики/сложной
// вязи там, где шрифт может её не потянуть (see примечание про ko ниже).
const ogContent: Record<Locale, { title: string; subtitle: string }> = {
	en: { title: 'KHAMIT ARKAYEV', subtitle: 'Actor & Martial Artist' },
	ru: { title: 'ХАМИТ АРКАЕВ', subtitle: 'Актёр и мастер боевых искусств' },
	kk: { title: 'ХАМИТ АРКАЕВ', subtitle: 'Актёр және жекпе-жек шебері' },
	ko: { title: '하밋 아르카예프', subtitle: '배우 겸 무술가' },
}

export default async function Image({
	params,
}: {
	params: Promise<{ lang: string }>
}) {
	const { lang } = await params
	const locale: Locale = isSupportedLocale(lang) ? lang : 'en'
	const { title, subtitle } = ogContent[locale]

	// Читаем фото с диска и кодируем в base64 — Satori (движок ImageResponse)
	// не умеет надёжно резолвить относительные пути к public/ на рантайме
	// Vercel, а data URI работает всегда, независимо от окружения.
	const photoData = await readFile(
		join(process.cwd(), 'public', 'og-photo.jpg'),
	)
	const photoSrc = `data:image/jpeg;base64,${photoData.toString('base64')}`

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				position: 'relative',
				backgroundColor: '#000000',
				color: '#ffffff',
				fontFamily: 'sans-serif',
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element -- Satori/ImageResponse
не поддерживает next/image, только обычный <img>; LCP тут не применим */}
			<img
				src={photoSrc}
				width={size.width}
				height={size.height}
				alt="Khamit Arkayev — Actor"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background:
						'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 100%)',
				}}
			/>

			{/* Текстовый блок прижат к низу — тот же паттерн, что и красная
				полоса в фавиконке (акцент снизу кадра) */}
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					width: '100%',
					height: '100%',
					padding: '0 60px 56px',
				}}
			>
				<div
					style={{
						fontSize: 18,
						letterSpacing: 8,
						textTransform: 'uppercase',
						color: '#d90416',
						fontWeight: 700,
						marginBottom: 16,
					}}
				>
					{'// Portfolio'}
				</div>
				<div
					style={{
						fontSize: 72,
						fontWeight: 700,
						letterSpacing: -2,
						textTransform: 'uppercase',
						fontStyle: 'italic',
						lineHeight: 1,
					}}
				>
					{title}
				</div>
				<div
					style={{
						fontSize: 26,
						color: '#d4d4d4',
						marginTop: 14,
					}}
				>
					{subtitle}
				</div>
				{/* Красная полоса снизу — прямая отсылка к фавиконке */}
				<div
					style={{
						width: 120,
						height: 6,
						backgroundColor: '#d90416',
						marginTop: 28,
					}}
				/>
			</div>
		</div>,
		{ ...size },
	)
}
