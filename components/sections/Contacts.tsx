'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { LuCopy, LuX, LuCheck } from 'react-icons/lu'
import { ContactForm } from './ContactForm'
import { ContactLinkButton } from '../layout/contacts/ContactLinkButton'
import { CONTACT_LINKS, type ContactLink } from '@/lib/contacts-config'

type ContactsProps = {
	locale?: string
}

export const Contacts = ({ locale }: ContactsProps) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'

	// Состояние для выбранного контакту с QR-кодом (например, WeChat)
	const [activeQrLink, setActiveQrLink] = useState<Extract<
		ContactLink,
		{ kind: 'qr' }
	> | null>(null)
	const [copied, setCopied] = useState(false)

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
		directDivider: isRu
			? 'Или напишите напрямую'
			: isEn
				? 'Or reach out directly'
				: isKk
					? 'Немесе тікелей жазыңыз'
					: '또는 직접 연락하기',
		scanQr: isRu
			? 'Отсканируйте QR-код в WeChat'
			: isEn
				? 'Scan QR code in WeChat'
				: isKk
					? 'WeChat-та QR-кодты сканерлеңіз'
					: 'WeChat에서 QR 코드를 스캔하세요',
		copy: isRu ? 'Скопировать' : isEn ? 'Copy' : isKk ? 'Көшіру' : '복사',
		copied: isRu
			? 'Скопировано!'
			: isEn
				? 'Copied!'
				: isKk
					? 'Көшірілді!'
					: '복사됨!',
	}

	const toastMessages: Record<'wechatIdCopied' | 'wechatCopyFailed', string> = {
		wechatIdCopied: t.wechatIdCopied,
		wechatCopyFailed: t.wechatCopyFailed,
	}

	const handleCopy = async (link: Extract<ContactLink, { kind: 'copy' }>) => {
		try {
			await navigator.clipboard.writeText(link.value)
			toast.success(`${toastMessages[link.copiedMessageKey]}: ${link.value}`)
		} catch (err) {
			console.error('Failed to copy contact value', err)
			toast.error(toastMessages[link.failedMessageKey])
		}
	}

	const handleModalCopy = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value)
			setCopied(true)
			toast.success(`${t.wechatIdCopied}: ${value}`)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy modal value', err)
			toast.error(t.wechatCopyFailed)
		}
	}

	return (
		<section
			className='container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12 border-t border-neutral-100 scroll-mt-24'
			id='contact'
		>
			<div className='text-center max-w-3xl 2xl:max-w-4xl mx-auto'>
				<span className='font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.4em] text-[#d90416] mb-3 sm:mb-4 block font-bold'>
					 {t.sub}
				</span>

				<h2 className='font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase italic tracking-tighter mb-4 sm:mb-6'>
					{t.heading}
				</h2>

				<ContactForm locale={locale} />

				<div className='flex items-center gap-4 mb-6 sm:mb-8'>
					<span className='flex-1 h-px bg-neutral-100' />
					<span className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.3em] text-neutral-400 whitespace-nowrap'>
						{t.directDivider}
					</span>
					<span className='flex-1 h-px bg-neutral-100' />
				</div>

				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 2xl:gap-16'>
					{CONTACT_LINKS.map(link => (
						<ContactLinkButton
							key={link.id}
							link={link}
							onCopy={handleCopy}
							onOpenQr={qrLink => setActiveQrLink(qrLink)}
						/>
					))}
				</div>
			</div>

			{/* Модальное окно с QR-кодом и ID */}
			{activeQrLink && (
				<div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'>
					<div
						className='absolute inset-0'
						onClick={() => setActiveQrLink(null)}
					/>

					<div className='relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl z-10 border border-neutral-100 flex flex-col items-center text-center'>
						<button
							type='button'
							onClick={() => setActiveQrLink(null)}
							className='absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black transition rounded-full hover:bg-neutral-100'
						>
							<LuX size={20} />
						</button>

						<h3 className='font-mono text-sm uppercase font-bold tracking-wider mb-4 text-black'>
							{activeQrLink.name}
						</h3>

						{/* Картинка QR-кода */}
						<div className='relative w-48 h-48 sm:w-56 sm:h-56 p-2 bg-white border border-neutral-200 rounded-xl shadow-sm mb-3'>
							<Image
								src={activeQrLink.qrImage}
								alt={`${activeQrLink.name} QR Code`}
								fill
								className='object-contain p-2'
							/>
						</div>

						<p className='font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-6'>
							{t.scanQr}
						</p>

						{/* Поле с ID и кнопка скопировать */}
						<div className='w-full flex items-center gap-2 p-1.5 pl-3 bg-neutral-50 border border-neutral-200 rounded-lg'>
							<span className='font-mono text-xs text-neutral-600 truncate flex-1 text-left font-bold'>
								ID: {activeQrLink.value}
							</span>
							<button
								type='button'
								onClick={() => handleModalCopy(activeQrLink.value)}
								className='flex items-center gap-1.5 bg-black hover:bg-[#d90416] text-white font-mono text-xs uppercase font-bold px-3 py-2 rounded-md transition-colors shrink-0'
							>
								{copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
								<span>{copied ? t.copied : t.copy}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
