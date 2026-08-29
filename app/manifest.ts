import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Khamit Arkayev — Actor',
		short_name: 'Khamit Arkayev',
		description:
			'Official portfolio of Khamit Arkayev — Actor and Martial Artist',
		start_url: '/',
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon-192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/favicon-512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
