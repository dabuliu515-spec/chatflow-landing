"use client"
import Link from "next/link"
import { useAuth } from "@/lib/AuthContext"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">ChatFlow</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            {user ? (
              <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">Dashboard</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">Login</Link>
            )}
          </div>
        </div>
      </header>
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Automate Customer Responses<br /><span className="text-blue-600">Without Losing the Human Touch</span></h1>
          <p className="text-xl text-gray-600 mb-8">ChatFlow helps businesses handle customer inquiries 24/7 with AI that feels personal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/dashboard" : "/login"} className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700">Get Started</Link>
            <a href="#features" className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:border-blue-600">Learn More</a>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 text-lg">Powerful features to scale your customer support</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Responses</h3><p className="text-gray-600">AI replies in seconds, day or night.</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Routing</h3><p className="text-gray-600">Routes to the right team or knowledge base.</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3><p className="text-gray-600">Track performance and improve continuously.</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-language</h3><p className="text-gray-600">Support Chinese, English, Japanese and more.</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Integration</h3><p className="text-gray-600">Connect WeChat, WhatsApp, LINE, Feishu in minutes.</p></div>
            <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg"><h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Effective</h3><p className="text-gray-600">Reduce support costs by 70%.</p></div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2><p className="text-gray-600 text-lg">Start free, scale as you grow</p></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white border border-gray-200"><h3 className="text-xl font-semibold mb-2">Starter</h3><div className="text-4xl font-bold mb-2"></div><p className="text-gray-500 text-sm mb-4">forever</p><ul className="space-y-2 mb-6"><li>+ 100 messages/month</li><li>+ 1 channel</li><li>+ Basic analytics</li></ul><Link href="/login" className="block text-center py-3 bg-blue-600 text-white rounded-full">Get Started</Link></div>
            <div className="p-8 rounded-2xl bg-blue-600 text-white border border-blue-600"><h3 className="text-xl font-semibold mb-2">Pro</h3><div className="text-4xl font-bold mb-2"></div><p className="text-blue-200 text-sm mb-4">/month</p><ul className="space-y-2 mb-6"><li>+ 5,000 messages/month</li><li>+ 3 channels</li><li>+ AI auto-reply</li><li>+ Priority support</li></ul><Link href="/login" className="block text-center py-3 bg-white text-blue-600 rounded-full">Get Started</Link></div>
            <div className="p-8 rounded-2xl bg-white border border-gray-200"><h3 className="text-xl font-semibold mb-2">Enterprise</h3><div className="text-4xl font-bold mb-2">Custom</div><p className="text-gray-500 text-sm mb-4">For large teams</p><ul className="space-y-2 mb-6"><li>+ Unlimited messages</li><li>+ All channels</li><li>+ Custom integrations</li><li>+ Dedicated support</li></ul><Link href="/login" className="block text-center py-3 bg-blue-600 text-white rounded-full">Contact Us</Link></div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700"><div className="max-w-3xl mx-auto text-center"><h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2><p className="text-blue-100 text-lg mb-8">Join hundreds of businesses using ChatFlow.</p><a href="mailto:hello@chatflow.com" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg">Contact Us Today</a></div></section>
      <footer className="py-8 px-6 bg-gray-900 text-gray-400"><div className="max-w-6xl mx-auto text-center"><div className="text-2xl font-bold text-white mb-4">ChatFlow</div><p className="text-sm">2024 ChatFlow.</p></div></footer>
    </div>
  )
}
