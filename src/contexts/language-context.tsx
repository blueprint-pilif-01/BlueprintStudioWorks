import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Language = "ro" | "en"

type TranslationRecord<T> = Record<Language, T>

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  translate: <T>(translations: TranslationRecord<T>) => T
}

const STORAGE_KEY = "bsw-language"

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en"
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null
  if (stored === "ro" || stored === "en") {
    return stored
  }
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => (prev === "ro" ? "en" : "ro"))
  }, [])

  const translate = useCallback(<T,>(translations: TranslationRecord<T>) => {
    return translations[language]
  }, [language])

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage,
    translate,
  }), [language, setLanguage, toggleLanguage, translate])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider")
  }
  return context
}
