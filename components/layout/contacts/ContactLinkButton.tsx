'use client'

import type { ContactLink } from '@/lib/contacts-config'
import { ICON_MAP, ICON_CIRCLE_CLASS, ICON_LABEL_CLASS } from './contact-icons'

type ContactLinkButtonProps = {
	link: ContactLink
	onCopy: (link: Extract<ContactLink, { kind: 'copy' }>) => void
	onOpenQr?: (link: Extract<ContactLink, { kind: 'qr' }>) => void
}

export function ContactLinkButton({
	link,
	onCopy,
	onOpenQr,
}: ContactLinkButtonProps) {
	const icon = ICON_MAP[link.iconId]

	// 1. Внешняя ссылка
	if (link.kind === 'link') {
		return (
			<a
				href={link.href}
				target='_blank'
				rel='noopener noreferrer'
				className='group flex flex-col items-center gap-3 sm:gap-4 transition-all'
			>
				<div className={ICON_CIRCLE_CLASS}>{icon}</div>
				<span className={ICON_LABEL_CLASS}>{link.name}</span>
			</a>
		)
	}

	// 2. Показ QR-кода
	if (link.kind === 'qr') {
		return (
			<button
				type='button'
				onClick={() => onOpenQr?.(link)}
				className='group flex flex-col items-center gap-3 sm:gap-4 transition-all cursor-pointer'
			>
				<div className={ICON_CIRCLE_CLASS}>{icon}</div>
				<span className={ICON_LABEL_CLASS}>{link.name}</span>
			</button>
		)
	}

	// 3. Копирование в буфер
	return (
		<button
			type='button'
			onClick={() => onCopy(link)}
			className='group flex flex-col items-center gap-3 sm:gap-4 transition-all cursor-pointer'
		>
			<div className={ICON_CIRCLE_CLASS}>{icon}</div>
			<span className={ICON_LABEL_CLASS}>{link.name}</span>
		</button>
	)
}
