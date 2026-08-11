// Единственное место в проекте, где перечислены поддерживаемые языки.
// proxy.ts, layout.tsx и (по желанию) Header.tsx берут список отсюда —
// добавление нового языка = одна строка здесь + одна строка в UI-массиве
// с флагом/названием в Header.tsx (это уже вкусовые UI-данные, не логика).

export const SUPPORTED_LOCALES = ['en', 'ru', 'kk', 'ko'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

// Алиасы: если в Accept-Language или где-либо ещё встретится 'kz',
// трактуем его как 'kk'. Добавляй сюда новые алиасы по мере надобности.
const LOCALE_ALIASES: Record<string, Locale> = {
	kz: 'kk',
}

export function isSupportedLocale(value: string): value is Locale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

// Нормализует произвольную строку локали (из URL, cookie, пропса) к
// поддерживаемому значению. Используй ВЕЗДЕ вместо ручных if/else-цепочек
// вида `isRu ? ... : isKk ? ... : ...` — так фолбэк на DEFAULT_LOCALE
// гарантированно одинаков во всех компонентах.
export function resolveLocale(value?: string | null): Locale {
	if (!value) return DEFAULT_LOCALE
	const normalized = LOCALE_ALIASES[value] ?? value
	return isSupportedLocale(normalized) ? normalized : DEFAULT_LOCALE
}

type WeightedTag = { locale: Locale; quality: number }

// Разбирает заголовок Accept-Language с учётом q-весов:
// "ru-RU,ru;q=0.9,en-US;q=0.8" → ['ru', 'en'], отсортировано по приоритету.
export function parseAcceptLanguage(header: string): Locale[] {
	if (!header) return []

	const parsed: WeightedTag[] = header
		.split(',')
		.map(part => {
			const [rawTag, qPart] = part.trim().split(';q=')
			const primarySubtag = rawTag.split('-')[0].trim().toLowerCase()
			const normalized = LOCALE_ALIASES[primarySubtag] ?? primarySubtag
			const quality = qPart ? parseFloat(qPart) : 1
			return {
				locale: normalized as Locale,
				quality: Number.isNaN(quality) ? 0 : quality,
			}
		})
		.filter(entry => isSupportedLocale(entry.locale))

	// Стабильная сортировка по убыванию q — Array.sort в V8 стабилен,
	// поэтому порядок при равном q сохраняется как в исходном заголовке.
	parsed.sort((a, b) => b.quality - a.quality)

	return parsed.map(entry => entry.locale)
}

// Главная функция детекции: cookie (осознанный выбор юзера) важнее
// Accept-Language (эвристика для новых посетителей).
export function detectLocale(opts: {
	cookieValue?: string | null
	acceptLanguageHeader?: string | null
}): Locale {
	if (opts.cookieValue && isSupportedLocale(opts.cookieValue)) {
		return opts.cookieValue
	}

	const [best] = parseAcceptLanguage(opts.acceptLanguageHeader ?? '')
	return best ?? DEFAULT_LOCALE
}

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
// 1 год — язык это долгоживущее предпочтение, не сессионные данные
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
