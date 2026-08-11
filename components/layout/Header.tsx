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
		// Высоту хедера (h-16 → h-20) намеренно не трогаю сильнее на mobile, чтобы не
		// разъехался scroll-mt-24 у секций (About/Contacts/Filmography/PhotoGallery/
		// ShowReel) — они рассчитаны на текущую высоту. Дальше идёт mobile-first
		// раскладка: без префикса — стили для <640px, дальше слоями sm/md/lg/xl/2xl.
		<header className='fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-16 sm:h-20 flex items-center justify-between'>
				{/* Wordmark вместо лого, всегда ведёт на главную (с учётом текущего языка).
				    Размер шрифта плавно растёт от мобильного к ultra-wide: text-sm на
				    мобильном → text-lg на десктопе → text-xl на 2xl (большие мониторы). */}
				<Link
					href={lang === 'en' ? '/' : `/${lang}`}
					onClick={() => {
						// Next.js не скроллит наверх, если путь не меняется (клик на логотип
						// уже находясь на главной) — форсируем сами.
						if (typeof window !== 'undefined') {
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}
					}}
					className='font-mono text-sm sm:text-base lg:text-lg 2xl:text-xl tracking-tight font-bold text-black hover:text-[#d90416] transition-colors shrink-0'
				>
					hama-actor.com
				</Link>

				{/* Десктоп-навигация — появляется от lg (1024px) и шире.
				    Расстояние между пунктами растёт на xl/2xl, чтобы не было пусто на
				    широких экранах. */}
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
						onClick={handleShare}
						className='p-1.5 sm:p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Share'
					>
						<LuShare2 size={18} className='sm:w-[18px] sm:h-[18px]' />
					</button>

					{/* Языковой дропдаун */}
					<div
						className='relative border-l pl-3 sm:pl-4 md:pl-6 border-neutral-200'
						ref={langRef}
					>
						<button
							onClick={() => setLangOpen(v => !v)}
							className='flex items-center gap-1.5 text-neutral-600 hover:text-black transition cursor-pointer'
						>
							<Globe size={18} />
							{/* Код языка (EN/RU/KZ/KO) на самых узких экранах прячем, чтобы
							    иконки не слипались — от sm показываем как обычно. */}
							<span className='hidden sm:inline font-mono text-[10px] uppercase font-bold'>
								{activeLocale.label}
							</span>
							<ChevronDown
								size={13}
								className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}
							/>
						</button>

						{langOpen && (
							<div className='absolute right-0 top-full mt-3 w-44 sm:w-48 2xl:w-56 bg-white border border-neutral-100 rounded-sm shadow-lg overflow-hidden'>
								{otherLocales.map(l => (
									<Link
										key={l.id}
										href={`/${l.id}`}
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

					{/* Мобильное меню — бургер, скрывается от lg (там уже видна десктоп-нав) */}
					<button
						onClick={() => setMenuOpen(v => !v)}
						className='lg:hidden p-1.5 sm:p-2 text-neutral-600 hover:text-black transition cursor-pointer'
						aria-label='Menu'
					>
						{menuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Затемняющий фон позади мобильного меню — клик по нему закрывает меню.
			    top-16 на мобильном (совпадает с h-16 хедера), top-20 от sm (совпадает
			    с h-20) — иначе на маленьких экранах остаётся светлая полоса под хедером. */}
			{menuOpen && (
				<div
					className='lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/50 z-40'
					onClick={() => setMenuOpen(false)}
				/>
			)}

			{/* Мобильная навигация — тёмная панель, выпадает под хедером.
			    На узком мобильном — список в один столбец, от sm (планшет/крупный
			    телефон в альбомной ориентации) — сетка в 2 колонки, чтобы не тянуться
			    вертикально и не занимать весь экран без необходимости. */}
			{menuOpen && (
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
			)}
		</header>
	)
}
