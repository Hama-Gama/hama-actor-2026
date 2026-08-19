// lib/about-config.ts
//
// Единственное место в проекте, где хранятся данные для блока "О себе":
// публичные контакты, параметры тела, размеры и список навыков с видео.
// Не трогай About.tsx, чтобы поменять цифру, ссылку или добавить/убрать
// навык — редактируй только этот файл.
//
// Переводы подписей (labels) остаются в About.tsx — они не отсюда, потому
// что это текст на 4 языках, ему логичнее жить рядом с остальными
// переводами секции. Здесь — только сами значения.

// ──────────────────────────────────────────────────────────────
// ПУБЛИЧНЫЕ КОНТАКТЫ
// ──────────────────────────────────────────────────────────────
// Показываются в блоке About и попадают в текст при копировании ("Скопировать
// данные"). Это НЕ та почта, что принимает заявки с формы (та — в .env,
// CONTACT_EMAIL, см. app/api/contact/route.ts) — это публичный контакт,
// который и так виден на сайте, поэтому ему нормально быть в коде.
export const ACTOR_NAME = 'Khamit Arkayev (Hama)'

export const ACTOR_CONTACT = {
	whatsapp: '+7 707 891 91 81',
	email: 'ardager121@mail.ru',
	website: 'hama-actor.com',
}

// ──────────────────────────────────────────────────────────────
// ПАРАМЕТРЫ ТЕЛА (Height / Weight и т.д.)
// ──────────────────────────────────────────────────────────────
// metric — показывается всегда. imperial — добавляется только для en-версии
// (так было в оригинале: `5'10" / 177 cm` для en, просто `177 cm` для остальных).
// Если хочешь показывать imperial для всех языков — это уже правки в
// About.tsx (одна строчка), не в этом файле.
export const BODY_MEASUREMENTS = {
	height: { metric: '177 cm', imperial: `5'10"` },
	weight: { metric: '64–65 kg', imperial: '141 lbs' },
} as const

// ──────────────────────────────────────────────────────────────
// РАЗМЕРЫ (Sizes & Measurements)
// ──────────────────────────────────────────────────────────────
export const CLOTHING_MEASUREMENTS = {
	chest: { metric: '92 cm', imperial: `36.2"` },
	waist: { metric: '80 cm', imperial: `31.5"` },
	hips: { metric: '91 cm', imperial: `35.8"` },
	shoulders: { metric: '40 cm', imperial: `15.7"` },
	sleeveShoulder: { metric: '60 cm', imperial: `23.6"` },
	sleeveNeck: { metric: '75 cm', imperial: `29.5"` },
	inseam: { metric: '78 cm', imperial: `30.7"` },
	neck: { metric: '42 cm', imperial: `16.5"` },
	reach: { metric: '181 cm', imperial: `71.2"` },
} as const

// Размеры, которые НЕ переводятся в imperial/metric — уже готовая строка,
// одинаковая для всех языков (EU/US сетки, готовый формат и т.п.)
export const FIXED_SIZES = {
	hat: '67 cm',
	glove: 'L / 9 (22 cm)',
	jacket: 'EU 46 / US 36R',
	shoe: 'EU 42 / US 9 (270 mm)',
} as const

// ──────────────────────────────────────────────────────────────
// НАВЫКИ
// ──────────────────────────────────────────────────────────────
// iconId — берётся из ICON_MAP в About.tsx (сопоставлены иконки lucide-react).
// Добавляешь навык с новой иконкой — один раз добавь её в ICON_MAP, дальше
// просто ссылаешься на iconId здесь.
//
// videoUrl — прямая ссылка на mp4/webm (до 30 сек), файл должен лежать в
// public/videos/. Оставь undefined, если видео нет — кнопка "play" не
// покажется.
//
// Чтобы УДАЛИТЬ навык — удали объект из массива.
// Чтобы ДОБАВИТЬ — добавь объект по образцу.

export type SkillIconId =
	| 'taekwondo'
	| 'boxing'
	| 'mma'
	| 'weapon'
	| 'cardistry'
	| 'skydiving'
	| 'motorcycling'

export const SKILLS: {
	id: string
	iconId: SkillIconId
	videoUrl?: string
	name: { en: string; ru: string; kk: string; ko: string }
}[] = [
	{
		id: 'taekwondo',
		iconId: 'taekwondo',
		videoUrl: '/videos/taekwondo.mp4',
		name: { en: 'Taekwondo', ru: 'Таэквондо', kk: 'Таэквондо', ko: '태권도' },
	},
	{
		id: 'boxing',
		iconId: 'boxing',
		videoUrl: '/videos/boxing.mp4',
		name: { en: 'Boxing', ru: 'Бокс', kk: 'Бокс', ko: '복싱' },
	},
	{
		id: 'mma',
		iconId: 'mma',
		videoUrl: '/videos/mma.mp4',
		name: { en: 'MMA', ru: 'ММА', kk: 'ММА', ko: 'MMA' },
	},
	{
		id: 'weapon',
		iconId: 'weapon',
		videoUrl: '/videos/weapon-handling.mp4',
		name: {
			en: 'Weapon Handling',
			ru: 'Оружие',
			kk: 'Қару қолдану',
			ko: '무기 취급',
		},
	},
	{
		id: 'cardistry',
		iconId: 'cardistry',
		videoUrl: '/videos/cardistry.mp4',
		name: {
			en: 'Cardistry',
			ru: 'Кардистри',
			kk: 'Кардистри',
			ko: '카디스트리',
		},
	},
	{
		id: 'skydiving',
		iconId: 'skydiving',
		videoUrl: '/videos/skydiving.mp4',
		name: {
			en: 'Skydiving',
			ru: 'Парашют',
			kk: 'Парашютпен секіру',
			ko: '스카이다이빙',
		},
	},
	{
		id: 'motorcycling',
		iconId: 'motorcycling',
		videoUrl: '/videos/motorcycling.mp4',
		name: {
			en: 'Motorcycling',
			ru: 'Мотоцикл',
			kk: 'Мотоцикл айдау',
			ko: '모터사이클',
		},
	},
]
