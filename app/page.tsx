"use client"
import Link from "next/link"
import { useLanguage } from "./components/LanguageContext"
import { useAuth } from "@/lib/AuthContext"
export default function Home() {
  const { user, loading } = useAuth()
  const { lang } = useLanguage()
  const t = (zh: string, en: string) => lang === "zh" ? zh : en
  if (loading) return <div>Loading...</div>
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ChatFlow</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">{t("功能", "Features")}</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">{t("价格", "Pricing")}</a>
            {user ? (
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">{t("控制台", "Dashboard")}</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">{t("登录", "Login")}</Link>
            )}
          </div>
        </div>
      </header>
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{t("自动化客户回复", "Automate Customer Responses")}<br /><span className="text-blue-600">{t("保持人性化", "Without Losing the Human Touch")}</span></h1>
          <p className="text-xl text-gray-600 mb-8">{t("ChatFlow帮助企业全天候处理客户咨询，AI回复如同真人。", "ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal.")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/dashboard" : "/login"} className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700">{t("开始使用", "Get Started")}</Link>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-blue-600">{t("了解更多", "Learn More")}</a>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("核心功能", "Everything You Need")}</h2>
            <p className="text-gray-600 text-lg">{t("强大的功能助您扩展客服能力", "Powerful features to scale your customer support")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("即时响应", "Instant Responses")}</h3><p className="text-gray-600">{t("AI秒级回复，全天候服务。", "AI replies in seconds, day or night.")}</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("智能路由", "Smart Routing")}</h3><p className="text-gray-600">{t("自动转接至对应团队。", "Routes to the right team or knowledge base.")}</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("数据分析", "Analytics Dashboard")}</h3><p className="text-gray-600">{t("追踪绩效，持续优化。", "Track performance and improve continuously.")}</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("多语言支持", "Multi-language")}</h3><p className="text-gray-600">{t("支持中文、英文、日文等多语言。", "Support Chinese, English, Japanese and more.")}</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("轻松集成", "Easy Integration")}</h3><p className="text-gray-600">{t("几分钟内连接微信、WhatsApp等。", "Connect WeChat, WhatsApp, LINE, Feishu in minutes.")}</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">{t("成本优化", "Cost Effective")}</h3><p className="text-gray-600">{t("降低70%客服成本。", "Reduce support costs by 70%.")}</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{t("简单定价", "Simple Pricing")}</h2><p className="text-gray-600 text-lg">{t("免费开始，按需扩展", "Start free, scale as you grow")}</p></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white border border-gray-200"><h3 className="text-xl font-semibold mb-2">{t("入门版", "Starter")}</h3><div className="text-4xl font-bold mb-2">$0</div><p className="text-gray-500 text-sm mb-4">{t("永久免费", "forever")}</p><ul className="space-y-2 mb-6"><li>+ 100 {t("条消息/月", "messages/month")}</li><li>+ 1 {t("个渠道", "channel")}</li><li>+ {t("基础分析", "Basic analytics")}</li></ul><Link href="/login" className="block text-center py-3 bg-blue-600 text-white rounded-full">{t("开始使用", "Get Started")}</Link></div>
            <div className="p-8 rounded-2xl bg-blue-600 text-white border border-blue-600"><h3 className="text-xl font-semibold mb-2">{t("专业版", "Pro")}</h3><div className="text-4xl font-bold mb-2">$49</div><p className="text-blue-200 text-sm mb-4">/ {t("月", "month")}</p><ul className="space-y-2 mb-6"><li>+ 5,000 {t("条消息/月", "messages/month")}</li><li>+ 3 {t("个渠道", "channels")}</li><li>+ {t("AI自动回复", "AI auto-reply")}</li><li>+ {t("优先支持", "Priority support")}</li></ul><Link href="/login" className="block text-center py-3 bg-white text-blue-600 rounded-full">{t("开始使用", "Get Started")}</Link></div>
            <div className="p-8 rounded-2xl bg-white border border-gray-200"><h3 className="text-xl font-semibold mb-2">{t("企业版", "Enterprise")}</h3><div className="text-4xl font-bold mb-2">{t("定制", "Custom")}</div><p className="text-gray-500 text-sm mb-4">{t("大型团队", "For large teams")}</p><ul className="space-y-2 mb-6"><li>+ {t("无限消息", "Unlimited messages")}</li><li>+ {t("全部渠道", "All channels")}</li><li>+ {t("定制集成", "Custom integrations")}</li><li>+ {t("专属支持", "Dedicated support")}</li></ul><Link href="/login" className="block text-center py-3 bg-blue-600 text-white rounded-full">{t("联系我们", "Contact Us")}</Link></div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700"><div className="max-w-3xl mx-auto text-center"><h2 className="text-3xl font-bold text-white mb-4">{t("准备好开始了吗？", "Ready to Get Started?")}</h2><p className="text-blue-100 text-lg mb-8">{t("数百家企业正在使用ChatFlow。", "Join hundreds of businesses using ChatFlow.")}</p><a href="mailto:hello@chatflow.com" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg">{t("立即联系我们", "Contact Us Today")}</a></div></section>
      <footer className="py-8 px-6 bg-gray-900 text-gray-400"><div className="max-w-6xl mx-auto text-center"><div className="text-2xl font-bold text-white mb-4">ChatFlow</div><p className="text-sm">2024 ChatFlow.</p></div></footer>
    </div>
  )
}
