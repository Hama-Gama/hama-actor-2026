'use client'

import React from 'react'
import { FileDown } from 'lucide-react'

type ResumeDownloadProps = {
	locale?: string
}

// kk и ru используют один и тот же (русский) файл резюме
const RESUME_BY_LOCALE: Record<string, string> = {
	ru: '/resume/khamit-arkayev-hama-resume-ru.pdf',
	kk: '/resume/khamit-arkayev-hama-resume-ru.pdf',
	kz: '/resume/khamit-arkayev-hama-resume-ru.pdf',
	en: '/resume/khamit-arkayev-hama-resume-en.pdf',
	ko: '/resume/khamit-arkayev-hama-resume-ko.pdf',
}

export const ResumeDownload = ({ locale }: ResumeDownloadProps) => {
	const href = RESUME_BY_LOCALE[locale ?? 'en'] ?? RESUME_BY_LOCALE.en

	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'

	const label = isRu
		? 'Резюме (PDF)'
		: isEn
			? 'Resume (PDF)'
			: isKk
				? 'Резюме (PDF)'
				: '이력서 (PDF)'

	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='inline-flex items-center gap-2 px-5 py-2.5 border border-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors'
		>
			<FileDown size={16} />
			{label}
		</a>
	)
}
