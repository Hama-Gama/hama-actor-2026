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
		tooLong: (max: number) =>
			isRu
				? `Слишком длинно — максимум ${max} символов`
				: isEn
					? `Too long — ${max} characters max`
					: isKk
						? `Тым ұзын — ең көбі ${max} таңба`
						: `너무 깁니다 — 최대 ${max}자`,
	}
}

// Лимиты вынесены отдельно, чтобы ContactForm.tsx мог использовать те же
// цифры для maxLength на инпутах и счётчика символов у Message — одно
// число, один источник истины для клиента и сервера.
export const CONTACT_FIELD_LIMITS = {
	name: 100,
	projectRole: 200,
	deadline: 50,
	otherMethodLabel: 60,
	contactValue: 150,
	message: 2000,
} as const

export const getContactSchema = (locale?: string) => {
	const errors = errorMessages(locale)

	return z.object({
		name: z
			.string()
			.trim()
			.min(2, { message: errors.nameRequired })
			.max(CONTACT_FIELD_LIMITS.name, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.name),
			}),
		projectRole: z
			.string()
			.trim()
			.min(2, { message: errors.projectRequired })
			.max(CONTACT_FIELD_LIMITS.projectRole, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.projectRole),
			}),
		deadline: z
			.string()
			.trim()
			.max(CONTACT_FIELD_LIMITS.deadline, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.deadline),
			})
			.optional(),
		preferredContact: z.enum(
			[
				'telegram',
				'whatsapp',
				'wechat',
				'kakaotalk',
				'phone',
				'email',
				'other',
			],
			{ message: errors.contactMethodRequired },
		),
		// Заполняется только когда preferredContact === 'other'
		otherMethodLabel: z
			.string()
			.trim()
			.max(CONTACT_FIELD_LIMITS.otherMethodLabel, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.otherMethodLabel),
			})
			.optional(),
		contactValue: z
			.string()
			.trim()
			.min(3, { message: errors.contactValueRequired })
			.max(CONTACT_FIELD_LIMITS.contactValue, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.contactValue),
			}),
		message: z
			.string()
			.trim()
			.max(CONTACT_FIELD_LIMITS.message, {
				message: errors.tooLong(CONTACT_FIELD_LIMITS.message),
			})
			.optional(),
		// honeypot — реальные пользователи это поле не видят и не заполняют
		company: z.string().max(0).optional(),
	})
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>
