import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Footer from '@/components/layout/Footer'
import { ShowReel } from '@/components/sections/ShowReel'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { About } from '@/components/sections/About'
import { Contacts } from '@/components/sections/Contacts'
import { Filmography } from '@/components/sections/Filmography'

export default async function HomePage({
	params,
}: {
	params: Promise<{ lang: string }>
}) {
	const { lang } = await params

	return (
		<main>
			<Header />
			<Hero lang={lang} />
			<ShowReel locale={lang} />
			<PhotoGallery locale={lang} />
			<Filmography locale={lang} />
			<About locale={lang} />
			<Contacts locale={lang} />
			{/* Остальные секции будут тут */}
			<Footer lang={lang} />
		</main>
	)
}
