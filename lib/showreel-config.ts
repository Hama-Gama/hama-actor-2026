export interface ReelConfig {
	id: string
	thumb: string
	url: string
}

export const SHOWREEL_LINKS = {
	driveUrl:
		'https://drive.google.com/drive/folders/1vFiCIkv9dQ1EDjQlkZpD7NOSSRaNbiy6?usp=sharing',
	vimeoUrl: 'https://player.vimeo.com/video/222087977?h=f80f6ce383',
} as const

export const WARM_UP_ORIGINS = [
	'https://player.vimeo.com',
	'https://f.vimeocdn.com',
	'https://i.vimeocdn.com',
] as const

export const SHOWREELS: ReelConfig[] = [
	{
		id: 'main',
		thumb: '/thumbnails/1.webp',
		url: SHOWREEL_LINKS.vimeoUrl,
	},
	{
		id: 'drama',
		thumb: '/thumbnails/2.webp',
		url: SHOWREEL_LINKS.vimeoUrl,
	},
	{
		id: 'action',
		thumb: '/thumbnails/3.webp',
		url: SHOWREEL_LINKS.vimeoUrl,
	},
	{
		id: 'selftape',
		thumb: '/thumbnails/4.webp',
		url: SHOWREEL_LINKS.vimeoUrl,
	},
]

export const SHOWREEL_TRANSLATIONS = {
	en: {
		heading: 'Showreels',
		close: 'Close',
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
		reels: {
			main: { title: '메인 쇼릴', category: '전체 포트폴리오' },
			drama: { title: '드라마 쇼릴', category: '연기 / 대사' },
			action: { title: '액션 쇼릴', category: '무술 / 스턴트' },
			selftape: { title: '셀프테이프', category: '자기소개' },
		},
	},
} as const
