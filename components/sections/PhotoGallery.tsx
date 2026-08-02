'use client'

import React, { useState } from 'react'
import Image from 'next/image'

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
		en: { heading: 'Gallery', sub: 'Swipe to see portfolio' },
		ru: { heading: 'Галерея', sub: 'Листайте портфолио' },
		kk: { heading: 'Галерея', sub: 'Портфолионы көру' },
		ko: { heading: '갤러리', sub: '포트폴리오 보기' },
	}[resolvedLocale]

	return (
		<section className='container mx-auto px-4 py-16' id='photos'>
			{/* Заголовок с кастомными стрелками навигации */}
			<div className='mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-8'>
				<div className='flex items-center gap-6'>
					<div className='h-12 w-[3px] bg-[#d90416]' />
					<h2 className='font-display text-4xl md:text-5xl font-bold uppercase italic tracking-tighter text-black'>
						{t.heading}
					</h2>
					<span className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400'>
						// {t.sub}
					</span>
				</div>

				{/* Контейнер для кастомных кнопок навигации */}
				<div className='flex gap-2 self-end md:self-auto'>
					<button className='swiper-button-prev-custom w-12 h-12 flex items-center justify-center border border-neutral-200 rounded-sm hover:border-black hover:bg-black hover:text-white transition-all'>
						<LuChevronLeft size={24} />
					</button>
					<button className='swiper-button-next-custom w-12 h-12 flex items-center justify-center border border-neutral-200 rounded-sm hover:border-black hover:bg-black hover:text-white transition-all'>
						<LuChevronRight size={24} />
					</button>
				</div>
			</div>

			{/* ГОРИЗОНТАЛЬНЫЙ СЛАЙДЕР (SWIPER) */}
			<div className='photo-slider-container relative'>
				<Swiper
					modules={[Navigation, Pagination, Mousewheel]}
					spaceBetween={20}
					slidesPerView={1}
					grabCursor={true}
					mousewheel={{ forceToAxis: true }}
					navigation={{
						prevEl: '.swiper-button-prev-custom',
						nextEl: '.swiper-button-next-custom',
					}}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className='pb-12' // отступ снизу для пагинации
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
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
								/>

								{/* Оверлей при наведении */}
								<div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30 flex items-center justify-center'>
									<div className='font-mono text-[10px] uppercase text-white tracking-widest bg-black/50 px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity'>
										View Fullscreen
									</div>
								</div>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* ПОЛНОЭКРАННЫЙ ПРОСМОТР (LIGHTBOX) - Тот же */}
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
					background: #ffffff; /* Твой красный цвет */
				}
			`}</style>
		</section>
	)
}
