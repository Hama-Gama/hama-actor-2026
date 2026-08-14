'use client'

import React, { useCallback, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import { SiGoogledrive } from 'react-icons/si'
import Image from 'next/image'

type ShowReelProps = {
	locale?: string
}

const VIMEO_URL = 'https://player.vimeo.com/video/222087977?h=f80f6ce383'
const DRIVE_URL =
	'https://drive.google.com/drive/folders/1vFiCIkv9dQ1EDjQlkZpD7NOSSRaNbiy6?usp=sharing'

// Домены, к которым реально обращается Vimeo-плеер при инициализации.
// Дублирует статический <link rel="preconnect"> из layout.tsx (см. заметку
// в конце файла) — этот, точечный, срабатывает только по намерению
// пользователя навести/тапнуть на карточку главного видео, а не по таймеру
// на весь сайт. Без crossOrigin: iframe грузится обычной навигацией без
// CORS, так что "anonymous" соединение браузер бы просто не переиспользовал.
const WARM_UP_ORIGINS = [
	'https://player.vimeo.com',
	'https://f.vimeocdn.com',
	'https://i.vimeocdn.com',
]

// Network Information API — есть не во всех браузерах и не описана в
// стандартных типах DOM lib.dom.d.ts, поэтому объявляем свой минимальный тип
// и расширяем им Navigator через intersection — без хрупких ts-ignore/expect-error,
// которые легко ломаются при форматировании кода.
type NetworkInformation = {
	saveData?: boolean
	effectiveType?: string
}

function isSlowConnection(): boolean {
	if (typeof navigator === 'undefined') return false
	const nav = navigator as Navigator & {
		connection?: NetworkInformation
		mozConnection?: NetworkInformation
		webkitConnection?: NetworkInformation
	}
	const conn = nav.connection || nav.mozConnection || nav.webkitConnection
	if (!conn) return false
	if (conn.saveData) return true
	if (conn.effectiveType && /2g/.test(conn.effectiveType)) return true
	return false
}

const TRANSLATIONS = {
	en: {
		heading: 'Showreels',
		close: 'Close',
		reels: {
			main: { title: 'Main Showreel', category: 'General Portfolio' },
			drama: { title: 'Drama Showreel', category: 'Acting / Dialogue' },
			action: { title: 'Action Showreel', category: 'Martial Arts / Stunts' },
			selftape: { title: 'Self-Tape / Slate', category: 'Introduction' },
		},
	},
	ru: {
		heading: 'Шоурилы',
		close: 'Закрыть',
		reels: {
			main: { title: 'Основной шоурил', category: 'Общее портфолио' },
			drama: { title: 'Драматический шоурил', category: 'Актёрская игра' },
			action: { title: 'Экшен шоурил', category: 'Боевые искусства' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Представление' },
		},
	},
	kk: {
		heading: 'Шоурилдер',
		close: 'Жабу',
		reels: {
			main: { title: 'Негізгі шоурил', category: 'Жалпы портфолио' },
			drama: { title: 'Драмалық шоурил', category: 'Актёрлік шеберлік' },
			action: { title: 'Экшен шоурил', category: 'Жекпе-жек өнері' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Таныстыру' },
		},
	},
	ko: {
		heading: '쇼릴',
		close: '닫기',
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

// Точечный прогрев соединения по намерению пользователя: hover (десктоп)
// или touchstart (мобильные) над карточкой главного видео. Срабатывает
// один раз, ничего не грузит на медленном/экономном соединении
// (Data Saver, 2G) — там пользователю важнее не тратить канал впустую,
// чем выиграть 100-300мс на открытии плеера.
function useVimeoWarmupOnIntent() {
	const warmedUp = useRef(false)

	return useCallback(() => {
		if (warmedUp.current) return
		if (isSlowConnection()) return
		warmedUp.current = true

		WARM_UP_ORIGINS.forEach(origin => {
			const link = document.createElement('link')
			link.rel = 'preconnect'
			link.href = origin
			document.head.appendChild(link)
		})
	}, [])
}

// Карточка теперь только показывает превью + кнопку play — само видео
// (iframe) больше не грузится внутри карточки вообще, только по клику
// в модалке. Это заодно чинит и производительность: раньше iframe
// подгружался заранее через IntersectionObserver даже если юзер так и не
// нажал play.
function ShowreelCard({
	reel,
	onPlay,
	onWarmup,
}: {
	reel: Reel
	onPlay: (reel: Reel) => void
	onWarmup?: () => void
}) {
	return (
		<div className='group relative overflow-hidden rounded-lg sm:rounded-xl bg-neutral-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(217,4,22,0.15)]'>
			<div className='relative aspect-video w-full bg-black overflow-hidden rounded-lg sm:rounded-2xl'>
				<button
					type='button'
					aria-label={`Play ${reel.title}`}
					className='absolute inset-0 block h-full w-full cursor-pointer'
					onClick={() => onPlay(reel)}
					onMouseEnter={onWarmup}
					onTouchStart={onWarmup}
				>
					<Image
						src={reel.thumb}
						alt={reel.title}
						fill
						className='object-cover transition-transform duration-1000 group-hover:scale-105'
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'
					/>
					<div className='absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/30' />
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 2xl:h-20 2xl:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d90416] group-hover:border-[#d90416]'>
							<Play
								fill='currentColor'
								size={22}
								className='ml-1 sm:w-6 sm:h-6'
							/>
						</div>
					</div>
					<div className='absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 2xl:p-10 text-left'>
						<span className='mb-1.5 sm:mb-2 block font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#d90416]'>
							{reel.category}
						</span>
						<h3 className='font-display text-lg sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold leading-tight text-white'>
							{reel.title}
						</h3>
					</div>
				</button>
			</div>
		</div>
	)
}

export const ShowReel = ({ locale }: ShowReelProps) => {
	const resolvedLocale = normalizeLocale(locale)
	const t = TRANSLATIONS[resolvedLocale]

	const [activeReel, setActiveReel] = useState<Reel | null>(null)

	const reelsData: Reel[] = [
		{
			id: 'main',
			thumb: '/thumbnails/1.webp',
			url: VIMEO_URL,
			...t.reels.main,
		},
		{
			id: 'drama',
			thumb: '/thumbnails/2.webp',
			url: VIMEO_URL,
			...t.reels.drama,
		},
		{
			id: 'action',
			thumb: '/thumbnails/3.webp',
			url: VIMEO_URL,
			...t.reels.action,
		},
		{
			id: 'selftape',
			thumb: '/thumbnails/4.webp',
			url: VIMEO_URL,
			...t.reels.selftape,
		},
	]

	// Прогрев соединения только для главного (самого частокликаемого)
	// видео, и только по намерению пользователя (hover/touch), а не
	// автоматически всем подряд.
	const warmupMainReel = useVimeoWarmupOnIntent()

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 scroll-mt-24'
			id='showreels'
		>
			<div className='mb-6 sm:mb-8 flex items-center justify-between gap-4 w-full'>
				<div className='flex items-center gap-4 sm:gap-6'>
					<div className='h-10 w-[3px] sm:h-12 2xl:h-14 bg-[#d90416]' />
					<h2 className='font-display text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold uppercase tracking-tighter text-black'>
						{t.heading}
					</h2>
				</div>

				<a
					href={DRIVE_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white group shrink-0'
				>
					<SiGoogledrive
						className='text-black group-hover:text-white transition-colors shrink-0'
						size={14}
					/>
					<span className='font-mono text-[10px] 2xl:text-xs uppercase font-bold tracking-wider whitespace-nowrap'>
						Google Drive
					</span>
				</a>
			</div>

			<div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 xl:gap-12 2xl:gap-16'>
				{reelsData.map(reel => (
					<ShowreelCard
						key={reel.id}
						reel={reel}
						onPlay={setActiveReel}
						onWarmup={reel.id === 'main' ? warmupMainReel : undefined}
					/>
				))}
			</div>

			{/* Модалка с видео — открывается по клику на play у любой карточки */}
			{activeReel && (
				<div
					className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
					onClick={() => setActiveReel(null)}
				>
					<div
						className='relative w-full max-w-3xl 2xl:max-w-4xl'
						onClick={e => e.stopPropagation()}
					>
						<button
							type='button'
							onClick={() => setActiveReel(null)}
							className='absolute -top-10 right-0 flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest cursor-pointer'
						>
							{t.close} <X size={16} />
						</button>

						<div className='relative aspect-video w-full bg-black rounded-sm overflow-hidden'>
							<iframe
								src={`${activeReel.url}&autoplay=1`}
								title={activeReel.title}
								className='absolute inset-0 h-full w-full'
								allow='autoplay; fullscreen; picture-in-picture'
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
