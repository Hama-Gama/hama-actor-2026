export interface GalleryPhoto {
	src: string
	width: number
	height: number
	alt: string
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
	{
		src: '/gallery/11.webp',
		width: 800,
		height: 1200,
		alt: 'Khamit Arkayev Headshot',
	},
	{
		src: '/gallery/22.webp',
		width: 1200,
		height: 800,
		alt: 'Action Scene',
	},
	{
		src: '/gallery/33.webp',
		width: 1000,
		height: 1500,
		alt: 'Dramatic Look',
	},
	{
		src: '/gallery/44.webp',
		width: 1200,
		height: 800,
		alt: 'Stunt Performance',
	},
	{
		src: '/gallery/55.webp',
		width: 1200,
		height: 800,
		alt: 'Stunt Performance',
	},
]
