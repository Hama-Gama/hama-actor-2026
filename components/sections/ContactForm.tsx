'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import {
	getContactSchema,
	type ContactFormValues,
} from '@/lib/validations/contact'

type ContactFormProps = {
	locale?: string
}

const initialValues: ContactFormValues = {
	name: '',
	projectRole: '',
	deadline: '',
	preferredContact: 'telegram',
	contactValue: '',
	message: '',
	company: '',
}

export const ContactForm = ({ locale }: ContactFormProps) => {
	const [values, setValues] = useState<ContactFormValues>(initialValues)
	const [errors, setErrors] = useState<
		Partial<Record<keyof ContactFormValues, string>>
	>({})
	const [submitting, setSubmitting] = useState(false)

	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'

	const t = {
		name: isRu
			? 'Имя / Студия'
			: isEn
				? 'Name / Studio'
				: isKk
					? 'Аты / Студия'
					: '이름 / 스튜디오',
		projectRole: isRu
			? 'Проект и роль'
			: isEn
				? 'Project & Role'
				: isKk
					? 'Жоба және рөл'
					: '프로젝트 및 배역',
		deadline: isRu ? 'Дедлайн' : isEn ? 'Deadline' : isKk ? 'Мерзім' : '마감일',
		deadlineHint: isRu
			? 'например: ASAP, март 2027'
			: isEn
				? 'e.g. ASAP, March 2027'
				: isKk
					? 'мысалы: ASAP, наурыз 2027'
					: '예: ASAP, 2027년 3월',
		preferredContact: isRu
			? 'Способ связи для ответа'
			: isEn
				? 'Preferred contact method'
				: isKk
					? 'Жауап алу тәсілі'
					: '답장 받을 방법',
		contactValue: isRu
			? 'Контакт (email / номер / ник)'
			: isEn
				? 'Your contact (email / number / handle)'
				: isKk
					? 'Байланысыңыз (email / нөмір / ник)'
					: '연락처 (이메일 / 번호 / 아이디)',
		message: isRu
			? 'Сообщение (необязательно)'
			: isEn
				? 'Message (optional)'
				: isKk
					? 'Хабарлама (міндетті емес)'
					: '메시지 (선택 사항)',
		submit: isRu ? 'Отправить' : isEn ? 'Send' : isKk ? 'Жіберу' : '보내기',
		submitting: isRu
			? 'Отправка...'
			: isEn
				? 'Sending...'
				: isKk
					? 'Жіберілуде...'
					: '전송 중...',
		success: isRu
			? 'Сообщение отправлено! Отвечу как можно скорее.'
			: isEn
				? 'Message sent! I will reply as soon as possible.'
				: isKk
					? 'Хабарлама жіберілді! Жақын арада жауап беремін.'
					: '메시지가 전송되었습니다! 곧 답장드리겠습니다.',
		failure: isRu
			? 'Не удалось отправить. Попробуйте ещё раз или напишите напрямую в Telegram/WhatsApp.'
			: isEn
				? "Couldn't send the message. Please try again or reach out directly via Telegram/WhatsApp."
				: isKk
					? 'Хабарламаны жіберу мүмкін болмады. Қайталап көріңіз немесе Telegram/WhatsApp арқылы жазыңыз.'
					: '메시지를 보내지 못했습니다. 다시 시도하거나 Telegram/WhatsApp으로 직접 연락해 주세요.',
	}

	const contactOptions: {
		value: ContactFormValues['preferredContact']
		label: string
	}[] = [
		{ value: 'telegram', label: 'Telegram' },
		{ value: 'whatsapp', label: 'WhatsApp' },
		{ value: 'wechat', label: 'WeChat' },
		{ value: 'email', label: 'Email' },
	]

	const handleChange = (field: keyof ContactFormValues, value: string) => {
		setValues(prev => ({ ...prev, [field]: value }))
		if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// honeypot заполнен ботом — молча "успех", ничего не отправляем
		if (values.company) {
			setValues(initialValues)
			return
		}

		const schema = getContactSchema(locale)
		const result = schema.safeParse(values)

		if (!result.success) {
			const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {}
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof ContactFormValues
				if (!fieldErrors[field]) fieldErrors[field] = issue.message
			}
			setErrors(fieldErrors)
			return
		}

		setSubmitting(true)
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...result.data, locale }),
			})

			if (!res.ok) throw new Error('Request failed')

			toast.success(t.success)
			setValues(initialValues)
			setErrors({})
		} catch (err) {
			console.error('Contact form submit error', err)
			toast.error(t.failure)
		} finally {
			setSubmitting(false)
		}
	}

	// Mobile-first размеры полей: чуть компактнее на мобильном, растёт к 2xl.
	const inputClass =
		'w-full bg-neutral-50 border border-neutral-200 rounded-sm px-3.5 sm:px-4 py-2.5 sm:py-3 2xl:py-3.5 text-sm 2xl:text-base focus:outline-none focus:border-[#d90416] transition-colors'
	const labelClass =
		'font-mono text-[9px] sm:text-[10px] 2xl:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-400 mb-1.5 sm:mb-2 block'
	const errorClass = 'text-[#d90416] text-xs mt-1 font-mono'

	return (
		// Структура grid (md:grid-cols-2) не меняется — только отступы/паддинги/шрифты
		// по sm/md/lg/xl/2xl.
		<form
			onSubmit={handleSubmit}
			className='max-w-2xl 2xl:max-w-3xl mx-auto text-left mb-12 sm:mb-16'
			noValidate
		>
			{/* honeypot — скрыто от людей */}
			<input
				type='text'
				name='company'
				value={values.company}
				onChange={e => handleChange('company', e.target.value)}
				className='hidden'
				tabIndex={-1}
				autoComplete='off'
			/>

			<div className='grid md:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8 mb-4 sm:mb-6'>
				<div>
					<label className={labelClass}>{t.name}</label>
					<input
						type='text'
						value={values.name}
						onChange={e => handleChange('name', e.target.value)}
						className={inputClass}
					/>
					{errors.name && <p className={errorClass}>{errors.name}</p>}
				</div>

				<div>
					<label className={labelClass}>{t.deadline}</label>
					<input
						type='text'
						value={values.deadline}
						onChange={e => handleChange('deadline', e.target.value)}
						placeholder={t.deadlineHint}
						className={inputClass}
					/>
				</div>
			</div>

			<div className='mb-4 sm:mb-6'>
				<label className={labelClass}>{t.projectRole}</label>
				<input
					type='text'
					value={values.projectRole}
					onChange={e => handleChange('projectRole', e.target.value)}
					className={inputClass}
				/>
				{errors.projectRole && (
					<p className={errorClass}>{errors.projectRole}</p>
				)}
			</div>

			<div className='grid md:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8 mb-4 sm:mb-6'>
				<div>
					<label className={labelClass}>{t.preferredContact}</label>
					<select
						value={values.preferredContact}
						onChange={e => handleChange('preferredContact', e.target.value)}
						className={inputClass}
					>
						{contactOptions.map(opt => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className={labelClass}>{t.contactValue}</label>
					<input
						type='text'
						value={values.contactValue}
						onChange={e => handleChange('contactValue', e.target.value)}
						className={inputClass}
					/>
					{errors.contactValue && (
						<p className={errorClass}>{errors.contactValue}</p>
					)}
				</div>
			</div>

			<div className='mb-6 sm:mb-8'>
				<label className={labelClass}>{t.message}</label>
				<textarea
					value={values.message}
					onChange={e => handleChange('message', e.target.value)}
					rows={4}
					className={inputClass}
				/>
			</div>

			<button
				type='submit'
				disabled={submitting}
				className='w-full md:w-auto px-8 sm:px-10 2xl:px-12 py-3.5 sm:py-4 2xl:py-4.5 bg-black text-white font-mono text-xs 2xl:text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#d90416] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
			>
				{submitting ? t.submitting : t.submit}
			</button>
		</form>
	)
}
