'use client'

import Image from 'next/image'

interface HeroProps {
	lang: string
}

const HERO_TRANSLATIONS = {
	en: {
		name: 'Khamit Arkayev',
		aka: 'Also known as Hama',
		tags: ['Actor', 'Martial Artist', 'Action'],
		info: { age: 'Playing age: 40-45', loc: 'Almaty, Kazakhstan' },
	},
	ru: {
		name: 'Хамит Аркаев',
		aka: 'Также известен как Хама',
		tags: ['Актер', 'Мастер боевых искусств', 'Action'],
		info: { age: 'Игровой возраст: 40-45', loc: 'Алматы, Казахстан' },
	},
	kk: {
		name: 'Хамит Аркаев',
		aka: 'Хама есімімен де танымал',
		tags: ['Актер', 'Жекпе-жек шебері', 'Action'],
		info: { age: 'Ойын жасы: 40-45', loc: 'Алматы, Қазақстан' },
	},
	ko: {
		name: '카미트 아르카예프',
		aka: 'Hama로도 알려져 있음',
		tags: ['배우', '무술가', '액션'],
		info: { age: '연기 연령: 40-45세', loc: '카자흐스탄 알마티' },
	},
}

export default function Hero({ lang }: HeroProps) {
	const currentLang = (
		HERO_TRANSLATIONS[lang as keyof typeof HERO_TRANSLATIONS] ? lang : 'en'
	) as keyof typeof HERO_TRANSLATIONS
	const content = HERO_TRANSLATIONS[currentLang]

	return (
		<section className='pt-24 md:pt-28 pb-8 overflow-hidden'>
			<div className='container mx-auto px-4 flex flex-col md:flex-row items-center gap-12'>
				{/* Photo Side */}
				<div className='flex-1 relative aspect-[3/4] w-full max-w-md bg-neutral-100 overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.01]'>
					<Image
						src='/hero.jpg'
						alt={content.name}
						fill
						priority
						sizes='(max-width: 768px) 100vw, 50vw'
						/* Убрали grayscale, теперь фото всегда оригинальное */
						className='object-cover transition-all duration-1000'
					/>
				</div>

				{/* Text Side */}
				<div className='flex-1 space-y-8'>
					<div className='space-y-4'>
						<h1
							style={{
								fontFamily: 'var(--font-display), "Malgun Gothic", sans-serif',
							}}
							className='text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter'
						>
							{content.name}
						</h1>

						<p className='font-mono text-sm text-neutral-500 uppercase tracking-[0.2em]'>
							// {content.aka}
						</p>
					</div>

					<div className='flex flex-wrap gap-2'>
						{content.tags.map(tag => (
							<span
								key={tag}
								className='px-3 py-1 border border-black text-[10px] uppercase font-mono font-bold hover:bg-black hover:text-white transition-colors cursor-default'
							>
								{tag}
							</span>
						))}
					</div>

					<div className='space-y-2 font-mono text-base uppercase text-neutral-600 pt-4 border-l-2 border-[#d90416] pl-6'>
						<p className='flex items-center gap-3'>{content.info.age}</p>
						<p className='flex items-center gap-3'>{content.info.loc}</p>
					</div>
				</div>
			</div>
		</section>
	)
}
