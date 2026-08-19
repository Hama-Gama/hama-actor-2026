// lib/contacts-config.ts
//
// Единственное место в проекте, где хранится список мессенджеров в блоке
// "Контакты". Почта для заявок теперь живёт в .env (переменная
// CONTACT_EMAIL) — см. .env.local.example и app/api/contact/route.ts.
// Не трогай ContactForm.tsx или Contacts.tsx, чтобы добавить/убрать
// мессенджер — редактируй только этот файл.

// ──────────────────────────────────────────────────────────────
// МЕССЕНДЖЕРЫ / СОЦСЕТИ
// ──────────────────────────────────────────────────────────────
// Каждая запись — это один кружок в сетке на секции "Контакты".
//
// Два вида записей:
//  - kind: 'link'  → обычная ссылка, открывается в новой вкладке (href обязателен)
//  - kind: 'copy'  → как WeChat: по клику текст копируется в буфер обмена
//                     (value обязателен, href не нужен)
//
// iconId — берётся из ICON_MAP в Contacts.tsx (там сопоставлены иконки).
// Если добавляешь мессенджер, для которого ещё нет иконки в ICON_MAP —
// сначала добавь её туда (один раз), дальше просто переиспользуешь iconId.
//
// Чтобы УДАЛИТЬ мессенджер — удали его объект из массива.
// Чтобы ДОБАВИТЬ новый — добавь объект по тому же образцу.
// Порядок в массиве = порядок отображения на сайте.

export type ContactLink =
	| {
			id: string
			name: string
			iconId: IconId
			kind: 'link'
			href: string
	  }
	| {
			id: string
			name: string
			iconId: IconId
			kind: 'copy'
			value: string
			// Ключи переводов для тостов при копировании (см. Contacts.tsx → t.*)
			copiedMessageKey: 'wechatIdCopied'
			failedMessageKey: 'wechatCopyFailed'
	  }

// Список доступных иконок — соответствует ключам в ICON_MAP (Contacts.tsx)
export type IconId =
	| 'whatsapp'
	| 'telegram'
	| 'instagram'
	| 'kakaotalk'
	| 'wechat'

export const CONTACT_LINKS: ContactLink[] = [
	{
		id: 'whatsapp',
		name: 'WhatsApp',
		iconId: 'whatsapp',
		kind: 'link',
		href: 'https://wa.me/77002541195',
	},
	{
		id: 'telegram',
		name: 'Telegram',
		iconId: 'telegram',
		kind: 'link',
		href: 'https://t.me/hama_gamma',
	},
	{
		id: 'instagram',
		name: 'Instagram',
		iconId: 'instagram',
		kind: 'link',
		href: 'https://instagram.com/hama_gamma',
	},
	{
		id: 'kakaotalk',
		name: 'KakaoTalk',
		iconId: 'kakaotalk',
		kind: 'link',
		href: '#', // TODO: заменить на реальную ссылку/open.kakao.com/... когда будет
	},
	{
		id: 'wechat',
		name: 'WeChat',
		iconId: 'wechat',
		kind: 'copy',
		value: 'hama_arkayev', // TODO: замени на реальный WeChat ID
		copiedMessageKey: 'wechatIdCopied',
		failedMessageKey: 'wechatCopyFailed',
	},
]
