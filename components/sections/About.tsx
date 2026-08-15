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
			? 'Точные замеры'
			: isEn
				? 'Verified Measurements'
				: isKk
					? 'Нақты өлшемдер'
					: '확인된 치수',
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
				val: isEn ? `5'10" / 177 cm` : '177 cm',
			},
			weight: {
				label: isRu ? 'Вес' : isEn ? 'Weight' : isKk ? 'Салмағы' : '몸무게',
				val: isEn ? '141 lbs / 64 kg' : '64–65 kg',
			},
			eyes: {
				label: isRu ? 'Глаза' : isEn ? 'Eyes' : isKk ? 'Көз түсі' : '눈 색',
				val: isRu ? 'Зелёные' : isEn ? 'Green' : isKk ? 'Жасыл' : '초록색',
			},
			hair: {
				label: isRu ? 'Волосы' : isEn ? 'Hair' : isKk ? 'Шаш түсі' : '머리색',
				val: isRu ? 'Тёмные' : isEn ? 'Dark' : isKk ? 'Қара' : '어두운색',
			},
		},
		sizes: {
			chest: {
				label: isRu ? 'Грудь' : isEn ? 'Chest' : isKk ? 'Кеуде' : '가슴둘레',
				val: isEn ? `36.2" / 92 cm` : '92 cm',
			},
			waist: {
				label: isRu ? 'Талия' : isEn ? 'Waist' : isKk ? 'Бел' : '허리둘레',
				val: isEn ? `31.5" / 80 cm` : '80 cm',
			},
			hips: {
				label: isRu ? 'Бёдра' : isEn ? 'Hips' : isKk ? 'Жамбас' : '엉덩이둘레',
				val: isEn ? `35.8" / 91 cm` : '91 cm',
			},
			shoulders: {
				label: isRu
					? 'Ширина плеч'
					: isEn
						? 'Shoulders'
						: isKk
							? 'Иық ені'
							: '어깨너비',
				val: isEn ? `15.7" / 40 cm` : '40 cm',
			},
			sleeveShoulder: {
				label: isRu
					? 'Рукав (от плеча)'
					: isEn
						? 'Sleeve (Shoulder)'
						: isKk
							? 'Жең (иықтан)'
							: '소매길이 (어깨선)',
				val: isEn ? `23.6" / 60 cm` : '60 cm',
			},
			sleeveNeck: {
				label: isRu
					? 'Рукав (от шеи, CB)'
					: isEn
						? 'Sleeve (Neck/CB)'
						: isKk
							? 'Жең (мойыннан, CB)'
							: '소매길이 (목뒤중심, CB)',
				val: isEn ? `29.5" / 75 cm` : '75 cm',
			},
			inseam: {
				label: isRu
					? 'Шаг (inseam)'
					: isEn
						? 'Inseam'
						: isKk
							? 'Шалбар ұзындығы (inseam)'
							: '인심 (다리안쪽길이)',
				val: isEn ? `30.7" / 78 cm` : '78 cm',
			},
			neck: {
				label: isRu ? 'Шея' : isEn ? 'Neck' : isKk ? 'Мойын' : '목둘레',
				val: isEn ? `16.5" / 42 cm` : '42 cm',
			},
			hat: {
				label: isRu
					? 'Головной убор'
					: isEn
						? 'Hat'
						: isKk
							? 'Бас киім'
							: '모자 사이즈',
				val: '67 cm',
			},
			reach: {
				label: isRu
					? 'Размах рук (reach)'
					: isEn
						? 'Reach'
						: isKk
							? 'Қол ұзындығы (reach)'
							: '리치 (팔길이)',
				val: isEn ? `71.2" / 181 cm` : '181 cm',
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
				val: 'L / 9 (22 cm)',
			},
			jacket: {
				label: isRu
					? 'Пиджак / Костюм'
					: isEn
						? 'Jacket / Suit'
						: isKk
							? 'Пиджак / Костюм'
							: '재킷 / 수트 사이즈',
				val: 'EU 46 / US 36R',
			},
			shoe: {
				label: isRu
					? 'Обувь'
					: isEn
						? 'Shoe'
						: isKk
							? 'Аяқ киім'
							: '신발 사이즈',
				val: 'EU 42 / US 9 (270 mm)',
			},
		},
		// icon — иконка навыка. videoUrl — прямая ссылка на mp4/webm (до 30 сек).
		// Пусто = кнопка "смотреть" не показывается.
		// TODO: положи файлы с такими именами в public/videos/
		skillList: [
			{
				en: 'Taekwondo',
				ru: 'Таэквондо',
				kk: 'Таэквондо',
				ko: '태권도',
				icon: Footprints,
				videoUrl: '/videos/taekwondo.mp4',
			},
			{
				en: 'Boxing',
				ru: 'Бокс',
				kk: 'Бокс',
				ko: '복싱',
				icon: HandFist,
				videoUrl: '/videos/boxing.mp4',
			},
			{
				en: 'MMA',
				ru: 'ММА',
				kk: 'ММА',
				ko: 'MMA',
				icon: Swords,
				videoUrl: '/videos/mma.mp4',
			},
			{
				en: 'Weapon Handling',
				ru: 'Оружие',
				kk: 'Қару қолдану',
				ko: '무기 취급',
				icon: Target,
				videoUrl: '/videos/weapon-handling.mp4',
			},
			{
				en: 'Cardistry',
				ru: 'Кардистри',
				kk: 'Кардистри',
				ko: '카디스트리',
				icon: Spade,
				videoUrl: '/videos/cardistry.mp4',
			},
			{
				en: 'Skydiving',
				ru: 'Парашют',
				kk: 'Парашютпен секіру',
				ko: '스카이다이빙',
				icon: WindArrowDown,
				videoUrl: '/videos/skydiving.mp4',
			},
			{
				en: 'Motorcycling',
				ru: 'Мотоцикл',
				kk: 'Мотоцикл айдау',
				ko: '모터사이클',
				icon: Motorbike,
				videoUrl: '/videos/motorcycling.mp4',
			},
		],
	}

	// Определяем ключ для выбора навыка
	const skillKey = isRu ? 'ru' : isKk ? 'kk' : isKo ? 'ko' : 'en'

	// Имя и контакты не выводятся в блоке About (имя уже есть в hero/шапке,
	// контакты — в разделе Contact), но добавляются в скопированный текст,
	// чтобы получатель в WhatsApp/Telegram сразу видел, чьи это данные и как
	// связаться, без ручного дописывания.
	// TODO: замени плейсхолдеры на реальные номер и email.
	const actorName = 'Khamit Arkayev (Hama)'
	const roleLabel = isRu
		? 'Актёр / каскадёр'
		: isEn
			? 'Actor / Stunt Performer'
			: isKk
				? 'Актёр / каскадёр'
				: '배우 / 스턴트 퍼포머'
	const contact = {
		whatsapp: '+7 707 891 91 81',
		email: 'ardager121@mail.ru', 
		website: 'hama-actor.com',
	}
	const contactLabels = {
		whatsapp: isRu
			? 'WhatsApp'
			: isEn
				? 'WhatsApp'
				: isKk
					? 'WhatsApp'
					: '왓츠앱',
		email: isRu ? 'Email' : isEn ? 'Email' : isKk ? 'Email' : '이메일',
		website: isRu ? 'Сайт' : isEn ? 'Website' : isKk ? 'Сайт' : '웹사이트',
	}

	const handleCopy = async () => {
		const lines = [
			`${actorName} — ${roleLabel}`,
			`${contactLabels.whatsapp}: ${contact.whatsapp}`,
			`${contactLabels.email}: ${contact.email}`,
			`${contactLabels.website}: ${contact.website}`,
			'',
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
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		// Структура grid/flex НЕ меняется — только отступы, паддинги, размеры шрифта.
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 scroll-mt-24'
			id='about'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 2xl:gap-12'>
				{/* Specs Table */}
				<div>
					<div className='mb-4 sm:mb-6 flex items-center justify-between gap-4 sm:gap-6'>
						<div className='flex items-center gap-4 sm:gap-6'>
							<div className='h-10 w-[3px] sm:h-12 2xl:h-14 bg-[#d90416]' />
							<h2 className='font-display text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold uppercase italic tracking-tighter'>
								{t.heading}
							</h2>
						</div>
						<button
							type='button'
							onClick={handleCopy}
							title={t.copyHint}
							className='flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-full border border-neutral-200 text-neutral-400 hover:border-black hover:text-black transition-colors cursor-pointer shrink-0'
						>
							<Copy size={15} />
						</button>
					</div>

					<div className='max-w-md space-y-3 sm:space-y-4 border-t border-neutral-100 pt-2'>
						{Object.values(t.data).map((item, i) => (
							<div
								key={i}
								className='flex justify-between items-end border-b border-neutral-50 pb-2'
							>
								<span className='font-mono text-[10px] 2xl:text-xs uppercase text-neutral-400 tracking-widest'>
									{item.label}
								</span>
								<span className='font-sans font-bold text-lg sm:text-xl 2xl:text-2xl uppercase italic'>
									{item.val}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Skills Grid */}
				<div className='bg-neutral-900 p-6 sm:p-8 lg:p-10 2xl:p-12 text-white rounded-sm relative overflow-hidden'>
					<div className='absolute top-0 right-0 p-4 font-mono text-[8px] opacity-20 uppercase tracking-[0.5em] vertical-text'>
						Arkayev Performance
					</div>
					<h3 className='font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.3em] text-[#d90416] mb-2 sm:mb-3 font-bold'>
						// {t.skillsHeading}
					</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-y-3 gap-x-2.5 sm:gap-x-3 2xl:gap-y-4 2xl:gap-x-4'>
						{t.skillList.map((skill, i) => {
							const Icon = skill.icon
							const content = (
								<>
									<Icon size={16} className='order-1 text-[#d90416] shrink-0' />
									{skill.videoUrl && (
										<span className='order-2 sm:order-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#d90416] text-white shrink-0'>
											<Play size={10} fill='currentColor' className='ml-0.5' />
										</span>
									)}
									<span className='order-3 sm:order-2 font-sans uppercase text-sm 2xl:text-base font-bold tracking-tight opacity-90 flex-1 text-left'>
										{skill[skillKey]}
									</span>
								</>
							)

							// Если есть видео — вся строка кликабельна (удобнее попасть пальцем,
							// чем в маленькую иконку). Рамка + отступы между карточками не дают
							// случайно задеть соседний навык. Если видео нет — просто текст.
							// На мобильном порядок: иконка навыка → play-кнопка → название.
							// От sm и выше: иконка → название → play-кнопка (как было).
							return skill.videoUrl ? (
								<button
									key={i}
									type='button'
									onClick={() => setActiveVideo(skill.videoUrl)}
									className='flex items-center gap-2.5 py-2.5 px-3 2xl:py-3 2xl:px-3.5 rounded-sm border border-white/20 hover:border-[#d90416]/50 hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer text-left'
								>
									{content}
								</button>
							) : (
								<div
									className='flex items-center gap-2.5 py-2.5 px-3 2xl:py-3 2xl:px-3.5 rounded-sm border border-white/20'
									key={i}
								>
									{content}
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Sizes & Measurements — full width, for wardrobe / stunt coordination */}
			<div className='mt-6 sm:mt-8 lg:mt-10 border border-neutral-100 rounded-sm p-5 sm:p-6 md:p-8 2xl:p-10'>
				<div className='flex items-baseline justify-between mb-5 sm:mb-6 flex-wrap gap-2'>
					<h3 className='font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold'>
						// {t.sizesHeading}
					</h3>
					<span className='font-mono text-[9px] 2xl:text-[10px] uppercase tracking-widest text-neutral-300'>
						{t.sizesNote}
					</span>
				</div>

				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-6 2xl:gap-x-8 gap-y-4 sm:gap-y-5 2xl:gap-y-6'>
					{Object.values(t.sizes).map((item, i) => (
						<div key={i} className='flex flex-col gap-1'>
							<span className='font-mono text-[9px] 2xl:text-[10px] uppercase text-neutral-400 tracking-widest'>
								{item.label}
							</span>
							<span className='font-sans font-bold text-sm 2xl:text-base'>
								{item.val}
							</span>
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
						className='relative w-full max-w-xs sm:max-w-sm 2xl:max-w-md'
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
