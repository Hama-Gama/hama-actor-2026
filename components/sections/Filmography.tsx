'use client'

import React from 'react'

type CreditType = 'feature' | 'short' | 'reel'
type LocalizedText = { ru: string; en: string; kk: string; ko: string }

type Credit = {
	project: LocalizedText
	role: LocalizedText
	year: string
	type: CreditType
	location: LocalizedText
	note?: LocalizedText
}

// TODO: названия на kk/ko — рабочий перевод, сверь с официальным прокатным
// названием проекта, если оно отличается.
const credits: Credit[] = [
	{
		project: {
			ru: 'Принц Азии',
			en: 'Prince of Asia',
			kk: 'Азия ханзадасы',
			ko: '아시아의 왕자',
		},
		role: {
			ru: 'Массовка',
			en: 'Background / Extra',
			kk: 'Массовка',
			ko: '엑스트라',
		},
		year: '2026',
		type: 'feature',
		location: {
			ru: 'Южная Корея – Казахстан · съёмки в Алматы',
			en: 'South Korea – Kazakhstan · shot in Almaty',
			kk: 'Оңтүстік Корея – Қазақстан · Алматыда түсірілген',
			ko: '한국 – 카자흐스탄 · 알마티 촬영',
		},
	},
	{
		project: {
			ru: 'Доспехи бога: Ультиматум',
			en: 'Armour of God IV: Ultimatum',
			kk: 'Құдай сауыты IV: Ультиматум',
			ko: '용형호제 4: 최후통첩',
		},
		role: {
			ru: 'Массовка',
			en: 'Background / Extra',
			kk: 'Массовка',
			ko: '엑스트라',
		},
		year: '2026',
		type: 'feature',
		location: {
			ru: 'Китай – Казахстан · съёмки в Актау',
			en: 'China – Kazakhstan · shot in Aktau',
			kk: 'Қытай – Қазақстан · Ақтауда түсірілген',
			ko: '중국 – 카자흐스탄 · 악타우 촬영',
		},
		note: {
			ru: 'Реж. Роберт Кун. В ролях: Джеки Чан, Кевин Риджер, Ханьчжи Сян',
			en: 'Dir. Robert Kun. With Jackie Chan, Kevin Ridger, Hanzhi Xiang',
			kk: 'Реж. Роберт Кун. Рөлдерде: Джеки Чан, Кевин Риджер, Ханьчжи Сян',
			ko: '감독: 로버트 쿤. 출연: 재키 찬, 케빈 리저, 한즈 샹',
		},
	},
	{
		project: {
			ru: 'Короткометражные фильмы',
			en: 'Short Films',
			kk: 'Қысқа метражды фильмдер',
			ko: '단편 영화',
		},
		role: {
			ru: 'Актёр',
			en: 'Actor',
			kk: 'Актёр',
			ko: '배우',
		},
		year: '2017',
		type: 'short',
		location: {
			ru: 'Независимый проект',
			en: 'Independent',
			kk: 'Тәуелсіз жоба',
			ko: '독립 프로젝트',
		},
		note: {
			ru: 'Любительский проект, для себя',
			en: 'Amateur / hobby project',
			kk: 'Әуесқой жоба, өзі үшін',
			ko: '아마추어 / 개인 취미 프로젝트',
		},
	},
	{
		project: {
			ru: 'Боевые рилсы',
			en: 'Action Reels',
			kk: 'Жекпе-жек рилстері',
			ko: '액션 릴',
		},
		role: {
			ru: 'Исполнитель',
			en: 'Performer',
			kk: 'Орындаушы',
			ko: '퍼포머',
		},
		year: '2022',
		type: 'reel',
		location: {
			ru: 'Независимый проект',
			en: 'Independent',
			kk: 'Тәуелсіз жоба',
			ko: '독립 프로젝트',
		},
		note: {
			ru: 'Любительский проект — боевая хореография',
			en: 'Amateur / hobby project — martial arts & fight choreography',
			kk: 'Әуесқой жоба — жекпе-жек хореографиясы',
			ko: '아마추어 프로젝트 — 무술 및 액션 안무',
		},
	},
]

const typeLabel: Record<CreditType, LocalizedText> = {
	feature: {
		ru: 'Худ. фильм',
		en: 'Feature Film',
		kk: 'Көркем фильм',
		ko: '장편 영화',
	},
	short: {
		ru: 'Короткий метр',
		en: 'Short Film',
		kk: 'Қысқа метраж',
		ko: '단편 영화',
	},
	reel: { ru: 'Ролик', en: 'Reel', kk: 'Ролик', ko: '릴' },
}

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
		<section
			className='container mx-auto px-4 py-8 border-t border-neutral-100 scroll-mt-24'
			id='filmography'
		>
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
									{credit.project[langKey]}
								</h3>
								<span className='font-mono text-[10px] uppercase tracking-widest text-[#d90416] font-bold'>
									{typeLabel[credit.type][langKey]}
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
				))}
			</div>
		</section>
	)
}
