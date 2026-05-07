"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "./LanguageContext"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const switchLang = (newLang: "en" | "zh") => {
    setLang(newLang)
    localStorage.setItem("lang", newLang)
  }

  if (!mounted) {
    return <div className="fixed top-4 right-4 z-50 flex gap-2">
      <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">EN</div>
      <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">Chinese</div>
    </div>
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => switchLang("en")}
        className={lang === "en" ? "bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium" : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200"}
      >
        EN
      </button>
      <button
        onClick={() => switchLang("zh")}
        className={lang === "zh" ? "bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium" : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200"}
      >
        Chinese
      </button>
    </div>
  )
}
