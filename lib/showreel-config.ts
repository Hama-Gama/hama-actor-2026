import type { Locale } from './locales'

export interface ReelConfig {
	id: string
	thumb: string
	// Ссылка на плеер отдельно для каждого языка — например, английская
	// озвучка/монтаж шоурила может отличаться от русской. null = видео для
	// этого языка ещё не готово → в UI покажется заглушка "Coming soon".
	urls: Record<Locale, string | null>
}

export const SHOWREEL_LINKS = {
	driveUrl:
		'https://drive.google.com/drive/folders/1R3WCvgBYKfYAH5mSFYj0iIuGB6hW2z1X?usp=sharing',
} as const

export const WARM_UP_ORIGINS = [
	'https://player.vimeo.com',
	'https://f.vimeocdn.com',
	'https://i.vimeocdn.com',
] as const

// Единственное готовое видео на сейчас — экшен-шоурил. Ссылка одна и та же
// на все 4 языка (временно, как дубликат) — поменяешь на настоящие
// локализованные ссылки, когда они появятся, прямо в объекте ниже.
const ACTION_REEL_URL = 'https://player.vimeo.com/video/1194927304'

export const SHOWREELS: ReelConfig[] = [
	{
		id: 'main',
		thumb: '/thumbnails/1.webp',
		urls: { en: null, ru: null, kk: null, ko: null },
	},
	{
		id: 'drama',
		thumb: '/thumbnails/2.webp',
		urls: { en: null, ru: null, kk: null, ko: null },
	},
	{
		id: 'action',
		thumb: '/thumbnails/3.webp',
		urls: {
			en: ACTION_REEL_URL,
			ru: ACTION_REEL_URL,
			kk: ACTION_REEL_URL,
			ko: ACTION_REEL_URL,
		},
	},
	{
		id: 'selftape',
		thumb: '/thumbnails/4.jpg',
		urls: { en: null, ru: null, kk: null, ko: null },
	},
]

export const SHOWREEL_TRANSLATIONS = {
	en: {
		heading: 'Showreels',
		close: 'Close',
		comingSoon: 'Coming soon',
		reels: {
			main: { title: 'Main Showreel', category: 'General Portfolio' },
			drama: { title: 'Drama Showreel', category: 'Acting / Dialogue' },
			action: { title: 'Action Showreel', category: 'Martial Arts / Stunts' },
			selftape: { title: 'Self-Tape / Slate', category: 'Introduction' },
		},
	},
	ru: {
		heading: 'Шоурилы',
		close: 'Закрыть',
		comingSoon: 'Скоро',
		reels: {
			main: { title: 'Основной шоурил', category: 'Общее портфолио' },
			drama: { title: 'Драматический шоурил', category: 'Актёрская игра' },
			action: { title: 'Экшен шоурил', category: 'Боевые искусства' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Представление' },
		},
	},
	kk: {
		heading: 'Шоурилдер',
		close: 'Жабу',
		comingSoon: 'Жақында',
		reels: {
			main: { title: 'Негізгі шоурил', category: 'Жалпы портфолио' },
			drama: { title: 'Драмалық шоурил', category: 'Актёрлік шеберлік' },
			action: { title: 'Экшен шоурил', category: 'Жекпе-жек өнері' },
			selftape: { title: 'Визитка / Селф-тейп', category: 'Таныстыру' },
		},
	},
	ko: {
		heading: '쇼릴',
		close: '닫기',
		comingSoon: '준비 중',
		reels: {
			main: { title: '메인 쇼릴', category: '전체 포트폴리오' },
			drama: { title: '드라마 쇼릴', category: '연기 / 대사' },
			action: { title: '액션 쇼릴', category: '무술 / 스턴트' },
			selftape: { title: '셀프테이프', category: '자기소개' },
		},
	},
} as const
