import { Download, FileDown } from 'lucide-react'

type ProfileDownloadProps = {
	locale?: string
}

type ProfileLocale = 'en' | 'ko' | 'ru' | 'kk'

const DOWNLOADS_PATH = '/downloads'

type ProfileConfig = {
	/** Имя файла без расширения (лежит в public/downloads) */
	file: string
	pdfLabel: string
	pptxLabel: string
	/** Короткая пометка под кнопками (только если профиль не на языке сайта) */
	note?: string
}

// ru и kk отдают английский профиль, поэтому file = Hama-Profile-EN
const PROFILE_CONFIG: Record<ProfileLocale, ProfileConfig> = {
	en: {
		file: 'Hama-Profile-EN',
		pdfLabel: 'Download Profile (PDF)',
		pptxLabel: 'PPTX (editable)',
	},
	ko: {
		file: 'Hama-Profile-KO',
		pdfLabel: '프로필 다운로드 (PDF)',
		pptxLabel: 'PPTX (편집용)',
	},
	ru: {
		file: 'Hama-Profile-EN',
		pdfLabel: 'Скачать профиль актёра (PDF)',
		pptxLabel: 'PPTX (редактируемый)',
		note: 'Профиль на английском языке',
	},
	kk: {
		file: 'Hama-Profile-EN',
		pdfLabel: 'Профильді жүктеп алу (PDF)',
		pptxLabel: 'PPTX',
		note: 'Профиль ағылшын тілінде',
	},
}

function resolveLocale(locale?: string): ProfileLocale {
	if (locale === 'kz') return 'kk'
	if (locale && locale in PROFILE_CONFIG) return locale as ProfileLocale
	return 'en'
}

export const ProfileDownload = ({ locale }: ProfileDownloadProps) => {
	const { file, pdfLabel, pptxLabel, note } =
		PROFILE_CONFIG[resolveLocale(locale)]

	const pdfHref = `${DOWNLOADS_PATH}/${file}.pdf`
	const pptxHref = `${DOWNLOADS_PATH}/${file}.pptx`

	return (
		<div className='flex flex-col items-start gap-2'>
			<div className='flex flex-wrap items-center gap-x-5 gap-y-3'>
				{/* Основная кнопка */}
				<a
					href={pdfHref}
					download={`${file}.pdf`}
					className='inline-flex items-center gap-2 px-5 py-2.5 border border-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors'
				>
					<FileDown size={16} />
					{pdfLabel}
				</a>

				{/* Второстепенная ссылка */}
				<a
					href={pptxHref}
					download={`${file}.pptx`}
					className='inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 underline underline-offset-4 hover:text-black transition-colors'
				>
					<Download size={14} />
					{pptxLabel}
				</a>
			</div>

			{note && (
				<p className='font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400'>
					{note}
				</p>
			)}
		</div>
	)
}
