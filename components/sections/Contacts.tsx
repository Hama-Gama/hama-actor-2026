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
import { CONTACT_LINKS, type IconId } from '@/lib/contacts-config'

type ContactsProps = {
	locale?: string
}

// Сопоставление iconId (из конфига) → React-компонент иконки.
// Добавляешь новый мессенджер с новой иконкой — один раз добавь её сюда,
// дальше в contacts-config.ts просто ссылаешься на iconId.
const ICON_MAP: Record<IconId, React.ReactNode> = {
	whatsapp: <FaWhatsapp size={24} />,
	telegram: <FaTelegramPlane size={24} />,
	instagram: <FaInstagram size={24} />,
	kakaotalk: <FaComment size={24} />,
	wechat: <FaWeixin size={24} />,
}

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
		directDivider: isRu
			? 'Или напишите напрямую'
			: isEn
				? 'Or reach out directly'
				: isKk
					? 'Немесе тікелей жазыңыз'
					: '또는 직접 연락하기',
	}

	// Ключи 'wechatIdCopied' / 'wechatCopyFailed' в contacts-config.ts
	// ссылаются на записи этого объекта — так тосты остаются переводимыми,
	// а сам текст живёт тут, рядом с остальными переводами секции.
	const toastMessages: Record<'wechatIdCopied' | 'wechatCopyFailed', string> = {
		wechatIdCopied: t.wechatIdCopied,
		wechatCopyFailed: t.wechatCopyFailed,
	}

	const handleCopyClick = async (
		value: string,
		messageKeys: {
			copiedMessageKey: 'wechatIdCopied'
			failedMessageKey: 'wechatCopyFailed'
		},
	) => {
		try {
			await navigator.clipboard.writeText(value)
			toast.success(`${toastMessages[messageKeys.copiedMessageKey]}: ${value}`)
		} catch (err) {
			console.error('Failed to copy contact value', err)
			toast.error(toastMessages[messageKeys.failedMessageKey])
		}
	}

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
					// {t.sub}
				</span>

				<h2 className='font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold uppercase italic tracking-tighter mb-4 sm:mb-6'>
					{t.heading}
				</h2>

				{/* Форма — вместо публичной почты */}
				<ContactForm locale={locale} />

				{/* Разделитель "быстрый путь" vs "формальная заявка" — чтобы было
				    видно с первого взгляда, что это два разных способа связаться,
				    а не одна форма плюс список иконок под ней "просто так". */}
				<div className='flex items-center gap-4 mb-6 sm:mb-8'>
					<span className='flex-1 h-px bg-neutral-100' />
					<span className='font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.3em] text-neutral-400 whitespace-nowrap'>
						{t.directDivider}
					</span>
					<span className='flex-1 h-px bg-neutral-100' />
				</div>

				{/* Сетка мессенджеров — рендерится из lib/contacts-config.ts.
				    Чтобы добавить/убрать мессенджер, редактируй CONTACT_LINKS
				    там, а не этот файл. */}
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 2xl:gap-16'>
					{CONTACT_LINKS.map(link =>
						link.kind === 'link' ? (
							<a
								key={link.id}
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex flex-col items-center gap-3 sm:gap-4 transition-all'
							>
								<div className={ICON_CIRCLE_CLASS}>{ICON_MAP[link.iconId]}</div>
								<span className={ICON_LABEL_CLASS}>{link.name}</span>
							</a>
						) : (
							<button
								key={link.id}
								type='button'
								onClick={() =>
									handleCopyClick(link.value, {
										copiedMessageKey: link.copiedMessageKey,
										failedMessageKey: link.failedMessageKey,
									})
								}
								className='group flex flex-col items-center gap-3 sm:gap-4 transition-all cursor-pointer'
							>
								<div className={ICON_CIRCLE_CLASS}>{ICON_MAP[link.iconId]}</div>
								<span className={ICON_LABEL_CLASS}>{link.name}</span>
							</button>
						),
					)}
				</div>
			</div>
		</section>
	)
}
