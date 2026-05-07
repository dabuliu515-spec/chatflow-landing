"use client"
import { useLanguage } from "./LanguageContext"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  const switchLang = (newLang: "en" | "zh") => {
    setLang(newLang)
    localStorage.setItem("lang", newLang)
    const url = new URL(window.location.href)
    url.searchParams.set("lang", newLang)
    window.history.pushState({}, "", url.toString())
    window.location.reload()
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
