'use client'

import React from 'react'
import { toast } from 'sonner'
import {
	FaInstagram,
	FaTelegramPlane,
	FaWhatsapp,
	FaWeixin,
	FaComment,
} from 'react-icons/fa'
import { ContactForm } from './ContactForm'

type ContactsProps = {
	locale?: string
}

// : замени на реальный WeChat ID
const WECHAT_ID = 'hama_arkayev'

// Единый стиль иконки-кружка для всех контактов — меняешь один раз здесь,
// применяется одинаково и к <a>, и к <button> (WeChat).
// Mobile-first: размер круга растёт от мобильного к ultra-wide (w-14 → w-24).
const ICON_CIRCLE_CLASS =
	'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 2xl:w-24 2xl:h-24 flex items-center justify-center rounded-full border border-neutral-600 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300'

const ICON_LABEL_CLASS =
	'font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity'

export const Contacts = ({ locale }: ContactsProps) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'

	const t = {
		heading: isRu
			? 'Контакты'
			: isEn
				? 'Contact'
				: isKk
					? 'Байланыс'
					: '연락처',
		sub: isRu
			? 'Связаться напрямую'
			: isEn
				? 'Get in touch'
				: isKk
					? 'Тікелей хабарласу'
					: '직접 연락하기',
		wechatIdCopied: isRu
			? 'WeChat ID скопирован'
			: isEn
				? 'WeChat ID copied'
				: isKk
					? 'WeChat ID көшірілді'
					: 'WeChat ID가 복사되었습니다',
		wechatCopyFailed: isRu
			? 'Не удалось скопировать'
			: isEn
				? 'Could not copy'
				: isKk
					? 'Көшіру мүмкін болмады'
					: '복사하지 못했습니다',
	}

	const handleWeChatClick = async () => {
		try {
			await navigator.clipboard.writeText(WECHAT_ID)
			toast.success(`${t.wechatIdCopied}: ${WECHAT_ID}`)
		} catch (err) {
			console.error('Failed to copy WeChat ID', err)
			toast.error(t.wechatCopyFailed)
		}
	}

	const links: {
		name: string
		icon: React.ReactNode
		href?: string
		onClick?: () => void
	}[] = [
		{
			name: 'WhatsApp',
			icon: <FaWhatsapp size={24} />,
			href: 'https://wa.me/77002541195',
		},
		{
			name: 'Telegram',
			icon: <FaTelegramPlane size={24} />,
			href: 'https://t.me/hama_gamma',
		},
		{
			name: 'Instagram',
			icon: <FaInstagram size={24} />,
			href: 'https://instagram.com/hama_gamma',
		},
		{
			name: 'KakaoTalk',
			icon: <FaComment size={24} />,
			href: '#', // TODO: заменить на реальную ссылку/open.kakao.com/... когда будет
		},
		{
			name: 'WeChat',
			icon: <FaWeixin size={24} />,
			onClick: handleWeChatClick,
		},
	]

	return (
		// Mobile-first: без префикса — стили <640px, дальше слоями sm/md/lg/xl/2xl.
		// Структура grid/flex НЕ меняется — только отступы, паддинги, размеры шрифта.
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 border-t border-neutral-100 scroll-mt-24'
			id='contact'
		>
			<div className='text-center max-w-3xl 2xl:max-w-4xl mx-auto'>
				{/* Метка над заголовком */}
				<span className='font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.4em] text-[#d90416] mb-3 sm:mb-4 block font-bold'>
					 {t.sub}
				</span>

				<h2 className='font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase italic tracking-tighter mb-4 sm:mb-6'>
					{t.heading}
				</h2>

				{/* Форма — вместо публичной почты */}
				<ContactForm locale={locale} />

				{/* Сетка мессенджеров */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 2xl:gap-16'>
					{links.map((link, i) =>
						link.href ? (
							<a
								key={i}
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex flex-col items-center gap-3 sm:gap-4 transition-all'
							>
								<div className={ICON_CIRCLE_CLASS}>{link.icon}</div>
								<span className={ICON_LABEL_CLASS}>{link.name}</span>
							</a>
						) : (
							<button
								key={i}
								type='button'
								onClick={link.onClick}
								className='group flex flex-col items-center gap-3 sm:gap-4 transition-all cursor-pointer'
							>
								<div className={ICON_CIRCLE_CLASS}>{link.icon}</div>
								<span className={ICON_LABEL_CLASS}>{link.name}</span>
							</button>
						),
					)}
				</div>
			</div>
		</section>
	)
}
