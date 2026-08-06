'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import {
	Footprints,
	HandFist,
	Swords,
	Target,
	Spade,
	WindArrowDown,
	Motorbike,
	Play,
	X,
	Copy,
} from 'lucide-react'

export const About = ({ locale }: { locale?: string }) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'
	const isKo = locale === 'ko'

	const [activeVideo, setActiveVideo] = useState<string | null>(null)

	const t = {
		heading: isRu ? 'О себе' : isEn ? 'About' : isKk ? 'Мен туралы' : '소개',
		skillsHeading: isRu
			? 'Навыки'
			: isEn
				? 'Skills'
				: isKk
					? 'Дағдылар'
					: '기술',
		sizesHeading: isRu
			? 'Параметры'
			: isEn
				? 'Sizes & Measurements'
				: isKk
					? 'Дене өлшемдері'
					: '치수 정보',
		sizesNote: isRu
			? 'Примерные значения — уточняются'
			: isEn
				? 'Approximate — to be confirmed'
				: isKk
					? 'Шамамен — нақтыланады'
					: '대략적인 수치 — 추후 확정',
		copyHint: isRu
			? 'Скопировать данные'
			: isEn
				? 'Copy data'
				: isKk
					? 'Деректерді көшіру'
					: '데이터 복사',
		copiedToast: isRu
			? 'Данные скопированы — можно вставить в сообщение'
			: isEn
				? 'Data copied — ready to paste into a message'
				: isKk
					? 'Деректер көшірілді — хабарламаға қоюға болады'
					: '데이터가 복사되었습니다 — 메시지에 붙여넣으세요',
		copyFailed: isRu
			? 'Не удалось скопировать'
			: isEn
				? 'Could not copy'
				: isKk
					? 'Көшіру мүмкін болмады'
					: '복사하지 못했습니다',
		closeVideo: isRu ? 'Закрыть' : isEn ? 'Close' : isKk ? 'Жабу' : '닫기',
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
		sizes: {
			chest: {
				label: isRu ? 'Грудь' : isEn ? 'Chest' : isKk ? 'Кеуде' : '가슴둘레',
				val: '92 cm',
			},
			waist: {
				label: isRu ? 'Талия' : isEn ? 'Waist' : isKk ? 'Бел' : '허리둘레',
				val: '76 cm',
			},
			hips: {
				label: isRu ? 'Бёдра' : isEn ? 'Hips' : isKk ? 'Жамбас' : '엉덩이둘레',
				val: '94 cm',
			},
			neck: {
				label: isRu ? 'Шея' : isEn ? 'Neck' : isKk ? 'Мойын' : '목둘레',
				val: '38 cm',
			},
			sleeve: {
				label: isRu ? 'Рукав' : isEn ? 'Sleeve' : isKk ? 'Жең' : '소매길이',
				val: '63 cm',
			},
			inseam: {
				label: isRu
					? 'Шаг (inseam)'
					: isEn
						? 'Inseam'
						: isKk
							? 'Шалбар ұзындығы (inseam)'
							: '인심 (다리안쪽길이)',
				val: '82 cm',
			},
			jacket: {
				label: isRu
					? 'Пиджак'
					: isEn
						? 'Jacket'
						: isKk
							? 'Пиджак'
							: '재킷 사이즈',
				val: 'EU 48 / US 38',
			},
			hat: {
				label: isRu
					? 'Головной убор'
					: isEn
						? 'Hat'
						: isKk
							? 'Бас киім'
							: '모자 사이즈',
				val: '57 cm',
			},
			shoe: {
				label: isRu
					? 'Обувь'
					: isEn
						? 'Shoe'
						: isKk
							? 'Аяқ киім'
							: '신발 사이즈',
				val: 'EU 43 / US 10 / UK 9 (275 mm)',
			},
			reach: {
				label: isRu
					? 'Размах рук (reach)'
					: isEn
						? 'Reach'
						: isKk
							? 'Қол ұзындығы (reach)'
							: '리치 (팔길이)',
				val: '183 cm',
			},
			hand: {
				label: isRu
					? 'Ведущая рука'
					: isEn
						? 'Dominant Hand'
						: isKk
							? 'Жетекші қол'
							: '주로 사용하는 손',
				val: isRu ? 'Правая' : isEn ? 'Right' : isKk ? 'Оң қол' : '오른손',
			},
			glove: {
				label: isRu
					? 'Перчатки'
					: isEn
						? 'Glove Size'
						: isKk
							? 'Қолғап өлшемі'
							: '장갑 사이즈',
				val: 'L',
			},
		},
		// icon — иконка навыка. videoUrl — прямая ссылка на mp4/webm (до 30 сек).
		// Пусто = кнопка "смотреть" не показывается. Заполни, когда видео будут готовы.
		skillList: [
			{
				en: 'Taekwondo',
				ru: 'Таэквондо',
				kk: 'Таэквондо',
				ko: '태권도',
				icon: Footprints,
				videoUrl: '',
			},
			{
				en: 'Boxing',
				ru: 'Бокс',
				kk: 'Бокс',
				ko: '복싱',
				icon: HandFist,
				videoUrl: '',
			},
			{
				en: 'MMA',
				ru: 'ММА',
				kk: 'ММА',
				ko: 'MMA',
				icon: Swords,
				videoUrl: '',
			},
			{
				en: 'Weapon Handling',
				ru: 'Оружие',
				kk: 'Қару қолдану',
				ko: '무기 취급',
				icon: Target,
				videoUrl: '',
			},
			{
				en: 'Cardistry',
				ru: 'Кардистри',
				kk: 'Кардистри',
				ko: '카디스트리',
				icon: Spade,
				videoUrl: '',
			},
			{
				en: 'Skydiving',
				ru: 'Парашют',
				kk: 'Парашютпен секіру',
				ko: '스카이다이빙',
				icon: WindArrowDown,
				videoUrl: '',
			},
			{
				en: 'Motorcycling',
				ru: 'Мотоцикл',
				kk: 'Мотоцикл айдау',
				ko: '모터사이클',
				icon: Motorbike,
				videoUrl: '',
			},
		],
	}

	// Определяем ключ для выбора навыка
	const skillKey = isRu ? 'ru' : isKk ? 'kk' : isKo ? 'ko' : 'en'

	const handleCopy = async () => {
		const lines = [
			...Object.values(t.data).map(item => `${item.label}: ${item.val}`),
			...Object.values(t.sizes).map(item => `${item.label}: ${item.val}`),
		]
		const text = lines.join('\n')

		try {
			await navigator.clipboard.writeText(text)
			toast.success(t.copiedToast)
		} catch (err) {
			console.error('Failed to copy stats', err)
			toast.error(t.copyFailed)
		}
	}

	return (
		<section className='container mx-auto px-4 py-8 scroll-mt-24' id='about'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Specs Table */}
				<div>
					<div className='mb-4 flex items-center justify-between gap-6'>
						<div className='flex items-center gap-6'>
							<div className='h-12 w-[3px] bg-[#d90416]' />
							<h2 className='font-display text-4xl font-bold uppercase italic tracking-tighter'>
								{t.heading}
							</h2>
						</div>
						<button
							type='button'
							onClick={handleCopy}
							title={t.copyHint}
							className='flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 hover:border-black hover:text-black transition-colors cursor-pointer shrink-0'
						>
							<Copy size={15} />
						</button>
					</div>

					<div className='max-w-md space-y-4 border-t border-neutral-100 pt-2'>
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
						{t.skillList.map((skill, i) => {
							const Icon = skill.icon
							return (
								<div key={i} className='flex items-center gap-2.5'>
									<Icon size={16} className='text-[#d90416] shrink-0' />
									<span className='font-sans uppercase text-sm font-bold tracking-tight opacity-90'>
										{skill[skillKey]}
									</span>
									{skill.videoUrl && (
										<button
											type='button'
											onClick={() => setActiveVideo(skill.videoUrl)}
											className='flex items-center justify-center w-5 h-5 rounded-full border border-white/30 text-white/70 hover:border-[#d90416] hover:text-[#d90416] transition-colors cursor-pointer shrink-0'
										>
											<Play size={9} fill='currentColor' />
										</button>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Sizes & Measurements — full width, for wardrobe / stunt coordination */}
			<div className='mt-8 border border-neutral-100 rounded-sm p-6 md:p-8'>
				<div className='flex items-baseline justify-between mb-6 flex-wrap gap-2'>
					<h3 className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold'>
						// {t.sizesHeading}
					</h3>
					<span className='font-mono text-[9px] uppercase tracking-widest text-neutral-300'>
						{t.sizesNote}
					</span>
				</div>

				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5'>
					{Object.values(t.sizes).map((item, i) => (
						<div key={i} className='flex flex-col gap-1'>
							<span className='font-mono text-[9px] uppercase text-neutral-400 tracking-widest'>
								{item.label}
							</span>
							<span className='font-sans font-bold text-sm'>{item.val}</span>
						</div>
					))}
				</div>
			</div>

			{/* Video modal — открывается по кнопке "play" у навыка */}
			{activeVideo && (
				<div
					className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'
					onClick={() => setActiveVideo(null)}
				>
					<div
						className='relative w-full max-w-sm'
						onClick={e => e.stopPropagation()}
					>
						<button
							type='button'
							onClick={() => setActiveVideo(null)}
							className='absolute -top-10 right-0 flex items-center gap-2 text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest cursor-pointer'
						>
							{t.closeVideo} <X size={16} />
						</button>
						<video
							src={activeVideo}
							controls
							autoPlay
							playsInline
							className='w-full rounded-sm bg-black'
						/>
					</div>
				</div>
			)}
		</section>
	)
}
