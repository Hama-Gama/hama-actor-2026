'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { LuShare2 } from 'react-icons/lu'
import { toast } from 'react-hot-toast'

const locales = [
	{ id: 'en', label: 'EN' },
	{ id: 'ru', label: 'RU' },
	{ id: 'kk', label: 'KZ' },
	{ id: 'ko', label: 'KO' },
]

export default function Header() {
	const params = useParams()

	// Получаем lang из URL. Если мы на "/", params.lang будет пустым, поэтому ставим 'en'
	const rawLang = (params?.lang as string) || 'en'
	const lang = rawLang === 'kz' ? 'kk' : rawLang

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href)
			toast.success('Link copied!')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<header className='fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100'>
			<div className='container mx-auto px-4 h-20 flex items-center justify-between'>
				{/* Logo всегда на главную */}
				<Link href='/' className='flex items-center gap-3' scroll={false}>
					<div className='relative w-10 h-10'>
						<Image
							src='/logo.png'
							alt='Logo'
							fill
							className='rounded-full object-cover'
						/>
					</div>
					<span className='font-sans text-xl tracking-tighter uppercase font-black'>
						Arkayev
					</span>
				</Link>

				{/* Языковой переключатель */}
				<div className='flex items-center gap-6'>
					<button
						onClick={handleShare}
						className='p-2 text-neutral-600 hover:text-black transition cursor-pointer'
					>
						<LuShare2 size={18} />
					</button>

					<div className='flex gap-4 font-mono text-[10px] border-l pl-6 border-neutral-200'>
						{locales.map(l => {
							const isActive = lang === l.id
							const href = l.id === 'en' ? '/' : `/${l.id}`

							return (
								<Link
									key={l.id}
									href={href}
									//scroll={false} предотвращает прыжок вверх при смене языка
									scroll={false}
									className={`transition-all duration-300 ${
										isActive
											? 'text-[#d90416] font-bold underline underline-offset-8'
											: 'text-neutral-400 hover:text-black'
									}`}
								>
									{l.label}
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</header>
	)
}
