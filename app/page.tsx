import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ChatFlow</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#contact" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
              Get Started
            </a>
          </div>
        </div>
      </header>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            AI-Powered Customer Service
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Automate Customer Responses<br />
            <span className="text-blue-600">Without Losing the Human Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal. 
            Simple setup, powerful results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </a>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-blue-600 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 text-lg">Powerful features to scale your customer support</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Instant Responses", desc: "AI replies in seconds, day or night. No more waiting for business hours." },
              { title: "Smart Routing", desc: "Understands customer intent and routes to the right team or knowledge base." },
              { title: "Analytics Dashboard", desc: "Track performance, identify gaps, and improve continuously." },
              { title: "Multi-language", desc: "Support customers in Chinese, English, Japanese and more." },
              { title: "Easy Integration", desc: "Connect with WeChat, WhatsApp, LINE, Feishu, and your website in minutes." },
              { title: "Cost Effective", desc: "Reduce support costs by 70% while improving response quality." },
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-gray-600 text-lg">Start free, scale as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "$0", period: "forever", desc: "Perfect for testing", features: ["100 messages/month", "1 channel", "Basic analytics"] },
              { name: "Pro", price: "$49", period: "/month", desc: "For growing businesses", features: ["5,000 messages/month", "3 channels", "AI auto-reply", "Priority support"], highlight: true },
              { name: "Enterprise", price: "Custom", period: "", desc: "For large teams", features: ["Unlimited messages", "All channels", "Custom integrations", "Dedicated support"] },
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
                <a href="#contact" className={`block text-center py-3 rounded-full font-semibold transition-colors ${plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                  {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join hundreds of businesses using ChatFlow to deliver instant, personalized customer support.
          </p>
          <a href="mailto:hello@chatflow.com" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors">
            Contact Us Today
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
  );
}
