import type { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/lib/locales'

// Меняй на реальный прод-домен через .env — здесь только фолбэк на случай,
// если переменная не подхватилась при билде.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hama-actor.com'

// Сайт одностраничный (single page per locale — Hero/About/ShowReel/
// PhotoGallery/Contacts на одном /[lang]/page.tsx), поэтому sitemap
// перечисляет 4 языковые версии одной и той же страницы, а не разные роуты.
// Если появятся под-страницы — добавляй сюда ещё один map().
export default function sitemap(): MetadataRoute.Sitemap {
	const languages: Record<string, string> = {}
	for (const locale of SUPPORTED_LOCALES) {
		languages[locale] =
			locale === DEFAULT_LOCALE ? baseUrl : `${baseUrl}/${locale}`
	}
	languages['x-default'] = baseUrl

	return SUPPORTED_LOCALES.map(locale => ({
		url: locale === DEFAULT_LOCALE ? baseUrl : `${baseUrl}/${locale}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		// en — канонiчный дефолт, чуть выше приоритет
		priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
		alternates: { languages },
	}))
}
