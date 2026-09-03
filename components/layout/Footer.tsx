'use client'

import React from 'react'

interface FooterProps {
	lang: string
}

const FOOTER_TRANSLATIONS = {
	en: {
		firstName: 'Khamit',
		lastName: 'Arkayev',
		rights: 'All rights reserved',
		developed: 'Developed by Hama',
		role: 'Actor // Martial Artist',
	},
	ru: {
		firstName: 'Хамит',
		lastName: 'Аркаев',
		rights: 'Все права защищены',
		developed: 'Разработано Hama',
		role: 'Актёр // Боевые искусства',
	},
	kk: {
		firstName: 'Хамит',
		lastName: 'Аркаев',
		rights: 'Барлық құқықтар қорғалған',
		developed: 'Hama әзірлеген',
		role: 'Актёр // Жекпе-жек өнері',
	},
	ko: {
		firstName: '카미트',
		lastName: '아르카예프',
		rights: '모든 권리 보유',
		developed: 'Hama 제작',
		role: '배우 // 무술가',
	},
}

const SITE_URL = 'hama-actor.com'

export default function Footer({ lang }: FooterProps) {
	const activeLang = (
		lang === 'kz' ? 'kk' : lang
	) as keyof typeof FOOTER_TRANSLATIONS
	const content = FOOTER_TRANSLATIONS[activeLang] || FOOTER_TRANSLATIONS.en

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		// Структура flex (flex-col md:flex-row) не меняется — только отступы/паддинги.
		<footer className='bg-black text-white pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 mt-16 sm:mt-20 lg:mt-24 overflow-hidden w-full'>
			{/* СЕКЦИЯ С ИМЕНЕМ: две строки, всегда прижаты влево (нет центрирования,
			    нет SVG-скейлинга — имя короткое, обычный Tailwind text-* с брейкпоинтами
			    справляется без переполнения). Имя — тёмно-серое и жирное (не белое,
			    чтобы не спорило с фоном и с site-ссылкой ниже). Ссылка на сайт —
			    маленький тёмно-красный, полупрозрачный текст, почти незаметный. */}
			<div className='w-full border-b border-white/10 mb-8 sm:mb-10 lg:mb-12 select-none px-4 sm:px-6 lg:px-8 2xl:px-12 pb-6 sm:pb-8'>
				<div className='text-left'>
					<p className='font-display font-black uppercase leading-[0.95] text-neutral-500 text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl tracking-tight'>
						{content.firstName}
					</p>
					<p className='font-display font-black uppercase leading-[0.95] text-neutral-500 text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl tracking-tight'>
						{content.lastName}
					</p>
					<p className='mt-2 sm:mt-3 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#d90416]/30'>
						{SITE_URL}
					</p>
				</div>
			</div>

			{/* НИЖНЯЯ ТЕХНИЧЕСКАЯ ЧАСТЬ */}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12'>
				<div className='flex flex-col items-center justify-between gap-6 sm:gap-8 lg:gap-10 md:flex-row'>
					<div className='flex flex-col items-center md:items-start gap-2'>
						<p className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-500'>
							© {new Date().getFullYear()} {'//'} {content.rights}
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
