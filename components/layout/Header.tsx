'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { LuShare2 } from 'react-icons/lu'
import { Menu, X } from 'lucide-react'
import { toast } from 'sonner'
import LanguageSwitcher from './LanguageSwitcher'

const NAV = [
	{ href: '#about', ru: 'О себе', en: 'About', kk: 'Мен туралы', ko: '소개' },
	{
		href: '#photos',
		ru: 'Галерея',
		en: 'Gallery',
		kk: 'Галерея',
		ko: '갤러리',
	},
	{
		href: '#showreels',
		ru: 'Шоурилы',
		en: 'Showreels',
		kk: 'Шоурилдер',
		ko: '쇼릴',
	},
	{
		href: '#filmography',
		ru: 'Фильмография',
		en: 'Filmography',
		kk: 'Фильмография',
		ko: '필모그래피',
	},
	{
		href: '#contact',
		ru: 'Контакты',
		en: 'Contact',
		kk: 'Байланыс',
		ko: '연락처',
	},
]

export default function Header() {
	const params = useParams()
	const rawLang = (params?.lang as string) || 'en'
	const lang = rawLang === 'kz' ? 'kk' : rawLang

	const [menuOpen, setMenuOpen] = useState(false)

	const navLabel = (item: (typeof NAV)[number]) =>
		lang === 'ru'
			? item.ru
			: lang === 'kk'
				? item.kk
				: lang === 'ko'
					? item.ko
					: item.en

	const shareTitle =
		lang === 'ru'
			? 'Хамит Аркаев (Хама) — Актёр, мастер боевых искусств'
			: 'Khamit Arkayev (Hama) — Actor, Martial Artist'

	const handleShare = async () => {
		const shareData = { title: shareTitle, url: window.location.href }

		if (typeof navigator.share === 'function') {
			try {
				await navigator.share(shareData)
			} catch (err) {
				if ((err as Error).name !== 'AbortError') {
					console.error('Share failed', err)
				}
			}
			return
		}

		try {
			await navigator.clipboard.writeText(window.location.href)
			toast.success(lang === 'ru' ? 'Ссылка скопирована!' : 'Link copied!')
		} catch (err) {
			console.error('Copy failed', err)
			toast.error(lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy')
		}
	}

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between'>
				<Link
					href={lang === 'en' ? '/' : `/${lang}`}
					onClick={() => {
						if (typeof window !== 'undefined') {
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}
					}}
					className='font-mono text-sm sm:text-base lg:text-lg 2xl:text-xl tracking-tight font-bold text-black hover:text-[#d90416] transition-colors shrink-0'
				>
					hama-actor.com
				</Link>

				{/* Десктоп-навигация */}
				<nav className='hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10'>
					{NAV.map(item => (
						<a
							key={item.href}
							href={item.href}
							className='font-mono text-[11px] xl:text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors whitespace-nowrap'
						>
							{navLabel(item)}
						</a>
					))}
				</nav>

				<div className='flex items-center gap-3 sm:gap-4 md:gap-6 2xl:gap-8'>
					<button
						type='button'
						onClick={handleShare}
						className='p-1.5 sm:p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Share'
					>
						<LuShare2 size={18} className='sm:w-[18px] sm:h-[18px]' />
					</button>

					{/* Отдельный компонент языкового переключателя */}
					<LanguageSwitcher currentLang={lang} />

					{/* Мобильное меню — бургер */}
					<button
						type='button'
						onClick={() => setMenuOpen(v => !v)}
						className='lg:hidden p-1.5 sm:p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Menu'
					>
						{menuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Выпадающее меню для мобилок */}
			{menuOpen && (
				<>
					<div
						className='lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/50 z-40'
						onClick={() => setMenuOpen(false)}
					/>
					<nav className='lg:hidden absolute top-full left-0 w-full bg-neutral-950 shadow-xl z-50'>
						<div className='container mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-x-6'>
							{NAV.map(item => (
								<a
									key={item.href}
									href={item.href}
									onClick={() => setMenuOpen(false)}
									className='font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-white py-3 border-b border-white/10 transition-colors'
								>
									{navLabel(item)}
								</a>
							))}
						</div>
					</nav>
				</>
			)}
		</header>
	)
}
