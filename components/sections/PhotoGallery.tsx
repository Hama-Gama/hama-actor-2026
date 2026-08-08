'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SiGoogledrive } from 'react-icons/si'

// Swiper: Ядро и необходимые модули
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

// Swiper: Стили (обязательно импортировать!)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Иконки для кастомной навигации
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

// Тот же Lightbox
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const DRIVE_URL =
	'https://drive.google.com/drive/folders/1vFiCIkv9dQ1EDjQlkZpD7NOSSRaNbiy6?usp=sharing'

// Вспомогательная функция для локали
function normalizeLocale(locale?: string): 'en' | 'ru' | 'kk' | 'ko' {
	if (!locale) return 'en'
	const value = locale.toLowerCase()
	if (value.startsWith('ru')) return 'ru'
	if (value.startsWith('kk') || value.startsWith('kz')) return 'kk'
	if (value.startsWith('ko')) return 'ko'
	return 'en'
}

// Те же фотографии (для слайдера нам не нужны width/height, но они нужны для Lightbox)
const PHOTOS = [
	{
		src: '/gallery/11.webp',
		width: 800,
		height: 1200,
		alt: 'Khamit Arkayev Headshot',
	},
	{ src: '/gallery/22.webp', width: 1200, height: 800, alt: 'Action Scene' },
	{
		src: '/gallery/33.webp',
		width: 1000,
		height: 1500,
		alt: 'Dramatic Look',
	},
	{
		src: '/gallery/44.webp',
		width: 1200,
		height: 800,
		alt: 'Stunt Performance',
	},
	{
		src: '/gallery/55.webp',
		width: 1200,
		height: 800,
		alt: 'Stunt Performance',
	},
]

export const PhotoGallery = ({ locale }: { locale?: string }) => {
	const [index, setIndex] = useState(-1)
	const resolvedLocale = normalizeLocale(locale)

	const t = {
		en: {
			heading: 'Gallery',
			sub: 'Swipe to see portfolio',
			drive: 'Raw Materials',
		},
		ru: {
			heading: 'Галерея',
			sub: 'Листайте портфолио',
			drive: 'Исходные материалы',
		},
		kk: {
			heading: 'Галерея',
			sub: 'Портфолионы көру',
			drive: 'Бастапқы материалдар',
		},
		ko: { heading: '갤러리', sub: '포트폴리오 보기', drive: '원본 자료' },
	}[resolvedLocale]

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10 sm:py-12 lg:py-16 scroll-mt-24'
			id='photos'
		>
			{/* Заголовок с кнопкой Google Drive и кастомными стрелками навигации */}
			<div className='mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 border-b border-neutral-100 pb-6 sm:pb-8'>
				<div className='flex items-center gap-3 sm:gap-6'>
					<div className='h-10 w-[3px] sm:h-12 2xl:h-14 bg-[#d90416]' />
					<h2 className='font-display text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold uppercase italic tracking-tighter text-black'>
						{t.heading}
					</h2>
					<span className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 hidden sm:inline-block'>
						// {t.sub}
					</span>
				</div>

				<div className='flex items-center gap-3 sm:gap-4 self-end md:self-auto'>
					{/* Кнопка Google Drive */}
					<a
						href={DRIVE_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white group'
					>
						<SiGoogledrive
							className='text-black group-hover:text-white transition-colors shrink-0'
							size={14}
						/>
						<span className='font-mono text-[10px] 2xl:text-xs uppercase font-bold tracking-wider'>
							{t.drive}
						</span>
					</a>

					{/* Контейнер для кастомных кнопок навигации */}
					<div className='flex gap-2'>
						<button className='swiper-button-prev-custom w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 flex items-center justify-center border border-neutral-200 rounded-sm hover:border-black hover:bg-black hover:text-white transition-all'>
							<LuChevronLeft size={18} className='sm:w-5 sm:h-5' />
						</button>
						<button className='swiper-button-next-custom w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 flex items-center justify-center border border-neutral-200 rounded-sm hover:border-black hover:bg-black hover:text-white transition-all'>
							<LuChevronRight size={18} className='sm:w-5 sm:h-5' />
						</button>
					</div>
				</div>
			</div>

			{/* ГОРИЗОНТАЛЬНЫЙ СЛАЙДЕР (SWIPER) */}
			<div className='photo-slider-container relative'>
				<Swiper
					modules={[Navigation, Pagination, Mousewheel]}
					spaceBetween={16}
					slidesPerView={1}
					grabCursor={true}
					observer={true}
					observeParents={true}
					mousewheel={{ forceToAxis: true }}
					navigation={{
						prevEl: '.swiper-button-prev-custom',
						nextEl: '.swiper-button-next-custom',
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					// Добавлен брейкпоинт 1536 (2xl) — на ultra-wide мониторе есть смысл
					// показать 4 фото сразу, а не оставлять их растянутыми на 3 колонки.
					breakpoints={{
						640: { slidesPerView: 2, spaceBetween: 20 },
						1024: { slidesPerView: 3, spaceBetween: 20 },
						1536: { slidesPerView: 4, spaceBetween: 24 },
					}}
					className='pb-10 sm:pb-12'
				>
					{PHOTOS.map((photo, i) => (
						<SwiperSlide
							key={i}
							className='overflow-hidden rounded-sm bg-neutral-100'
						>
							<button
								type='button'
								className='relative block aspect-[3/4] w-full cursor-zoom-in group'
								onClick={() => setIndex(i)}
							>
								{/* Изображение */}
								<Image
									src={photo.src}
									alt={photo.alt}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw'
								/>

								{/* Оверлей при наведении */}
								<div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30 flex items-center justify-center'>
									<div className='font-mono text-[9px] sm:text-[10px] uppercase text-white tracking-widest bg-black/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity'>
										View Fullscreen
									</div>
								</div>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* ПОЛНОЭКРАННЫЙ ПРОСМОТР (LIGHTBOX) */}
			<Lightbox
				slides={PHOTOS}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				styles={{
					container: { backgroundColor: 'rgba(0, 0, 0, 0.98)' },
					toolbar: { backgroundColor: 'transparent' },
				}}
			/>

			{/* Кастомные стили для Swiper пагинации внизу */}
			<style jsx global>{`
				.photo-slider-container .swiper-pagination-bullet {
					background: #neutral-300;
					opacity: 0.7;
				}
				.photo-slider-container .swiper-pagination-bullet-active {
					background: #ffffff;
				}
			`}</style>
		</section>
	)
}
