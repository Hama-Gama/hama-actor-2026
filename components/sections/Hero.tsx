'use client'

import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'
import { ResumeDownload } from '../ui/ResumeDownload'

interface HeroProps {
	lang: string
}

const HERO_TRANSLATIONS = {
	en: {
		name: 'Khamit Arkayev',
		aka: 'Also known as Hama',
		tags: ['Actor', 'Martial Artist', 'Action'],
		info: { age: 'Playing age: 40-45', loc: 'Almaty, Kazakhstan' },
		based: 'Based in Almaty, Kazakhstan — available to travel internationally',
		timezone: 'GMT+5, Almaty',
	},
	ru: {
		name: 'Хамит Аркаев',
		aka: 'Также известен как Хама',
		tags: ['Актер', 'Мастер боевых искусств', 'Action'],
		info: { age: 'Игровой возраст: 40-45', loc: 'Алматы, Казахстан' },
		based: 'Базируется в Алматы, Казахстан — готов к поездкам за рубеж',
		timezone: 'GMT+5, Алматы',
	},
	kk: {
		name: 'Хамит Аркаев',
		aka: 'Хама есімімен де танымал',
		tags: ['Актер', 'Жекпе-жек шебері', 'Action'],
		info: { age: 'Ойын жасы: 40-45', loc: 'Алматы, Қазақстан' },
		based: 'Алматы, Қазақстанда тұрады — шетелге сапарлауға дайын',
		timezone: 'GMT+5, Алматы',
	},
	ko: {
		name: '카미트 아르카예프',
		aka: 'Hama로도 알려져 있음',
		tags: ['배우', '무술가', '액션'],
		info: { age: '연기 연령: 40-45세', loc: '카자흐스탄 알마티' },
		based: '카자흐스탄 알마티 거주 — 해외 촬영 가능',
		timezone: 'GMT+5, 알마티',
	},
}

type LangKey = keyof typeof HERO_TRANSLATIONS

const LANGUAGE_LEVELS: {
	code: string
	countryCode: string
	level: number
	label: Record<LangKey, string>
}[] = [
	{
		code: 'KZ',
		countryCode: 'kz',
		level: 6,
		label: { ru: 'Казахский', en: 'Kazakh', kk: 'Қазақша', ko: '카자흐어' },
	},
	{
		code: 'RU',
		countryCode: 'ru',
		level: 6,
		label: { ru: 'Русский', en: 'Russian', kk: 'Орысша', ko: '러시아어' },
	},
	{
		code: 'EN',
		countryCode: 'gb',
		level: 4,
		label: { ru: 'Английский', en: 'English', kk: 'Ағылшынша', ko: '영어' },
	},
	{
		code: 'KO',
		countryCode: 'kr',
		level: 3,
		label: { ru: 'Корейский', en: 'Korean', kk: 'Корейше', ko: '한국어' },
	},
]

const MAX_LEVEL = 6

export default function Hero({ lang }: HeroProps) {
	const currentLang = (
		HERO_TRANSLATIONS[lang as keyof typeof HERO_TRANSLATIONS] ? lang : 'en'
	) as LangKey
	const content = HERO_TRANSLATIONS[currentLang]

	return (
		<section className='pt-24 md:pt-28 pb-8 overflow-hidden'>
			<div className='container mx-auto px-4 flex flex-col md:flex-row items-center gap-12'>
				{/* Photo Side */}
				<div className='flex-1 relative aspect-[3/4] w-full max-w-md bg-neutral-100 overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.01]'>
					<Image
						src='/hero2.jpg'
						alt={content.name}
						fill
						priority
						sizes='(max-width: 768px) 100vw, 50vw'
						/* object-contain — фото не обрезается, видно целиком в оригинальных пропорциях */
						className='object-contain transition-all duration-1000'
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

					<div className='space-y-3 font-mono text-base uppercase text-neutral-600 pt-4 border-l-2 border-[#d90416] pl-6'>
						<p className='flex items-center gap-3'>{content.info.age}</p>

						<p className='flex items-center gap-3'>
							<MapPin size={16} className='text-[#d90416] shrink-0' />
							<span className='normal-case tracking-normal'>
								{content.based}
							</span>
						</p>

						<p className='flex items-center gap-3'>
							<Clock size={16} className='text-[#d90416] shrink-0' />
							<span className='normal-case tracking-normal'>
								{content.timezone}
							</span>
						</p>
					</div>

					{/* Languages */}
					<div className='pt-2'>
						<span className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 block'>
							{currentLang === 'ru'
								? 'Языки'
								: currentLang === 'kk'
									? 'Тілдер'
									: currentLang === 'ko'
										? '언어'
										: 'Languages'}
						</span>

						<div className='flex flex-wrap gap-6'>
							{LANGUAGE_LEVELS.map(l => (
								<div key={l.code} className='flex flex-col items-center gap-2'>
									<div className='w-5 h-5 rounded-full bg-neutral-50 border border-neutral-200 overflow-hidden shadow-sm'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={`https://flagcdn.com/w80/${l.countryCode}.png`}
											srcSet={`https://flagcdn.com/w160/${l.countryCode}.png 2x`}
											alt={l.label[currentLang]}
											width={40}
											height={40}
											className='w-full h-full object-cover'
										/>
									</div>
									<span className='font-mono text-[10px] uppercase tracking-widest font-bold text-neutral-500'>
										{l.code}
									</span>
									<div className='flex gap-1' title={l.label[currentLang]}>
										{Array.from({ length: MAX_LEVEL }).map((_, i) => (
											<span
												key={i}
												className={`w-1.5 h-1.5 rounded-full transition-colors ${
													i < l.level ? 'bg-[#d90416]/60' : 'bg-neutral-200'
												}`}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Resume Download */}
					<ResumeDownload locale={lang} />
				</div>
			</div>
		</section>
	)
}
