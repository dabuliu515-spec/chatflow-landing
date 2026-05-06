"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lang = searchParams.get("lang") || "en"

  const getLangUrl = (targetLang: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", targetLang)
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Link 
        href={getLangUrl("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          lang === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        EN
      </Link>
      <Link 
        href={getLangUrl("zh")}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          lang === "zh" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        中文
      </Link>
    </div>
  )
}