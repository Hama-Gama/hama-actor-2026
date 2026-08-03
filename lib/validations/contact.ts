import { z } from 'zod'

export type ContactLocale = 'ru' | 'en' | 'kk' | 'kz' | 'ko'

const errorMessages = (locale?: string) => {
	const isRu = locale === 'ru'
	const isEn = locale === 'en'
	const isKk = locale === 'kk' || locale === 'kz'
	// default (else) branch = Korean, matching the rest of the codebase's pattern

	return {
		nameRequired: isRu
			? 'Укажите имя или студию'
			: isEn
				? 'Please enter your name or studio'
				: isKk
					? 'Атыңызды немесе студияны көрсетіңіз'
					: '이름 또는 스튜디오를 입력해 주세요',
		projectRequired: isRu
			? 'Опишите проект и роль'
			: isEn
				? 'Please describe the project and role'
				: isKk
					? 'Жоба мен рөлді сипаттаңыз'
					: '프로젝트와 배역을 입력해 주세요',
		contactMethodRequired: isRu
			? 'Выберите способ связи'
			: isEn
				? 'Please choose a contact method'
				: isKk
					? 'Байланыс тәсілін таңдаңыз'
					: '연락 방법을 선택해 주세요',
		contactValueRequired: isRu
			? 'Укажите контакт для ответа (email, номер, ник)'
			: isEn
				? 'Please provide a contact to reply to (email, number, handle)'
				: isKk
					? 'Жауап беру үшін байланыс мәліметін көрсетіңіз'
					: '답장을 받을 연락처를 입력해 주세요',
	}
}

export const getContactSchema = (locale?: string) => {
	const errors = errorMessages(locale)

	return z.object({
		name: z.string().trim().min(2, { message: errors.nameRequired }),
		projectRole: z
			.string()
			.trim()
			.min(2, { message: errors.projectRequired }),
		deadline: z.string().trim().optional(),
		preferredContact: z.enum(['email', 'whatsapp', 'telegram', 'wechat'], {
			message: errors.contactMethodRequired,
		}),
		contactValue: z
			.string()
			.trim()
			.min(3, { message: errors.contactValueRequired }),
		message: z.string().trim().optional(),
		// honeypot — реальные пользователи это поле не видят и не заполняют
		company: z.string().max(0).optional(),
	})
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>
