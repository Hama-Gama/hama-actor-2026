// lib/filmography.config.ts
//
// ─── ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО РЕДАКТИРОВАТЬ ────────────────────
// Здесь и только здесь хранятся все данные фильмографии: тексты на
// 4 языках (ru/en/kk/ko), постеры, режим "Coming soon" и т.д.
// Компонент Filmography.tsx просто рендерит то, что здесь описано,
// и трогать его не нужно.
//
// ЧТО ДЕЛАТЬ, КОГДА МАТЕРИАЛЫ ГОТОВЫ:
//   1. Заполни массив CREDITS ниже — по одному объекту Credit на проект
//      (шаблон и примеры полей — сразу под этим комментарием).
//   2. Положи файлы постеров в /public/posters/ (или другую папку внутри
//      /public) и укажи путь в поле posterUrl, например:
//      posterUrl: 'posters/moy-film.jpeg'
//      Если постера ещё нет — просто не указывай posterUrl, вместо него
//      покажется иконка-плейсхолдер (как сейчас).
//   3. Поставь PLACEHOLDER_MODE = false — секция сразу переключится с
//      заглушек "Coming soon" на реальные карточки.
//
// Пока PLACEHOLDER_MODE = true, CREDITS можно заполнять постепенно —
// на сайте всё равно будут показываться только пустые карточки-заглушки
// (их количество задаётся PLACEHOLDER_COUNT, не связано с длиной CREDITS).

export type CreditType = 'feature' | 'short' | 'reel'

export type LocalizedText = {
	ru: string
	en: string
	kk: string
	ko: string
}

export type Credit = {
	// Название проекта на 4 языках
	project: LocalizedText
	// Роль на площадке ("Массовка", "Актёр" и т.п.) на 4 языках
	role: LocalizedText
	// Год — просто строка ("2026"), без локализации
	year: string
	// Тип проекта — влияет на бейдж (см. TYPE_LABEL ниже)
	type: CreditType
	// Страна/город/студия съёмок на 4 языках
	location: LocalizedText
	// Необязательная доп. строка под локацией (режиссёр, актёрский состав
	// и т.п.) — на 4 языках. Если не нужна, просто не указывай поле.
	note?: LocalizedText
	// Путь к постеру относительно /public, например 'posters/film.jpeg'.
	// Если постера нет — не указывай поле, покажется плейсхолдер-иконка.
	// TODO: сейчас один постер на карточку на все языки. Когда появятся
	// постеры на 4 языках — превратим в { ru, en, kk, ko } как остальные
	// локализованные поля.
	posterUrl?: string
}

// ─── РЕЖИМ "COMING SOON" ────────────────────────────────────────────────
// true  → на сайте показываются пустые карточки-заглушки с текстом
//         "Coming soon" (CREDITS не используется, редактировать его
//         можно заранее — ничего не сломается и не покажется раньше
//         времени).
// false → на сайте показываются реальные карточки из CREDITS.
export const PLACEHOLDER_MODE = true

// Сколько пустых карточек-заглушек показывать, пока PLACEHOLDER_MODE = true.
export const PLACEHOLDER_COUNT = 4

// ─── Текст заглушки "Coming soon" на 4 языках ───────────────────────────
export const COMING_SOON_TEXT: LocalizedText = {
	ru: 'Скоро',
	en: 'Coming soon',
	kk: 'Жақында',
	ko: '곧 공개',
}

// ─── Подписи типов проекта (бейдж на карточке) ──────────────────────────
export const TYPE_LABEL: Record<CreditType, LocalizedText> = {
	feature: {
		ru: 'Худ. фильм',
		en: 'Feature Film',
		kk: 'Көркем фильм',
		ko: '장편 영화',
	},
	short: {
		ru: 'Короткий метр',
		en: 'Short Film',
		kk: 'Қысқа метраж',
		ko: '단편 영화',
	},
	reel: { ru: 'Ролик', en: 'Reel', kk: 'Ролик', ko: '릴' },
}

// ─── Сами карточки фильмографии ──────────────────────────────────────────
// Используются только когда PLACEHOLDER_MODE = false (см. выше).
// TODO: названия на kk/ko — рабочий перевод, сверь с официальным прокатным
// названием проекта, если оно отличается.
export const CREDITS: Credit[] = [
	{
		project: {
			ru: 'Принц Азии',
			en: 'Prince of Asia',
			kk: 'Азия ханзадасы',
			ko: '아시아의 왕자',
		},
		role: {
			ru: 'Массовка',
			en: 'Background / Extra',
			kk: 'Массовка',
			ko: '엑스트라',
		},
		year: '2026',
		type: 'feature',
		location: {
			ru: 'Южная Корея – Казахстан · съёмки в Алматы',
			en: 'South Korea – Kazakhstan · shot in Almaty',
			kk: 'Оңтүстік Корея – Қазақстан · Алматыда түсірілген',
			ko: '한국 – 카자흐스탄 · 알마티 촬영',
		},
		posterUrl: 'posters/armour-of-god4.jpeg',
	},
	{
		project: {
			ru: 'Доспехи бога: Ультиматум',
			en: 'Armour of God IV: Ultimatum',
			kk: 'Құдай сауыты IV: Ультиматум',
			ko: '용형호제 4: 최후통첩',
		},
		role: {
			ru: 'Массовка',
			en: 'Background / Extra',
			kk: 'Массовка',
			ko: '엑스트라',
		},
		year: '2026',
		type: 'feature',
		location: {
			ru: 'Китай – Казахстан · съёмки в Актау',
			en: 'China – Kazakhstan · shot in Aktau',
			kk: 'Қытай – Қазақстан · Ақтауда түсірілген',
			ko: '중국 – 카자흐스탄 · 악타우 촬영',
		},
		note: {
			ru: 'Реж. Роберт Кун. В ролях: Джеки Чан, Кевин Риджер, Ханьчжи Сян',
			en: 'Dir. Robert Kun. With Jackie Chan, Kevin Ridger, Hanzhi Xiang',
			kk: 'Реж. Роберт Кун. Рөлдерде: Джеки Чан, Кевин Риджер, Ханьчжи Сян',
			ko: '감독: 로버트 쿤. 출연: 재키 찬, 케빈 리저, 한즈 샹',
		},
		posterUrl: 'posters/armour-of-god4.jpeg',
	},
	{
		project: {
			ru: 'Короткометражные фильмы',
			en: 'Short Films',
			kk: 'Қысқа метражды фильмдер',
			ko: '단편 영화',
		},
		role: {
			ru: 'Актёр',
			en: 'Actor',
			kk: 'Актёр',
			ko: '배우',
		},
		year: '2017',
		type: 'short',
		location: {
			ru: 'Независимый проект',
			en: 'Independent',
			kk: 'Тәуелсіз жоба',
			ko: '독립 프로젝트',
		},
		note: {
			ru: 'Любительский проект, для себя',
			en: 'Amateur / hobby project',
			kk: 'Әуесқой жоба, өзі үшін',
			ko: '아마추어 / 개인 취미 프로젝트',
		},
		posterUrl: 'posters/armour-of-god4.jpeg',
	},
	{
		project: {
			ru: 'Боевые рилсы',
			en: 'Action Reels',
			kk: 'Жекпе-жек рилстері',
			ko: '액션 릴',
		},
		role: {
			ru: 'Исполнитель',
			en: 'Performer',
			kk: 'Орындаушы',
			ko: '퍼포머',
		},
		year: '2022',
		type: 'reel',
		location: {
			ru: 'Независимый проект',
			en: 'Independent',
			kk: 'Тәуелсіз жоба',
			ko: '독립 프로젝트',
		},
		note: {
			ru: 'Любительский проект — боевая хореография',
			en: 'Amateur / hobby project — martial arts & fight choreography',
			kk: 'Әуесқой жоба — жекпе-жек хореографиясы',
			ko: '아마추어 프로젝트 — 무술 및 액션 안무',
		},
		posterUrl: 'posters/armour-of-god4.jpeg',
	},
]
