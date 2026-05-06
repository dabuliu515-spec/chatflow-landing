"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

type Language = "en" | "zh"

interface LanguageContextType {
  lang: Language
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
})

function LanguageReader({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const langParam = searchParams.get("lang")
    if (langParam === "zh" || langParam === "en") {
      setLang(langParam)
    }
  }, [searchParams])

  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageReader>{children}</LanguageReader>
  )
}

export const useLanguage = () => useContext(LanguageContext)