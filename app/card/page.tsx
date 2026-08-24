import Image from 'next/image'
import Link from 'next/link'
import { Download, PlayCircle, FileText, Globe } from 'lucide-react'
import { FaTelegramPlane, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { SiKakaotalk } from 'react-icons/si'
import { ACTOR_VCARD } from '@/lib/vcard-config'

const WEBSITE_URL = '/'
const SHOWREEL_URL = 'https://vimeo.com/hama_gamma/showreel'
const PORTFOLIO_PDF_URL = '/portfolio.pdf'
const TELEGRAM_URL = 'https://t.me/hama_gamma'
const WHATSAPP_URL = 'https://wa.me/77002541195'
const INSTAGRAM_URL = 'https://instagram.com/hama_gamma'
const KAKAOTALK_URL = 'https://open.kakao.com/o/...'

export default function CardPage() {
	return (
		<main className='min-h-dvh flex flex-col items-center justify-center px-6 py-12 text-center bg-white text-black'>
			{/* Аватар шириной с кнопки (max-w-xs) и портретным соотношением 4:3 */}
			<div className='relative w-full max-w-xs aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 shadow-md mb-6'>
				<Image
					src='/photo.jpg'
					alt={`${ACTOR_VCARD.firstName} ${ACTOR_VCARD.lastName}`}
					fill
					sizes='(max-width: 640px) 100vw, 320px'
					className='object-cover'
					priority
				/>
			</div>

			{/* Имя и альтернативные имена */}
			<h1 className='font-display text-2xl font-bold uppercase italic tracking-tighter'>
				{ACTOR_VCARD.firstName} {ACTOR_VCARD.lastName}
			</h1>
			<p className='font-mono text-xs font-semibold text-neutral-500 uppercase tracking-widest mt-1'>
				a.k.a. Hama • Хама • 하마
			</p>
			<p className='font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 mt-2 mb-8'>
				{ACTOR_VCARD.title}
			</p>

			<div className='w-full max-w-xs flex flex-col gap-3'>
				{/* Сохранить в контакты */}
				<a
					href='/api/vcard'
					download
					className='flex items-center justify-center gap-2 bg-black text-white font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:bg-[#d90416] transition-colors'
				>
					<Download size={16} />
					Save to Contacts
				</a>

				{/* Ссылка на главный сайт */}
				<Link
					href={WEBSITE_URL}
					className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
				>
					<Globe size={16} />
					Website
				</Link>

				{/* Шоурил */}
				<a
					href={SHOWREEL_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
				>
					<PlayCircle size={16} />
					Showreel
				</a>

				{/* Портфолио PDF */}
				<a
					href={PORTFOLIO_PDF_URL}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
				>
					<FileText size={16} />
					Portfolio (PDF)
				</a>

				{/* Соцсети и мессенджеры — 2 колонки */}
				<div className='grid grid-cols-2 gap-3'>
					<a
						href={TELEGRAM_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<FaTelegramPlane size={16} />
						Telegram
					</a>
					<a
						href={WHATSAPP_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<FaWhatsapp size={16} />
						WhatsApp
					</a>
					<a
						href={INSTAGRAM_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<FaInstagram size={16} />
						Instagram
					</a>
					<a
						href={KAKAOTALK_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 border border-neutral-300 font-mono text-xs uppercase tracking-[0.25em] font-bold py-4 rounded-sm hover:border-black transition-colors'
					>
						<SiKakaotalk size={16} />
						KakaoTalk
					</a>
				</div>
			</div>
		</main>
	)
}
