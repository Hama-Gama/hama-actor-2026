'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { LuShare2, LuCopy, LuCheck, LuX } from 'react-icons/lu'
import { toast } from 'sonner'

interface ShareModalProps {
	lang: string
}

export default function ShareModal({ lang }: ShareModalProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const [shareUrl, setShareUrl] = useState('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShareUrl(window.location.href)
		}
	}, [isOpen])

	const labels = {
		title:
			lang === 'ru'
				? 'Поделиться профилем'
				: lang === 'kk'
					? 'Профильмен бөлісу'
					: lang === 'ko'
						? '프로필 공유'
						: 'Share Profile',
		copy:
			lang === 'ru'
				? 'Скопировать'
				: lang === 'kk'
					? 'Көшіру'
					: lang === 'ko'
						? '복사'
						: 'Copy Link',
		copied:
			lang === 'ru'
				? 'Скопировано!'
				: lang === 'kk'
					? 'Көшірілді!'
					: lang === 'ko'
						? '복사됨!'
						: 'Copied!',
		scan:
			lang === 'ru'
				? 'Сканируйте QR-код'
				: lang === 'kk'
					? 'QR-кодты сканерлеңіз'
					: lang === 'ko'
						? 'QR 코드를 스캔하세요'
						: 'Scan QR Code',
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl || window.location.href)
			setCopied(true)
			toast.success(labels.copied)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			toast.error('Copy failed')
		}
	}

	return (
		<>
			<button
				type='button'
				onClick={() => setIsOpen(true)}
				aria-expanded={isOpen}
				aria-haspopup='dialog'
				className='p-1.5 sm:p-2 text-neutral-600 hover:text-black transition cursor-pointer'
				aria-label='Share'
			>
				<LuShare2 size={18} className='sm:w-[18px] sm:h-[18px]' />
			</button>

			{isOpen && (
				<div
					role='dialog'
					aria-modal='true'
					aria-label={labels.title}
					className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200'
				>
					<div className='absolute inset-0' onClick={() => setIsOpen(false)} />

					<div className='relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl z-10 border border-neutral-100 flex flex-col items-center text-center'>
						<button
							type='button'
							onClick={() => setIsOpen(false)}
							aria-label='Close'
							className='absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black transition rounded-full hover:bg-neutral-100'
						>
							<LuX size={20} />
						</button>

						<h3 className='font-mono text-sm uppercase font-bold tracking-wider mb-6 text-black'>
							{labels.title}
						</h3>

						<div className='p-4 bg-white border border-neutral-200 rounded-xl shadow-sm mb-4'>
							{shareUrl && (
								<QRCodeSVG
									value={shareUrl}
									size={190}
									level='H'
									includeMargin={false}
								/>
							)}
						</div>

						<p className='font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-6'>
							{labels.scan}
						</p>

						<div className='w-full flex items-center gap-2 p-1.5 pl-3 bg-neutral-50 border border-neutral-200 rounded-lg'>
							<span className='font-mono text-xs text-neutral-500 truncate flex-1 text-left'>
								{shareUrl}
							</span>
							<button
								type='button'
								onClick={handleCopy}
								className='flex items-center gap-1.5 bg-black hover:bg-[#d90416] text-white font-mono text-xs uppercase font-bold px-3 py-2 rounded-md transition-colors shrink-0'
							>
								{copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
								<span>{copied ? labels.copied : labels.copy}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
