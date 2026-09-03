'use client'

import React, { useState } from 'react'
import { Film, X } from 'lucide-react'
import {
	CREDITS,
	TYPE_LABEL,
	COMING_SOON_TEXT,
	PLACEHOLDER_MODE,
	PLACEHOLDER_COUNT,
	type LocalizedText,
} from '@/lib/filmography-config'

// Весь контент (тексты на 4 языках, постеры, режим "Coming soon",
// количество заглушек) вынесен в lib/filmography.config.ts — этот файл
// его не хранит и редактировать не нужно, только сам конфиг.

type FilmographyProps = {
	locale?: string
}

export const Filmography = ({ locale }: FilmographyProps) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'
	const langKey: keyof LocalizedText = isRu
		? 'ru'
		: isEn
			? 'en'
			: isKk
				? 'kk'
				: 'ko'

	const [activePoster, setActivePoster] = useState<{
		url: string
		title: string
	} | null>(null)

	const t = {
		sub: isRu
			? 'Опыт на площадке'
			: isEn
				? 'On-set experience'
				: isKk
					? 'Алаңдағы тәжірибе'
					: '현장 경험',
		heading: isRu
			? 'Фильмография'
			: isEn
				? 'Filmography'
				: isKk
					? 'Фильмография'
					: '필모그래피',
		noPoster: isRu
			? 'Постер недоступен'
			: isEn
				? 'Poster not available'
				: isKk
					? 'Постер жоқ'
					: '포스터 없음',
		close: isRu ? 'Закрыть' : isEn ? 'Close' : isKk ? 'Жабу' : '닫기',
		comingSoon: COMING_SOON_TEXT[langKey],
	}

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 border-t border-neutral-100 scroll-mt-24'
			id='filmography'
		>
			<div className='mb-6 sm:mb-2'>
				<span className='font-mono text-[10px] uppercase tracking-[0.4em] text-[#d90416] mb-3 sm:mb-4 block font-bold'>
					// {t.sub}
				</span>
				<h2 className='font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase italic tracking-tighter'>
					{t.heading}
				</h2>
			</div>

			{/*
				Адаптивная раскладка (общая и для заглушек, и для реальных карточек):
				- Мобильный/планшет (<lg, <1024px): одна колонка, список строками —
				  постер слева (миниатюра), текст справа. divide-y рисует разделители
				  между строками, как в обычном списке.
				- lg и шире (≥1024px): переключение на GRID-карточки — постер сверху
				  во всю ширину карточки, текст под ним. Разделители-линии убираются
				  (у карточек своя рамка), колонок становится больше по мере роста
				  экрана: 2 → 3 (xl) → 4 (2xl), как в каталоге крупной кино-платформы.
			*/}
			{PLACEHOLDER_MODE ? (
				// ─── Заглушки "Coming soon" ───────────────────────────────────
				// Просто пустые карточки того же формата, без реальных данных
				// и без клика/модалки постера. Количество и текст — из конфига.
				<div
					className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
					gap-x-6 lg:gap-6 xl:gap-7 2xl:gap-8
					divide-y divide-neutral-100 lg:divide-y-0
					border-t border-b lg:border-none'
				>
					{Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
						<div
							key={i}
							className='flex lg:flex-col gap-4 sm:gap-6 lg:gap-0 py-5 lg:py-0 items-start
							lg:border lg:border-neutral-100 lg:rounded-sm lg:overflow-hidden'
						>
							<div
								className='relative w-16 sm:w-20 md:w-24 lg:w-full aspect-[2/3] shrink-0 lg:shrink
								rounded-sm lg:rounded-none overflow-hidden border border-neutral-200 lg:border-0 bg-neutral-100
								flex items-center justify-center text-neutral-300'
							>
								<Film size={20} />
							</div>

							<div className='flex-1 lg:flex-none min-w-0 lg:w-full lg:p-4 flex items-center lg:items-start lg:h-full'>
								<span className='font-mono text-xs uppercase tracking-[0.3em] text-neutral-300'>
									{t.comingSoon}
								</span>
							</div>
						</div>
					))}
				</div>
			) : (
				// ─── Реальные карточки ────────────────────────────────────────
				<div
					className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
					gap-x-6 lg:gap-6 xl:gap-7 2xl:gap-8
					divide-y divide-neutral-100 lg:divide-y-0
					border-t border-b lg:border-none'
				>
					{CREDITS.map((credit, i) => {
						const title = credit.project[langKey]
						const hasPoster = Boolean(credit.posterUrl)

						return (
							<div
								key={i}
								className='flex lg:flex-col gap-4 sm:gap-6 lg:gap-0 py-5 lg:py-0 items-start
								lg:border lg:border-neutral-100 lg:rounded-sm lg:overflow-hidden
								lg:hover:border-neutral-300 lg:transition-colors'
							>
								{/* Постер — миниатюра-строка на мобильном, полноширинная
								    карточка сверху от lg. Пропорции 2:3 — стандарт киноплаката
								    (как на IMDb/Letterboxd). Кликабельна только если есть постер. */}
								<button
									type='button'
									disabled={!hasPoster}
									onClick={() =>
										hasPoster &&
										setActivePoster({ url: credit.posterUrl as string, title })
									}
									title={hasPoster ? title : t.noPoster}
									className={`relative w-16 sm:w-20 md:w-24 lg:w-full aspect-[2/3] shrink-0 lg:shrink
									rounded-sm lg:rounded-none overflow-hidden border border-neutral-200 lg:border-0 bg-neutral-100 ${
										hasPoster
											? 'cursor-pointer hover:opacity-80 transition-opacity'
											: 'cursor-default'
									}`}
								>
									{hasPoster ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={credit.posterUrl}
											alt={title}
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center text-neutral-300'>
											<Film size={20} />
										</div>
									)}
								</button>

								<div className='flex-1 lg:flex-none min-w-0 lg:w-full lg:p-4'>
									<div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
										<span className='font-mono text-xs text-neutral-400'>
											{credit.year}
										</span>
										<h3 className='font-display text-lg sm:text-xl 2xl:text-2xl font-bold italic'>
											{title}
										</h3>
										<span className='font-mono text-[10px] uppercase tracking-widest text-[#d90416] font-bold'>
											{TYPE_LABEL[credit.type][langKey]}
										</span>
									</div>
									<p className='font-mono text-xs text-neutral-500 mt-1'>
										{credit.role[langKey]} — {credit.location[langKey]}
									</p>
									{credit.note && (
										<p className='font-mono text-[11px] text-neutral-400 mt-1'>
											{credit.note[langKey]}
										</p>
									)}
								</div>
							</div>
						)
					})}
				</div>
			)}

			{/* Модалка постера — используется только в режиме реальных карточек */}
			{activePoster && (
				<div
					className='fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4'
					onClick={() => setActivePoster(null)}
				>
					<div
						className='relative w-full max-w-xs sm:max-w-sm 2xl:max-w-md'
						onClick={e => e.stopPropagation()}
					>
						<button
							type='button'
							onClick={() => setActivePoster(null)}
							className='absolute -top-10 right-0 flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest cursor-pointer'
						>
							{t.close} <X size={16} />
						</button>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={activePoster.url}
							alt={activePoster.title}
							className='w-full rounded-sm'
						/>
					</div>
				</div>
			)}
		</section>
	)
}
