"use client"
import { useLanguage } from "./components/LanguageContext"
export default function Home() {
  const { lang } = useLanguage()
  const t = (zh: string, en: string) => lang === "zh" ? zh : en
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ChatFlow</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              {t("功能", "Features")}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">
              {t("价格", "Pricing")}
            </a>
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
              {t("登录", "Login")}
            </a>
          </div>
        </div>
      </header>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            {t("AI驱动的客服系统", "AI-Powered Customer Service")}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t("自动化客户响应", "Automate Customer Responses")}<br />
            <span className="text-blue-600">{t("不失人情味", "Without Losing the Human Touch")}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("ChatFlow 帮助企业 24/7 处理客户咨询，AI 回复就像真人一样自然。简单设置，效果显著。", 
              "ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal. Simple setup, powerful results.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors">
              {t("免费试用", "Start Free Trial")}
            </a>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-blue-600 transition-colors">
              {t("了解更多", "Learn More")}
            </a>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("核心功能", "Everything You Need")}</h2>
            <p className="text-gray-600 text-lg">{t("强大功能助您扩展客服能力", "Powerful features to scale your customer support")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: t("即时响应", "Instant Responses"), 
                desc: t("AI 秒级回复，全天候服务。再也不用等上班时间。", "AI replies in seconds, day or night. No more waiting for business hours.") 
              },
              { 
                title: t("智能分流", "Smart Routing"), 
                desc: t("理解客户意图，自动转接到对应团队或知识库。", "Understands customer intent and routes to the right team or knowledge base.") 
              },
              { 
                title: t("数据分析", "Analytics Dashboard"), 
                desc: t("追踪绩效，发现问题，持续优化。", "Track performance, identify gaps, and improve continuously.") 
              },
              { 
                title: t("多语言支持", "Multi-language"), 
                desc: t("支持中文、英文、日文等多种语言。", "Support customers in Chinese, English, Japanese and more.") 
              },
              { 
                title: t("轻松集成", "Easy Integration"), 
                desc: t("几分钟内连接微信、飞书、WhatsApp 和您的网站。", "Connect with WeChat, WhatsApp, LINE, Feishu, and your website in minutes.") 
              },
              { 
                title: t("成本优化", "Cost Effective"), 
                desc: t("降低 70% 客服成本，同时提升服务质量。", "Reduce support costs by 70% while improving response quality.") 
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("简单定价", "Simple Pricing")}</h2>
            <p className="text-gray-600 text-lg">{t("免费开始，随规模增长", "Start free, scale as you grow")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                name: t("入门版", "Starter"), 
                price: "$0", 
                period: t("永久", "forever"), 
                desc: t("完美测试", "Perfect for testing"), 
                features: [t("100条消息/月", "100 messages/month"), t("1个渠道", "1 channel"), t("基础分析", "Basic analytics")],
                highlight: false
              },
              { 
                name: t("专业版", "Pro"), 
                price: "$49", 
                period: t("/月", "/month"), 
                desc: t("成长型企业", "For growing businesses"), 
                features: [t("5,000条消息/月", "5,000 messages/month"), t("3个渠道", "3 channels"), t("AI自动回复", "AI auto-reply"), t("优先支持", "Priority support")],
                highlight: true
              },
              { 
                name: t("企业版", "Enterprise"), 
                price: t("定制", "Custom"), 
                period: "", 
                desc: t("大型团队", "For large teams"), 
                features: [t("无限消息", "Unlimited messages"), t("全部渠道", "All channels"), t("定制集成", "Custom integrations"), t("专属支持", "Dedicated support")],
                highlight: false
              },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-2xl ${plan.highlight ? "bg-blue-600 text-white shadow-xl scale-105" : "bg-white border border-gray-200"}`}>
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-semibold mb-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>{plan.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className={plan.highlight ? "text-blue-200" : "text-green-500"}>+</span>
                      <span className={plan.highlight ? "text-white" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-3 rounded-full font-semibold transition-colors ${
                  plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                  {plan.name === "Enterprise" ? t("联系我们", "Contact Us") : t("开始使用", "Get Started")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("准备好开始了吗？", "Ready to Get Started?")}</h2>
          <p className="text-blue-100 text-lg mb-8">
            {t("数百家企业正在使用 ChatFlow 提供即时、个性化的客户支持。", 
              "Join hundreds of businesses using ChatFlow to deliver instant, personalized customer support.")}
          </p>
          <a href="mailto:hello@chatflow.com" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors">
            {t("立即联系我们", "Contact Us Today")}
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">ChatFlow</div>
          <p className="text-sm">© 2024 ChatFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}