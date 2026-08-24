import Image from 'next/image'
import { Download, PlayCircle, FileText } from 'lucide-react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { ACTOR_VCARD } from '@/lib/vcard-config'

const SHOWREEL_URL = 'https://vimeo.com/hama_gamma/showreel'
const PORTFOLIO_PDF_URL = '/portfolio.pdf'
const TELEGRAM_URL = 'https://t.me/hama_gamma'
const WHATSAPP_URL = 'https://wa.me/77002541195'

export default function CardPage() {
	return (
		<main className='min-h-dvh flex flex-col items-center justify-center px-6 py-12 text-center bg-white text-black'>
			{/* Аватар с next/image */}
			<div className='relative w-28 h-28 rounded-full overflow-hidden border border-neutral-200 mb-5'>
				<Image
					src='/photo.jpg'
					alt={`${ACTOR_VCARD.firstName} ${ACTOR_VCARD.lastName}`}
					fill
					sizes='112px'
					className='object-cover'
					priority
				/>
			</div>

			<h1 className='font-display text-2xl font-bold uppercase italic tracking-tighter'>
				{ACTOR_VCARD.firstName} {ACTOR_VCARD.lastName}
			</h1>
			<p className='font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 mb-8'>
				{ACTOR_VCARD.title}
			</p>

			<div className='w-full max-w-xs flex flex-col gap-3'>
				{/* Добавлен атрибут download для скачивания контакта */}
				<a
					href='/api/vcard'
					download
					className='flex items-center justify-center gap-2 bg-black text-white font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:bg-[#d90416] transition-colors'
				>
					<Download size={16} />
					Save to Contacts
				</a>

				<a
					href={SHOWREEL_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
				>
					<PlayCircle size={16} />
					Showreel
				</a>

				<a
					href={PORTFOLIO_PDF_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
				>
					<FileText size={16} />
					Portfolio (PDF)
				</a>

				<div className='flex gap-3'>
					<a
						href={TELEGRAM_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex-1 flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<FaTelegramPlane size={16} />
						Telegram
					</a>
					<a
						href={WHATSAPP_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex-1 flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<FaWhatsapp size={16} />
						WhatsApp
					</a>
				</div>
			</div>
		</main>
	)
}
