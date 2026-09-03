'use client'

import React, { useCallback, useRef, useState } from 'react'
import { Play, X, Clock } from 'lucide-react'
import { SiGoogledrive } from 'react-icons/si'
import Image from 'next/image'
import {
	SHOWREELS,
	SHOWREEL_LINKS,
	SHOWREEL_TRANSLATIONS,
	WARM_UP_ORIGINS,
} from '@/lib/showreel-config'

type ShowReelProps = {
	locale?: string
}

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

function normalizeLocale(locale?: string): keyof typeof SHOWREEL_TRANSLATIONS {
	if (!locale) return 'en'
	const value = locale.toLowerCase()
	if (value.startsWith('ru')) return 'ru'
	if (value.startsWith('kk') || value.startsWith('kz')) return 'kk'
	if (value.startsWith('ko')) return 'ko'
	return 'en'
}

// url = null → для этого языка видео ещё не залито, карточка уходит в
// режим "Coming soon" (не кликабельна, плеер не открывается).
type Reel = {
	id: string
	thumb: string
	url: string | null
	title: string
	category: string
}

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

function ShowreelCard({
	reel,
	comingSoonLabel,
	onPlay,
	onWarmup,
}: {
	reel: Reel
	comingSoonLabel: string
	onPlay: (reel: Reel) => void
	onWarmup?: () => void
}) {
	const isComingSoon = reel.url === null

	return (
		<div className='group relative overflow-hidden rounded-lg sm:rounded-xl bg-neutral-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(217,4,22,0.15)]'>
			<div className='relative aspect-video w-full bg-black overflow-hidden rounded-lg sm:rounded-2xl'>
				<button
					type='button'
					aria-label={
						isComingSoon
							? `${reel.title} — ${comingSoonLabel}`
							: `Play ${reel.title}`
					}
					aria-disabled={isComingSoon}
					// Заглушка не открывает плеер — просто ничего не делает по клику,
					// но остаётся видимой в сетке (не skip/hidden), чтобы было понятно,
					// что видео появится позже, а не пропало из вёрстки.
					className={`absolute inset-0 block h-full w-full ${
						isComingSoon ? 'cursor-default' : 'cursor-pointer'
					}`}
					onClick={() => {
						if (isComingSoon) return
						onPlay(reel)
					}}
					onMouseEnter={isComingSoon ? undefined : onWarmup}
					onTouchStart={isComingSoon ? undefined : onWarmup}
				>
					<Image
						src={reel.thumb}
						alt={reel.title}
						fill
						className={`object-cover transition-transform duration-1000 ${
							isComingSoon ? 'grayscale' : 'group-hover:scale-105'
						}`}
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'
					/>
					<div
						className={`absolute inset-0 bg-black/50 transition-opacity ${
							isComingSoon ? '' : 'group-hover:bg-black/30'
						}`}
					/>

					<div className='absolute inset-0 flex items-center justify-center'>
						{isComingSoon ? (
							<div className='flex items-center gap-2 sm:gap-2.5 rounded-full border border-white/30 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 text-white backdrop-blur-md'>
								<Clock size={16} className='shrink-0' />
								<span className='font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]'>
									{comingSoonLabel}
								</span>
							</div>
						) : (
							<div className='flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 2xl:h-20 2xl:w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#d90416] group-hover:border-[#d90416]'>
								<Play
									fill='currentColor'
									size={22}
									className='ml-1 sm:w-6 sm:h-6'
								/>
							</div>
						)}
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
	const t = SHOWREEL_TRANSLATIONS[resolvedLocale]

	const [activeReel, setActiveReel] = useState<Reel | null>(null)

	const reelsData: Reel[] = SHOWREELS.map(reel => {
		const translation = t.reels[reel.id as keyof typeof t.reels]
		return {
			id: reel.id,
			thumb: reel.thumb,
			url: reel.urls[resolvedLocale],
			title: translation.title,
			category: translation.category,
		}
	})

	const warmupMainReel = useVimeoWarmupOnIntent()

	const handlePlay = (reel: Reel) => {
		// Доп. страховка: даже если что-то вызовет onPlay для заглушки,
		// модалка с пустым src не откроется.
		if (!reel.url) return
		setActiveReel(reel)
	}

	return (
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
					href={SHOWREEL_LINKS.driveUrl}
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
						comingSoonLabel={t.comingSoon}
						onPlay={handlePlay}
						onWarmup={reel.id === 'action' ? warmupMainReel : undefined}
					/>
				))}
			</div>

			{activeReel && activeReel.url && (
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
								src={`${activeReel.url}${
									activeReel.url.includes('?') ? '&' : '?'
								}autoplay=1`}
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
