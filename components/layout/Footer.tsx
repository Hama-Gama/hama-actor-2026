'use client'

import React from 'react'

interface FooterProps {
	lang: string
}

const FOOTER_TRANSLATIONS = {
	en: {
		name: 'Khamit Arkayev',
		rights: 'All rights reserved',
		developed: 'Developed by Hama',
		role: 'Actor // Martial Artist',
	},
	ru: {
		name: 'Хамит Аркаев',
		rights: 'Все права защищены',
		developed: 'Разработано Hama',
		role: 'Актёр // Боевые искусства',
	},
	kk: {
		name: 'Хамит Арқаев',
		rights: 'Барлық құқықтар қорғалған',
		developed: 'Hama әзірлеген',
		role: 'Актёр // Жекпе-жек өнері',
	},
	ko: {
		name: '카미트 아르카예프',
		rights: '모든 권리 보유',
		developed: 'Hama 제작',
		role: '배우 // 무술가',
	},
}

export default function Footer({ lang }: FooterProps) {
	const activeLang = (
		lang === 'kz' ? 'kk' : lang
	) as keyof typeof FOOTER_TRANSLATIONS
	const content = FOOTER_TRANSLATIONS[activeLang] || FOOTER_TRANSLATIONS.en

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		// Структура flex (flex-col md:flex-row) не меняется — только отступы/паддинги.
		<footer className='bg-black text-white pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 mt-16 sm:mt-20 lg:mt-24 overflow-hidden w-full'>
			{/* СЕКЦИЯ С ИМЕНЕМ: адаптивный SVG-текст.
			    Важный момент: fontSize внутри SVG уже АВТОМАТИЧЕСКИ адаптивен —
			    viewBox + preserveAspectRatio + className="w-full h-auto" заставляют
			    браузер масштабировать весь SVG (а значит и текст внутри) вместе с
			    шириной контейнера. Поэтому здесь не нужны Tailwind sm:/md:/lg: —
			    это уже "резиновый" текст без медиа-запросов, трогать fontSize не надо. */}
			<div className='w-full border-b border-white/10 mb-8 sm:mb-10 lg:mb-12 select-none px-4 sm:px-6 lg:px-8 2xl:px-12'>
				<svg
					viewBox='0 0 1000 100'
					className='w-full h-auto'
					preserveAspectRatio='xMidYMid meet'
				>
					<text
						x='50%'
						y='60%'
						textAnchor='middle'
						className='font-display font-black uppercase fill-white hover:fill-[#d90416] transition-colors duration-500'
						style={{
							fontSize: '75px',
							letterSpacing: '0.02em',
						}}
					>
						{content.name}
					</text>
				</svg>
			</div>

			{/* НИЖНЯЯ ТЕХНИЧЕСКАЯ ЧАСТЬ */}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12'>
				<div className='flex flex-col items-center justify-between gap-6 sm:gap-8 lg:gap-10 md:flex-row'>
					<div className='flex flex-col items-center md:items-start gap-2'>
						<p className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-500'>
							© {new Date().getFullYear()} // {content.rights}
						</p>
					</div>

					<div className='text-center'>
						<p className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#d90416] font-bold'>
							{content.role}
						</p>
					</div>

					<div className='flex items-center gap-3 group'>
						<span className='h-px w-6 sm:w-8 2xl:w-10 bg-[#d90416] transition-all group-hover:w-10 sm:group-hover:w-12 2xl:group-hover:w-16' />
						<p className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors'>
							{content.developed}
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
