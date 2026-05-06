"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const langParam = params.get("lang")
    if (langParam === "zh" || langParam === "en") {
      setLang(langParam)
    }
  }, [])
  const getUrl = (targetLang: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set("lang", targetLang)
    return "?" + params.toString()
  }
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Link 
        href={getUrl("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          lang === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        EN
      </Link>
      <Link 
        href={getUrl("zh")}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          lang === "zh" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        中文
      </Link>
    </div>
  )
}