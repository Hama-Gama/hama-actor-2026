'use client'

import React, { useState } from 'react'
import {
	FaInstagram,
	FaTelegramPlane,
	FaWhatsapp,
	FaComment,
	FaCopy,
	FaCheck,
} from 'react-icons/fa'

type ContactsProps = {
	locale?: string
}

export const Contacts = ({ locale }: ContactsProps) => {
	const [copied, setCopied] = useState(false)
	const email = 'ardager121@mail.ru'

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
		copyHint: isRu ? 'Копировать' : isEn ? 'Copy' : isKk ? 'Көшіру' : '복사',
		copiedLabel: isRu
			? 'Скопировано!'
			: isEn
				? 'Copied!'
				: isKk
					? 'Көшірілді!'
					: '복사됨!',
		official: isRu
			? 'Официальный Email'
			: isEn
				? 'Official Email'
				: isKk
					? 'Ресми Email'
					: '공식 이메일',
		footerCopy: 'hama-actor.com // 2026',
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy!', err)
		}
	}

	const links = [
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
		{ name: 'KakaoTalk', icon: <FaComment size={24} />, href: '#' },
	]

	return (
		<section
			className='container mx-auto px-4 py-8 border-t border-neutral-100'
			id='contact'
		>
			<div className='text-center max-w-3xl mx-auto'>
				{/* Метка над заголовком */}
				<span className='font-mono text-[10px] uppercase tracking-[0.4em] text-[#d90416] mb-4 block font-bold'>
					// {t.sub}
				</span>

				<h2 className='font-display text-3xl md:text-4xl font-bold uppercase italic tracking-tighter mb-6'>
					{t.heading}
				</h2>

				{/* Блок с Email и Копированием */}
				<div className='mb-8'>
					<span className='font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3 block'>
						{t.official}
					</span>
					<div className='inline-flex items-center gap-4 bg-neutral-50 px-6 py-4 rounded-sm border border-neutral-100 group transition-all hover:border-[#d90416] relative'>
						<a
							href={`mailto:${email}`}
							className='font-display text-2xl md:text-3xl font-bold lowercase tracking-tighter text-black'
						>
							{email}
						</a>

						<button
							onClick={handleCopy}
							className='flex items-center justify-center p-2 text-neutral-400 hover:text-[#d90416] transition-colors cursor-pointer border-l border-neutral-200 pl-4'
							title={t.copyHint}
						>
							{copied ? (
								<FaCheck className='text-green-500' size={18} />
							) : (
								<FaCopy size={18} />
							)}
						</button>

						{/* Всплывающая подсказка "Copied" */}
						{copied && (
							<span className='absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] bg-black text-white px-3 py-1 rounded uppercase tracking-widest animate-bounce'>
								{t.copiedLabel}
							</span>
						)}
					</div>
				</div>

				{/* Сетка мессенджеров */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
					{links.map((link, i) => (
						<a
							key={i}
							href={link.href}
							target='_blank'
							rel='noopener noreferrer'
							className='group flex flex-col items-center gap-4 transition-all'
						>
							<div className='w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300'>
								{link.icon}
							</div>
							<span className='font-mono text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity'>
								{link.name}
							</span>
						</a>
					))}
				</div>
			</div>
		</section>
	)
}
