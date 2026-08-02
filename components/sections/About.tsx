'use client'

import React from 'react'

export const About = ({ locale }: { locale?: string }) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'
	const isKo = locale === 'ko'

	const t = {
		heading: isRu ? 'О себе' : isEn ? 'About' : isKk ? 'Мен туралы' : '소개',
		skillsHeading: isRu
			? 'Навыки'
			: isEn
				? 'Skills'
				: isKk
					? 'Дағдылар'
					: '기술',
		data: {
			height: {
				label: isRu ? 'Рост' : isEn ? 'Height' : isKk ? 'Бойы' : '키',
				val: '180 cm',
			},
			weight: {
				label: isRu ? 'Вес' : isEn ? 'Weight' : isKk ? 'Салмағы' : '몸무게',
				val: '65 kg',
			},
			eyes: {
				label: isRu ? 'Глаза' : isEn ? 'Eyes' : isKk ? 'Көз түсі' : '눈색',
				val: isRu ? 'Зеленые' : isEn ? 'Green' : isKk ? 'Жасыл' : '초록색',
			},
			hair: {
				label: isRu ? 'Волосы' : isEn ? 'Hair' : isKk ? 'Шаш түсі' : '머리카락',
				val: isRu ? 'Темные' : isEn ? 'Dark' : isKk ? 'Қара' : '어두운색',
			},
		},
		skillList: [
			{ en: 'Taekwondo', ru: 'Таэквондо', kk: 'Таэквондо', ko: '태권도' },
			{ en: 'Boxing', ru: 'Бокс', kk: 'Бокс', ko: '복싱' },
			{ en: 'MMA', ru: 'ММА', kk: 'ММА', ko: 'MMA' },
			{
				en: 'Weapon Handling',
				ru: 'Оружие',
				kk: 'Қару қолдану',
				ko: '무기 취급',
			},
			{ en: 'Cardistry', ru: 'Кардистри', kk: 'Кардистри', ko: '카디스트리' },
			{ en: 'Coding', ru: 'Кодинг', kk: 'Кодтау', ko: '코딩' },
			{
				en: 'Skydiving',
				ru: 'Парашют',
				kk: 'Парашютпен секіру',
				ko: '스카이다이빙',
			},
			{
				en: 'Motorcycling',
				ru: 'Мотоцикл',
				kk: 'Мотоцикл айдау',
				ko: '모터사이클',
			},
		],
	}

	// Определяем ключ для выбора навыка
	const skillKey = isRu ? 'ru' : isKk ? 'kk' : isKo ? 'ko' : 'en'

	return (
		<section className='container mx-auto px-4 py-8' id='about'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Specs Table */}
				<div>
					<div className='mb-4 flex items-center gap-6'>
						<div className='h-12 w-[3px] bg-[#d90416]' />
						<h2 className='font-display text-4xl font-bold uppercase italic tracking-tighter'>
							{t.heading}
						</h2>
					</div>

					<div className='space-y-4 border-t border-neutral-100 pt-2'>
						{Object.values(t.data).map((item, i) => (
							<div
								key={i}
								className='flex justify-between items-end border-b border-neutral-50 pb-2'
							>
								<span className='font-mono text-[10px] uppercase text-neutral-400 tracking-widest'>
									{item.label}
								</span>
								<span className='font-sans font-bold text-xl uppercase italic'>
									{item.val}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Skills Grid */}
				<div className='bg-neutral-900 p-10 text-white rounded-sm relative overflow-hidden'>
					<div className='absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 uppercase tracking-[0.5em] vertical-text'>
						Arkayev Performance
					</div>
					<h3 className='font-mono text-[10px] uppercase tracking-[0.3em] text-[#d90416] mb-2 font-bold'>
						// {t.skillsHeading}
					</h3>
					<div className='grid grid-cols-2 gap-y-6 gap-x-4'>
						{t.skillList.map((skill, i) => (
							<div key={i} className='flex items-center gap-3'>
								<div className='w-1 h-1 bg-[#d90416]' />
								<span className='font-sans uppercase text-sm font-bold tracking-tight opacity-90'>
									{skill[skillKey]}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
