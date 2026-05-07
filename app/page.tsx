"use client"
import Link from "next/link"
import { useAuth } from "@/lib/AuthContext"
import { useLanguage } from "./components/LanguageContext"

export default function Home() {
  const { user, loading } = useAuth()
  const { lang } = useLanguage()
  const t = (zh: string, en: string) => lang === "zh" ? zh : en

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div>Loading...</div></div>
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ChatFlow</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">{t("Features", "Features")}</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">{t("Pricing", "Pricing")}</a>
            {user ? (
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">{t("Dashboard", "Dashboard")}</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">{t("Login", "Login")}</Link>
            )}
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t("Automate Customer Responses", "Automate Customer Responses")}<br />
            <span className="text-blue-600">{t("Without Losing the Human Touch", "Without Losing the Human Touch")}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal.", "ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/dashboard" : "/login"} className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700">{t("Get Started", "Get Started")}</Link>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-blue-600">{t("Learn More", "Learn More")}</a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("Features", "Features")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t("Instant Responses", "Instant Responses"), desc: t("AI replies in seconds, day or night.", "AI replies in seconds, day or night.") },
              { title: t("Smart Routing", "Smart Routing"), desc: t("Routes to the right team or knowledge base.", "Routes to the right team or knowledge base.") },
              { title: t("Analytics", "Analytics"), desc: t("Track performance and improve continuously.", "Track performance and improve continuously.") },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">ChatFlow</div>
          <p className="text-sm">2024 ChatFlow.</p>
        </div>
      </footer>
    </div>
  )
}
