// lib/i18n-context.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react'

const LangContext = createContext<string>('en')

export function LangProvider({
	children,
	lang,
}: {
	children: ReactNode
	lang: string
}) {
	return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
