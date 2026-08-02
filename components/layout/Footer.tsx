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
		<footer className='bg-black text-white pt-10 pb-10 mt-20 overflow-hidden w-full'>
			{/* СЕКЦИЯ С ИМЕНЕМ: УМЕНЬШЕННЫЙ В 2 РАЗА АДАПТИВНЫЙ ТЕКСТ */}
			<div className='w-full border-b border-white/10 mb-12 select-none px-4'>
				<svg
					viewBox='0 0 1000 100' // Уменьшили высоту viewBox, чтобы сбалансировать отступы
					className='w-full h-auto'
					preserveAspectRatio='xMidYMid meet'
				>
					<text
						x='50%'
						y='60%'
						textAnchor='middle'
						className='font-display font-black uppercase fill-white hover:fill-[#d90416] transition-colors duration-500'
						style={{
							fontSize: '75px', // Было 150px, теперь в 2 раза меньше
							letterSpacing: '0.02em', // Чуть добавили пространства между буквами для читаемости
						}}
					>
						{content.name}
					</text>
				</svg>
			</div>

			{/* НИЖНЯЯ ТЕХНИЧЕСКАЯ ЧАСТЬ */}
			<div className='container mx-auto px-4'>
				<div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
					<div className='flex flex-col items-center md:items-start gap-2'>
						<p className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500'>
							© {new Date().getFullYear()} // {content.rights}
						</p>
					</div>

					<div className='text-center'>
						<p className='font-mono text-[10px] uppercase tracking-[0.5em] text-[#d90416] font-bold'>
							{content.role}
						</p>
					</div>

					<div className='flex items-center gap-3 group'>
						<span className='h-px w-8 bg-[#d90416] transition-all group-hover:w-12' />
						<p className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors'>
							{content.developed}
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
