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
import {
	ACTOR_NAME,
	ACTOR_CONTACT,
	BODY_MEASUREMENTS,
	CLOTHING_MEASUREMENTS,
	FIXED_SIZES,
	SKILLS,
	type SkillIconId,
} from '@/lib/about-config'

// Сопоставление iconId (из конфига) → компонент иконки lucide-react.
// Добавляешь навык с новой иконкой в about-config.ts — один раз добавь её
// сюда, дальше просто ссылаешься на iconId.
const ICON_MAP: Record<SkillIconId, React.ElementType> = {
	taekwondo: Footprints,
	boxing: HandFist,
	mma: Swords,
	weapon: Target,
	cardistry: Spade,
	skydiving: WindArrowDown,
	motorcycling: Motorbike,
}

// Форматирование замера: en показывает imperial + metric, остальные — только
// metric. Меняешь порядок/формат тут в одном месте — единообразно для всех
// параметров и размеров.
const formatMeasurement = (
	m: { metric: string; imperial: string },
	isEn: boolean,
) => (isEn ? `${m.imperial} / ${m.metric}` : m.metric)

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
		// Цвет глаз/волос и ведущая рука — переводимые слова, не цифры,
		// поэтому остаются здесь, а не в about-config.ts.
		eyes: isRu ? 'Зелёные' : isEn ? 'Green' : isKk ? 'Жасыл' : '초록색',
		hair: isRu ? 'Тёмные' : isEn ? 'Dark' : isKk ? 'Қара' : '어두운색',
		hand: isRu ? 'Правая' : isEn ? 'Right' : isKk ? 'Оң қол' : '오른손',
	}

	const dataLabels = {
		height: isRu ? 'Рост' : isEn ? 'Height' : isKk ? 'Бойы' : '키',
		weight: isRu ? 'Вес' : isEn ? 'Weight' : isKk ? 'Салмағы' : '몸무게',
		eyes: isRu ? 'Глаза' : isEn ? 'Eyes' : isKk ? 'Көз түсі' : '눈 색',
		hair: isRu ? 'Волосы' : isEn ? 'Hair' : isKk ? 'Шаш түсі' : '머리색',
	}

	// Значения params — height/weight из конфига (форматируются), eyes/hair —
	// переводные слова выше.
	const dataItems = [
		{
			label: dataLabels.height,
			val: formatMeasurement(BODY_MEASUREMENTS.height, isEn),
		},
		{
			label: dataLabels.weight,
			val: formatMeasurement(BODY_MEASUREMENTS.weight, isEn),
		},
		{ label: dataLabels.eyes, val: t.eyes },
		{ label: dataLabels.hair, val: t.hair },
	]

	const sizeLabels = {
		chest: isRu ? 'Грудь' : isEn ? 'Chest' : isKk ? 'Кеуде' : '가슴둘레',
		waist: isRu ? 'Талия' : isEn ? 'Waist' : isKk ? 'Бел' : '허리둘레',
		hips: isRu ? 'Бёдра' : isEn ? 'Hips' : isKk ? 'Жамбас' : '엉덩이둘레',
		shoulders: isRu
			? 'Ширина плеч'
			: isEn
				? 'Shoulders'
				: isKk
					? 'Иық ені'
					: '어깨너비',
		sleeveShoulder: isRu
			? 'Рукав (от плеча)'
			: isEn
				? 'Sleeve (Shoulder)'
				: isKk
					? 'Жең (иықтан)'
					: '소매길이 (어깨선)',
		sleeveNeck: isRu
			? 'Рукав (от шеи, CB)'
			: isEn
				? 'Sleeve (Neck/CB)'
				: isKk
					? 'Жең (мойыннан, CB)'
					: '소매길이 (목뒤중심, CB)',
		inseam: isRu
			? 'Шаг (inseam)'
			: isEn
				? 'Inseam'
				: isKk
					? 'Шалбар ұзындығы (inseam)'
					: '인심 (다리안쪽길이)',
		neck: isRu ? 'Шея' : isEn ? 'Neck' : isKk ? 'Мойын' : '목둘레',
		hat: isRu
			? 'Головной убор'
			: isEn
				? 'Hat'
				: isKk
					? 'Бас киім'
					: '모자 사이즈',
		reach: isRu
			? 'Размах рук (reach)'
			: isEn
				? 'Reach'
				: isKk
					? 'Қол ұзындығы (reach)'
					: '리치 (팔길이)',
		hand: isRu
			? 'Ведущая рука'
			: isEn
				? 'Dominant Hand'
				: isKk
					? 'Жетекші қол'
					: '주로 사용하는 손',
		glove: isRu
			? 'Перчатки'
			: isEn
				? 'Glove Size'
				: isKk
					? 'Қолғап өлшемі'
					: '장갑 사이즈',
		jacket: isRu
			? 'Пиджак / Костюм'
			: isEn
				? 'Jacket / Suit'
				: isKk
					? 'Пиджак / Костюм'
					: '재킷 / 수트 사이즈',
		shoe: isRu ? 'Обувь' : isEn ? 'Shoe' : isKk ? 'Аяқ киім' : '신발 사이즈',
	}

	// Размеры одежды из CLOTHING_MEASUREMENTS (форматируются) + FIXED_SIZES
	// (уже готовая строка) + hand (переводное слово). Порядок в массиве =
	// порядок отображения.
	const sizeItems = [
		{
			label: sizeLabels.chest,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.chest, isEn),
		},
		{
			label: sizeLabels.waist,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.waist, isEn),
		},
		{
			label: sizeLabels.hips,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.hips, isEn),
		},
		{
			label: sizeLabels.shoulders,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.shoulders, isEn),
		},
		{
			label: sizeLabels.sleeveShoulder,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.sleeveShoulder, isEn),
		},
		{
			label: sizeLabels.sleeveNeck,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.sleeveNeck, isEn),
		},
		{
			label: sizeLabels.inseam,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.inseam, isEn),
		},
		{
			label: sizeLabels.neck,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.neck, isEn),
		},
		{ label: sizeLabels.hat, val: FIXED_SIZES.hat },
		{
			label: sizeLabels.reach,
			val: formatMeasurement(CLOTHING_MEASUREMENTS.reach, isEn),
		},
		{ label: sizeLabels.hand, val: t.hand },
		{ label: sizeLabels.glove, val: FIXED_SIZES.glove },
		{ label: sizeLabels.jacket, val: FIXED_SIZES.jacket },
		{ label: sizeLabels.shoe, val: FIXED_SIZES.shoe },
	]

	// Определяем ключ для перевода названия навыка
	const skillKey = isRu ? 'ru' : isKk ? 'kk' : isKo ? 'ko' : 'en'

	const roleLabel = isRu
		? 'Актёр / каскадёр'
		: isEn
			? 'Actor / Stunt Performer'
			: isKk
				? 'Актёр / каскадёр'
				: '배우 / 스턴트 퍼포머'

	const contactLabels = {
		whatsapp: 'WhatsApp',
		email: 'Email',
		website: isRu ? 'Сайт' : isEn ? 'Website' : isKk ? 'Сайт' : '웹사이트',
	}

	const handleCopy = async () => {
		const lines = [
			`${ACTOR_NAME} — ${roleLabel}`,
			`${contactLabels.whatsapp}: ${ACTOR_CONTACT.whatsapp}`,
			`${contactLabels.email}: ${ACTOR_CONTACT.email}`,
			`${contactLabels.website}: ${ACTOR_CONTACT.website}`,
			'',
			...dataItems.map(item => `${item.label}: ${item.val}`),
			...sizeItems.map(item => `${item.label}: ${item.val}`),
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
						{dataItems.map((item, i) => (
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
						{SKILLS.map(skill => {
							const Icon = ICON_MAP[skill.iconId]
							const content = (
								<>
									<Icon size={16} className='order-1 text-[#d90416] shrink-0' />
									{skill.videoUrl && (
										<span className='order-2 sm:order-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#d90416] text-white shrink-0'>
											<Play size={10} fill='currentColor' className='ml-0.5' />
										</span>
									)}
									<span className='order-3 sm:order-2 font-sans uppercase text-sm 2xl:text-base font-bold tracking-tight opacity-90 flex-1 text-left'>
										{skill.name[skillKey]}
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
									key={skill.id}
									type='button'
									onClick={() => setActiveVideo(skill.videoUrl!)}
									className='flex items-center gap-2.5 py-2.5 px-3 2xl:py-3 2xl:px-3.5 rounded-sm border border-white/20 hover:border-[#d90416]/50 hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer text-left'
								>
									{content}
								</button>
							) : (
								<div
									className='flex items-center gap-2.5 py-2.5 px-3 2xl:py-3 2xl:px-3.5 rounded-sm border border-white/20'
									key={skill.id}
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
					{sizeItems.map((item, i) => (
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
