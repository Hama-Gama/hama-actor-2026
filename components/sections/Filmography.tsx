'use client'

import React from 'react'

type CreditType = 'feature' | 'short' | 'reel'

type Credit = {
	project: string
	role: string
	year: string
	type: CreditType
	location: string
	note?: string
}

const credits: Credit[] = [
	{
		project: 'Принц Азии',
		role: 'Background / Extra',
		year: '2026',
		type: 'feature',
		location: 'South Korea – Kazakhstan · shot in Almaty',
	},
	{
		project: 'Доспехи бога: Ультиматум',
		role: 'Background / Extra',
		year: '2026',
		type: 'feature',
		location: 'China – Kazakhstan · shot in Aktau',
		note: 'Dir. Robert Kuhn, starring Jackie Chan',
	},
	{
		project: 'Short films',
		role: 'Actor',
		year: '2017',
		type: 'short',
		location: 'Independent',
		note: 'Amateur / hobby project',
	},
	{
		project: 'Action reels',
		role: 'Performer',
		year: '2022',
		type: 'reel',
		location: 'Independent',
		note: 'Amateur / hobby project — martial arts & fight choreography',
	},
]

const typeLabel: Record<CreditType, { ru: string; en: string; kk: string; ko: string }> = {
	feature: { ru: 'Худ. фильм', en: 'Feature Film', kk: 'Көркем фильм', ko: '장편 영화' },
	short: { ru: 'Короткий метр', en: 'Short Film', kk: 'Қысқа метраж', ko: '단편 영화' },
	reel: { ru: 'Ролик', en: 'Reel', kk: 'Ролик', ko: '릴' },
}

type FilmographyProps = {
	locale?: string
}

export const Filmography = ({ locale }: FilmographyProps) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'
	const langKey: 'ru' | 'en' | 'kk' | 'ko' = isRu ? 'ru' : isEn ? 'en' : isKk ? 'kk' : 'ko'

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
	}

	return (
		<section className='container mx-auto px-4 py-8 border-t border-neutral-100'>
			<div className='mb-10'>
				<span className='font-mono text-[10px] uppercase tracking-[0.4em] text-[#d90416] mb-4 block font-bold'>
					// {t.sub}
				</span>
				<h2 className='font-display text-3xl md:text-4xl font-bold uppercase italic tracking-tighter'>
					{t.heading}
				</h2>
			</div>

			<div className='divide-y divide-neutral-100 border-t border-b border-neutral-100'>
				{credits.map((credit, i) => (
					<div
						key={i}
						className='flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-5'
					>
						<span className='font-mono text-xs text-neutral-400 md:w-16 shrink-0'>
							{credit.year}
						</span>

						<div className='flex-1'>
							<div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
								<h3 className='font-display text-xl font-bold italic'>
									{credit.project}
								</h3>
								<span className='font-mono text-[10px] uppercase tracking-widest text-[#d90416] font-bold'>
									{typeLabel[credit.type][langKey]}
								</span>
							</div>
							<p className='font-mono text-xs text-neutral-500 mt-1'>
								{credit.role} — {credit.location}
							</p>
							{credit.note && (
								<p className='font-mono text-[11px] text-neutral-400 mt-1'>
									{credit.note}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
