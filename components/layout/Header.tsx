'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LuShare2 } from 'react-icons/lu'
import { Globe, ChevronDown, Menu, X } from 'lucide-react'
import { toast } from 'sonner'

const locales = [
	{ id: 'en', code: 'gb', label: 'EN', name: 'English' },
	{ id: 'ru', code: 'ru', label: 'RU', name: 'Русский' },
	{ id: 'kk', code: 'kz', label: 'KZ', name: 'Қазақша' },
	{ id: 'ko', code: 'kr', label: 'KO', name: '한국어' },
]

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

	// Получаем lang из URL. Если мы на "/", params.lang будет пустым, поэтому ставим 'en'
	const rawLang = (params?.lang as string) || 'en'
	const lang = rawLang === 'kz' ? 'kk' : rawLang

	const [langOpen, setLangOpen] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const langRef = useRef<HTMLDivElement>(null)

	// закрыть дропдаун языка по клику вне его
	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (langRef.current && !langRef.current.contains(e.target as Node)) {
				setLangOpen(false)
			}
		}
		document.addEventListener('mousedown', onClickOutside)
		return () => document.removeEventListener('mousedown', onClickOutside)
	}, [])

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

		// На мобильных — нативное системное меню "поделиться"
		if (typeof navigator.share === 'function') {
			try {
				await navigator.share(shareData)
			} catch (err) {
				// AbortError — пользователь просто закрыл системное меню, это не ошибка
				if ((err as Error).name !== 'AbortError') {
					console.error('Share failed', err)
				}
			}
			return
		}

		// Десктоп без Web Share API — копируем ссылку в буфер
		try {
			await navigator.clipboard.writeText(window.location.href)
			toast.success(lang === 'ru' ? 'Ссылка скопирована!' : 'Link copied!')
		} catch (err) {
			console.error('Copy failed', err)
			toast.error(lang === 'ru' ? 'Не удалось скопировать' : 'Could not copy')
		}
	}

	const activeLocale = locales.find(l => l.id === lang) ?? locales[0]
	const otherLocales = locales.filter(l => l.id !== lang)

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100'>
			<div className='container mx-auto px-4 h-20 flex items-center justify-between'>
				{/* Wordmark вместо лого, всегда ведёт на главную (с учётом текущего языка) */}
				<Link
					href={lang === 'en' ? '/' : `/${lang}`}
					onClick={() => {
						// Next.js не скроллит наверх, если путь не меняется (клик на логотип
						// уже находясь на главной) — форсируем сами.
						if (typeof window !== 'undefined') {
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}
					}}
					className='font-mono text-sm md:text-base tracking-tight font-bold text-black hover:text-[#d90416] transition-colors'
				>
					hama-actor.com
				</Link>

				{/* Десктоп-навигация */}
				<nav className='hidden lg:flex items-center gap-8'>
					{NAV.map(item => (
						<a
							key={item.href}
							href={item.href}
							className='font-mono text-[11px] uppercase tracking-widest text-neutral-500 hover:text-black transition-colors'
						>
							{navLabel(item)}
						</a>
					))}
				</nav>

				<div className='flex items-center gap-4 md:gap-6'>
					<button
						onClick={handleShare}
						className='p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Share'
					>
						<LuShare2 size={18} />
					</button>

					{/* Языковой дропдаун */}
					<div
						className='relative border-l pl-4 md:pl-6 border-neutral-200'
						ref={langRef}
					>
						<button
							onClick={() => setLangOpen(v => !v)}
							className='flex items-center gap-1.5 text-neutral-600 hover:text-black transition cursor-pointer'
						>
							<Globe size={18} />
							<span className='font-mono text-[10px] uppercase font-bold'>
								{activeLocale.label}
							</span>
							<ChevronDown
								size={13}
								className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}
							/>
						</button>

						{langOpen && (
							<div className='absolute right-0 top-full mt-3 w-44 bg-white border border-neutral-100 rounded-sm shadow-lg overflow-hidden'>
								{otherLocales.map(l => (
									<Link
										key={l.id}
										href={l.id === 'en' ? '/' : `/${l.id}`}
										scroll={false}
										onClick={() => setLangOpen(false)}
										className='flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors'
									>
										<span className='w-5 h-5 rounded-full overflow-hidden shrink-0 border border-neutral-200'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={`https://flagcdn.com/w40/${l.code}.png`}
												alt={l.name}
												className='w-full h-full object-cover'
											/>
										</span>
										<span className='font-sans text-sm'>{l.name}</span>
									</Link>
								))}
							</div>
						)}
					</div>

					{/* Мобильное меню — бургер */}
					<button
						onClick={() => setMenuOpen(v => !v)}
						className='lg:hidden p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Menu'
					>
						{menuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Затемняющий фон позади мобильного меню — клик по нему закрывает меню */}
			{menuOpen && (
				<div
					className='lg:hidden fixed inset-0 top-20 bg-black/50 z-40'
					onClick={() => setMenuOpen(false)}
				/>
			)}

			{/* Мобильная навигация — тёмная панель, выпадает под хедером */}
			{menuOpen && (
				<nav className='lg:hidden absolute top-full left-0 w-full bg-neutral-950 shadow-xl z-50'>
					<div className='container mx-auto px-4 py-4 flex flex-col gap-1'>
						{NAV.map(item => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setMenuOpen(false)}
								className='font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-white py-3 border-b border-white/10 last:border-0 transition-colors'
							>
								{navLabel(item)}
							</a>
						))}
					</div>
				</nav>
			)}
		</header>
	)
}
