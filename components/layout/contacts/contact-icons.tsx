import React from 'react'
import {
	FaInstagram,
	FaTelegramPlane,
	FaWhatsapp,
	FaWeixin,
	FaComment,
} from 'react-icons/fa'
import type { IconId } from '@/lib/contacts-config'

// Сопоставление iconId (из contacts-config.ts) → React-компонент иконки.
// Добавляешь новый мессенджер с новой иконкой — один раз добавь её сюда,
// дальше в contacts-config.ts просто ссылаешься на iconId.
export const ICON_MAP: Record<IconId, React.ReactNode> = {
	whatsapp: <FaWhatsapp size={24} />,
	telegram: <FaTelegramPlane size={24} />,
	instagram: <FaInstagram size={24} />,
	kakaotalk: <FaComment size={24} />,
	wechat: <FaWeixin size={24} />,
}

// Единый стиль иконки-кружка для всех контактов — меняешь один раз здесь,
// применяется одинаково и к <a>, и к <button>.
// Mobile-first: размер круга растёт от мобильного к ultra-wide (w-14 → w-24).
export const ICON_CIRCLE_CLASS =
	'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 2xl:w-24 2xl:h-24 flex items-center justify-center rounded-full border border-neutral-600 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300'

export const ICON_LABEL_CLASS =
	'font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity'
