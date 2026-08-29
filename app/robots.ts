import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hama-actor.com'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			// /api уже скрыт от индексации через proxy-матчер, но явный
			// disallow не лишний — часть ботов не смотрит на matcher/robots meta
			disallow: ['/api'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	}
}
