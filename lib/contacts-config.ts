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
// Три вида записей:
//  - kind: 'link' → обычная ссылка, открывается в новой вкладке (href обязателен)
//  - kind: 'copy' → по клику текст копируется в буфер обмена (value обязателен)
//  - kind: 'qr'   → по клику открывается модалка с QR-кодом (как WeChat) —
//                    нужен И value (ID/ссылка для показа+копирования), И
//                    qrImage (путь к картинке QR в /public)
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
	| {
			id: string
			name: string
			iconId: IconId
			kind: 'qr'
			value: string
			qrImage: string
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
		href: 'https://wa.me/hama_gamma',
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
		href: 'https://open.kakao.com/o/s7KXzwKi',
	},
	{
		id: 'wechat',
		name: 'WeChat',
		iconId: 'wechat',
		kind: 'qr',
		value: 'wxid_zmfdnqr0qj5t22',
		qrImage: '/wechat-qr.jpg',
		copiedMessageKey: 'wechatIdCopied',
		failedMessageKey: 'wechatCopyFailed',
	},
]
