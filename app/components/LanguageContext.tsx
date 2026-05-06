"use client"

import { createContext, useContext, useState } from "react"
import { useSearchParams } from "next/navigation"

type Language = "en" | "zh"

interface LanguageContextType {
  lang: Language
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const langParam = searchParams.get("lang")
  const lang: Language = (langParam === "zh" || langParam === "en") ? langParam : "en"

  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)