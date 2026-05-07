"use client"

import { createContext, useContext, useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

type Language = "en" | "zh"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
})

function LanguageReader({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const langParam = searchParams.get("lang")
    if (langParam === "zh" || langParam === "en") {
      setLang(langParam)
      localStorage.setItem("lang", langParam)
    } else {
      const saved = localStorage.getItem("lang") as Language
      if (saved === "zh" || saved === "en") {
        setLang(saved)
      }
    }
  }, [searchParams])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

function LoadingFallback() {
  return <div className="min-h-screen bg-gray-50" />
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LanguageReader>{children}</LanguageReader>
    </Suspense>
  )
}

export const useLanguage = () => useContext(LanguageContext)
