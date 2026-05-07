"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useAuth } from "@/lib/AuthContext"
import { useLanguage } from "../components/LanguageContext"

interface Channel {
  id: string
  name: string
  nameZh: string
  nameEn: string
  icon: string
  connected: boolean
}

const defaultChannels: Channel[] = [
  { id: "wechat", name: "WeChat", nameZh: "WeChat", nameEn: "WeChat", icon: "W", connected: false },
  { id: "feishu", name: "Feishu", nameZh: "Feishu", nameEn: "Feishu", icon: "F", connected: false },
  { id: "whatsapp", name: "WhatsApp", nameZh: "WhatsApp", nameEn: "WhatsApp", icon: "A", connected: false },
  { id: "website", name: "Website", nameZh: "Website", nameEn: "Website", icon: "S", connected: false },
]

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const { lang } = useLanguage()
  const [showChannelModal, setShowChannelModal] = useState(false)
  const [channels, setChannels] = useState<Channel[]>(defaultChannels.map(ch => ({ ...ch })))

  useEffect(() => {
    if (user) {
      loadChannels(user.id)
    }
  }, [user])

  const loadChannels = async (userId: string) => {
    const { data } = await supabase.from("channels").select("*").eq("user_id", userId)
    if (data && data.length > 0) {
      const connectedIds = data.map(d => d.channel_type)
      setChannels(defaultChannels.map(ch => ({ ...ch, connected: connectedIds.includes(ch.id) })))
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const connectChannel = async (channelId: string) => {
    if (!user) return
    await supabase.from("channels").insert({ user_id: user.id, channel_type: channelId, connected: true })
    setChannels(channels.map(ch => ch.id === channelId ? { ...ch, connected: true } : ch))
    setShowChannelModal(false)
  }

  const disconnectChannel = async (channelId: string) => {
    if (!user) return
    await supabase.from("channels").delete().eq("user_id", user.id).eq("channel_type", channelId)
    setChannels(channels.map(ch => ch.id === channelId ? { ...ch, connected: false } : ch))
  }

  const t = (zh: string, en: string) => lang === "zh" ? zh : en
  const getChannelName = (ch: Channel) => lang === "zh" ? ch.nameZh : ch.name

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div>Loading...</div></div>
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("请先登录", "Please login first")}</h1>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("登录", "Login")}</Link>
        </div>
      </div>
    )
  }

  const connectedCount = channels.filter(ch => ch.connected).length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">ChatFlow</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <Link href="/" className="text-gray-600 hover:text-blue-600">{t("首页", "Home")}</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">{t("退出", "Logout")}</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("欢迎来到控制台！", "Welcome to your dashboard!")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("渠道", "Channels")}</h3>
            <p className="text-gray-600 mb-4">{connectedCount}/{channels.length} {t("已连接", "connected")}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {channels.filter(ch => ch.connected).map(ch => (
                <span key={ch.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                  {ch.icon} {getChannelName(ch)}
                  <button onClick={() => disconnectChannel(ch.id)} className="ml-1 hover:text-red-600">x</button>
                </span>
              ))}
              {connectedCount === 0 && <span className="text-gray-400 text-sm">{t("未连接任何渠道", "No channels connected")}</span>}
            </div>
            <button onClick={() => setShowChannelModal(true)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("添加渠道", "Add Channel")}</button>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("自动回复", "Auto Replies")}</h3>
            <p className="text-gray-600 mb-4">{t("配置您的AI回复规则", "Configure your AI responses")}</p>
            <Link href="/dashboard/rules" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("管理规则", "Manage Rules")}</Link>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("数据分析", "Analytics")}</h3>
            <p className="text-gray-600 mb-4">{t("追踪绩效表现", "Track your performance")}</p>
            <Link href="/dashboard/analytics" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("查看数据", "View Stats")}</Link>
          </div>
        </div>
      </main>
      {showChannelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">{t("添加渠道", "Add Channel")}</h3>
              <button onClick={() => setShowChannelModal(false)} className="text-gray-400 hover:text-gray-600">x</button>
            </div>
            <div className="space-y-3">
              {channels.map(ch => (
                <button key={ch.id} onClick={() => connectChannel(ch.id)} disabled={ch.connected}
                  className={"w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all " + (ch.connected ? "border-gray-200 bg-gray-50 opacity-60" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50")}>
                  <span className="text-3xl">{ch.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900">{getChannelName(ch)}</div>
                    <div className="text-sm text-gray-500">{ch.connected ? t("已连接", "Connected") : t("点击连接", "Click to connect")}</div>
                  </div>
                  {ch.connected && <span className="text-green-500">v</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setShowChannelModal(false)} className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">{t("关闭", "Close")}</button>
          </div>
        </div>
      )}
    </div>
  )
}
