'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

export const LOCALES = [
	{ id: 'en', code: 'gb', label: 'EN', name: 'English' },
	{ id: 'ru', code: 'ru', label: 'RU', name: 'Русский' },
	{ id: 'kk', code: 'kz', label: 'KZ', name: 'Қазақша' },
	{ id: 'ko', code: 'kr', label: 'KO', name: '한국어' },
]

interface LanguageSwitcherProps {
	currentLang: string
}

export default function LanguageSwitcher({
	currentLang,
}: LanguageSwitcherProps) {
	const [langOpen, setLangOpen] = useState(false)
	const langRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (langRef.current && !langRef.current.contains(e.target as Node)) {
				setLangOpen(false)
			}
		}
		document.addEventListener('mousedown', onClickOutside)
		return () => document.removeEventListener('mousedown', onClickOutside)
	}, [])

	const activeLocale = LOCALES.find(l => l.id === currentLang) ?? LOCALES[0]
	const otherLocales = LOCALES.filter(l => l.id !== currentLang)

	// Строим href с учётом того, что proxy.ts трактует "/en" как непрямой
	// путь (redirect -> "/" -> rewrite на "/en"): для дефолтного языка сразу
	// ведём на "/", чтобы не делать лишний сетевой hop.
	// Хэш текущей страницы (например "#contact") сохраняем, чтобы после
	// смены языка пользователя не выкидывало со скролл-позиции.
	const buildHref = (id: string) => {
		const base = id === 'en' ? '/' : `/${id}`
		const hash = typeof window !== 'undefined' ? window.location.hash : ''
		return `${base}${hash}`
	}

	return (
		<div
			className='relative border-l pl-3 sm:pl-4 md:pl-6 border-neutral-200'
			ref={langRef}
		>
			<button
				type='button'
				onClick={() => setLangOpen(v => !v)}
				aria-expanded={langOpen}
				aria-controls='language-menu'
				className='flex items-center gap-1.5 text-neutral-600 hover:text-black transition cursor-pointer'
				aria-label='Change Language'
			>
				<Globe size={18} />
				<span className='hidden sm:inline font-mono text-[10px] uppercase font-bold'>
					{activeLocale.label}
				</span>
				<ChevronDown
					size={13}
					className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{langOpen && (
				<div
					id='language-menu'
					role='menu'
					className='absolute right-0 top-full mt-3 w-44 sm:w-48 2xl:w-56 bg-white border border-neutral-100 rounded-sm shadow-lg overflow-hidden z-50'
				>
					{otherLocales.map(l => (
						<Link
							key={l.id}
							href={buildHref(l.id)}
							role='menuitem'
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
	)
}
