'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { SiGoogledrive } from 'react-icons/si'
import Image from 'next/image'
import VimeoPlayer from '@vimeo/player'

type ShowReelProps = {
	locale?: string
}

const VIMEO_URL = 'https://player.vimeo.com/video/222087977?h=f80f6ce383'
const DRIVE_URL =
	'https://drive.google.com/drive/folders/1vFiCIkv9dQ1EDjQlkZpD7NOSSRaNbiy6?usp=sharing'

// Вынесено за пределы компонента — раньше пересоздавалось на каждый рендер,
// из-за чего useMemo ниже фактически не работал
const TRANSLATIONS = {
	en: {
		heading: 'Showreels',
		drive: 'Raw Materials (Drive)',
		reels: {
			main: { title: 'Main Showreel', category: 'General Portfolio' },
			drama: { title: 'Drama Showreel', category: 'Acting / Dialogue' },
			action: { title: 'Action Showreel', category: 'Martial Arts / Stunts' },
			selftape: { title: 'Self-Tape / Slate', category: 'Introduction' },
		},
	},
	ru: {
		heading: 'Шоурилы',
		drive: 'Исходники (Drive)',
		reels: {
			main: { title: 'Основной шоурил', category: 'Общее портфолио' },
			drama: { title: 'Драматический шоурил', category: 'Актёрская игра' },
			action: { title: 'Экшен шоурил', category: 'Боевые искусства' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Представление' },
		},
	},
	kk: {
		heading: 'Шоурилдер',
		drive: 'Материалдар (Drive)',
		reels: {
			main: { title: 'Негізгі шоурил', category: 'Жалпы портфолио' },
			drama: { title: 'Драмалық шоурил', category: 'Актёрлік шеберлік' },
			action: { title: 'Экшен шоурил', category: 'Жекпе-жек өнері' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Таныстыру' },
		},
	},
	ko: {
		heading: '쇼릴',
		drive: '자료 다운로드 (Drive)',
		reels: {
			main: { title: '메인 쇼릴', category: '전체 포트폴리오' },
			drama: { title: '드라마 쇼릴', category: '연기 / 대사' },
			action: { title: '액션 쇼릴', category: '무술 / 스턴트' },
			selftape: { title: '셀프테이프', category: '자기소개' },
		},
	},
} as const

function normalizeLocale(locale?: string): keyof typeof TRANSLATIONS {
	if (!locale) return 'en'
	const value = locale.toLowerCase()
	if (value.startsWith('ru')) return 'ru'
	if (value.startsWith('kk') || value.startsWith('kz')) return 'kk'
	if (value.startsWith('ko')) return 'ko'
	return 'en'
}

type Reel = {
	id: string
	thumb: string
	url: string
	title: string
	category: string
}

function ShowreelCard({ reel }: { reel: Reel }) {
	const cardRef = useRef<HTMLDivElement>(null)
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const playerRef = useRef<VimeoPlayer | null>(null)

	const [shouldPreload, setShouldPreload] = useState(false)
	const [playing, setPlaying] = useState(false)

	// Как только карточка приближается к вьюпорту (за 600px до появления) —
	// монтируем скрытый iframe и начинаем прогрев буфера
	useEffect(() => {
		if (!cardRef.current || shouldPreload) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldPreload(true)
					observer.disconnect()
				}
			},
			{ rootMargin: '600px 0px' }
		)
		observer.observe(cardRef.current)
		return () => observer.disconnect()
	}, [shouldPreload])

	// Инициализируем Vimeo Player сразу после монтирования iframe
	useEffect(() => {
		if (!shouldPreload || !iframeRef.current || playerRef.current) return

		const player = new VimeoPlayer(iframeRef.current)
		playerRef.current = player

		return () => {
			player.unload().catch(() => {})
			playerRef.current = null
		}
	}, [shouldPreload])

	const handlePlay = useCallback(() => {
		setPlaying(true)
		playerRef.current?.play().catch(() => {})
	}, [])

	return (
		<div
			ref={cardRef}
			className='group relative overflow-hidden rounded-xl bg-neutral-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(217,4,22,0.15)]'
		>
			<div className='relative aspect-video w-full bg-black overflow-hidden rounded-2xl'>
				{shouldPreload && (
					<iframe
						ref={iframeRef}
						src={`${reel.url}&autoplay=0`}
						title={reel.title}
						className={`absolute inset-0 h-full w-full rounded-xl transition-opacity duration-300 ${
							playing ? 'opacity-100' : 'opacity-0 pointer-events-none'
						}`}
						allow='autoplay; fullscreen'
						allowFullScreen
					/>
				)}

				{!playing && (
					<button
						type='button'
						aria-label={`Play ${reel.title}`}
						className='absolute inset-0 block h-full w-full cursor-pointer'
						onClick={handlePlay}
					>
						<Image
							src={reel.thumb}
							alt={reel.title}
							fill
							className='object-cover transition-transform duration-1000 group-hover:scale-105'
							sizes='(max-width: 768px) 100vw, 50vw'
						/>
						<div className='absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/30' />
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d90416] group-hover:border-[#d90416]'>
								<Play fill='currentColor' size={24} className='ml-1' />
							</div>
						</div>
						<div className='absolute inset-x-0 bottom-0 p-8 text-left'>
							<span className='mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#d90416]'>
								{reel.category}
							</span>
							<h3 className='font-display text-2xl md:text-3xl font-bold leading-tight text-white'>
								{reel.title}
							</h3>
						</div>
					</button>
				)}
			</div>
		</div>
	)
}

export const ShowReel = ({ locale }: ShowReelProps) => {
	const resolvedLocale = normalizeLocale(locale)
	const t = TRANSLATIONS[resolvedLocale]

	const reelsData = useMemo<Reel[]>(
		() => [
			{ id: 'main', thumb: '/thumbnails/1.webp', url: VIMEO_URL, ...t.reels.main },
			{ id: 'drama', thumb: '/thumbnails/2.webp', url: VIMEO_URL, ...t.reels.drama },
			{ id: 'action', thumb: '/thumbnails/3.webp', url: VIMEO_URL, ...t.reels.action },
			{ id: 'selftape', thumb: '/thumbnails/4.webp', url: VIMEO_URL, ...t.reels.selftape },
		],
		[t]
	)

	return (
		<section className='container mx-auto px-4 py-8' id='showreels'>
			<div className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6'>
				<div className='flex items-center gap-6'>
					<div className='h-12 w-[3px] bg-[#d90416]' />
					<h2 className='font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter text-black'>
						{t.heading}
					</h2>
				</div>

				<a
					href={DRIVE_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-3 px-5 py-2.5 border border-neutral-200 rounded-sm hover:bg-neutral-50 transition-all group'
				>
					<SiGoogledrive
						className='text-neutral-400 group-hover:text-[#34A853] transition-colors'
						size={18}
					/>
					<span className='font-mono text-[10px] uppercase tracking-widest font-bold text-neutral-600'>
						{t.drive}
					</span>
				</a>
			</div>

			<div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
				{reelsData.map(reel => (
					<ShowreelCard key={reel.id} reel={reel} />
				))}
			</div>
		</section>
	)
}