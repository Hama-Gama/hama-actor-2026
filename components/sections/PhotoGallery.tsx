'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SiGoogledrive } from 'react-icons/si'

// Swiper: Ядро и необходимые модули
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules'

// Swiper: Стили
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Lightbox
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Конфигурация галереи
import { GALLERY_PHOTOS } from '@/lib/gallery-config'

const DRIVE_URL =
	'https://drive.google.com/drive/folders/1vFiCIkv9dQ1EDjQlkZpD7NOSSRaNbiy6?usp=sharing'

function normalizeLocale(locale?: string): 'en' | 'ru' | 'kk' | 'ko' {
	if (!locale) return 'en'
	const value = locale.toLowerCase()
	if (value.startsWith('ru')) return 'ru'
	if (value.startsWith('kk') || value.startsWith('kz')) return 'kk'
	if (value.startsWith('ko')) return 'ko'
	return 'en'
}

export const PhotoGallery = ({ locale }: { locale?: string }) => {
	const [index, setIndex] = useState(-1)
	const resolvedLocale = normalizeLocale(locale)

	const t = {
		en: {
			heading: 'Gallery',
			sub: 'Swipe to see portfolio',
		},
		ru: {
			heading: 'Галерея',
			sub: 'Листайте портфолио',
		},
		kk: {
			heading: 'Галерея',
			sub: 'Портфолионы көру',
		},
		ko: { heading: '갤러리', sub: '포트폴리오 보기' },
	}[resolvedLocale]

	return (
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 scroll-mt-24'
			id='photos'
		>
			<div className='mb-4 sm:mb-5 flex items-center justify-between gap-4 border-b border-neutral-100 pb-3 sm:pb-4 w-full'>
				<div className='flex items-center gap-3 sm:gap-6'>
					<div className='h-8 sm:h-10 2xl:h-12 w-[3px] bg-[#d90416]' />
					<h2 className='font-display text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold uppercase italic tracking-tighter text-black'>
						{t.heading}
					</h2>
					<span className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 hidden sm:inline-block'>
						// {t.sub}
					</span>
				</div>

				<a
					href={DRIVE_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white group shrink-0'
				>
					<SiGoogledrive
						className='text-black group-hover:text-white transition-colors shrink-0'
						size={14}
					/>
					<span className='font-mono text-[10px] 2xl:text-xs uppercase font-bold tracking-wider whitespace-nowrap'>
						Google Drive
					</span>
				</a>
			</div>

			{/* ГОРИЗОНТАЛЬНЫЙ СЛАЙДЕР (SWIPER) */}
			<div className='photo-slider-container relative'>
				<Swiper
					modules={[Navigation, Pagination, Mousewheel]}
					spaceBetween={16}
					slidesPerView={1.2}
					grabCursor={true}
					observer={true}
					observeParents={true}
					mousewheel={{ forceToAxis: true }}
					pagination={{
						el: '.custom-swiper-pagination',
						clickable: true,
						dynamicBullets: true,
					}}
					breakpoints={{
						640: { slidesPerView: 2.2, spaceBetween: 20 },
						1024: { slidesPerView: 3.25, spaceBetween: 20 },
						1536: { slidesPerView: 4.25, spaceBetween: 24 },
					}}
					className='mb-4'
				>
					{GALLERY_PHOTOS.map((photo, i) => (
						<SwiperSlide
							key={photo.src}
							className='overflow-hidden rounded-sm bg-neutral-100'
						>
							<button
								type='button'
								className='relative block aspect-[3/4] w-full cursor-zoom-in group'
								onClick={() => setIndex(i)}
							>
								<Image
									src={photo.src}
									alt={photo.alt}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-105'
									sizes='(max-width: 640px) 80vw, (max-width: 1024px) 45vw, (max-width: 1536px) 30vw, 22vw'
								/>

								<div className='absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30 flex items-center justify-center'>
									<div className='font-mono text-[9px] sm:text-[10px] uppercase text-white tracking-widest bg-black/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity'>
										View Fullscreen
									</div>
								</div>
							</button>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Вынесенные буллеты под карточками */}
				<div className='custom-swiper-pagination flex justify-center items-center gap-1 mt-6 h-6' />
			</div>

			<Lightbox
				slides={GALLERY_PHOTOS}
				open={index >= 0}
				index={index}
				close={() => setIndex(-1)}
				styles={{
					container: { backgroundColor: 'rgba(0, 0, 0, 0.98)' },
					toolbar: { backgroundColor: 'transparent' },
				}}
			/>

			<style jsx global>{`
				.custom-swiper-pagination {
					position: relative !important;
					bottom: auto !important;
					top: auto !important;
					width: 100% !important;
				}
				.custom-swiper-pagination .swiper-pagination-bullet {
					background: #a3a3a3 !important;
					opacity: 0.5;
					transition: all 0.3s ease;
				}
				.custom-swiper-pagination .swiper-pagination-bullet-active {
					background: #000000 !important;
					opacity: 1;
					transform: scale(1.2);
				}
			`}</style>
		</section>
	)
}
