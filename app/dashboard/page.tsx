"use client"
import { useState } from "react"
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
  { id: "wechat", name: "WeChat", nameZh: "WeChat", nameEn: "WeChat", icon: "?", connected: false },
  { id: "feishu", name: "Feishu", nameZh: "Feishu", nameEn: "Feishu", icon: "?", connected: false },
  { id: "whatsapp", name: "WhatsApp", nameZh: "WhatsApp", nameEn: "WhatsApp", icon: "?", connected: false },
  { id: "website", name: "Website", nameZh: "Website", nameEn: "Website", icon: "?", connected: false },
]

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const { lang } = useLanguage()
  const [showChannelModal, setShowChannelModal] = useState(false)
  const [channels, setChannels] = useState<Channel[]>(defaultChannels.map(ch => ({ ...ch })))

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const connectChannel = async (channelId: string) => {
    if (!user) return
    const { error } = await supabase
      .from("channels")
      .insert({ user_id: user.id, channel_type: channelId, connected: true })
    if (!error) {
      setChannels(channels.map(ch => ch.id === channelId ? { ...ch, connected: true } : ch))
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please login first</h1>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Login</Link>
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome to your dashboard!</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Channels</h3>
            <p className="text-gray-600 mb-4">{connectedCount}/{channels.length} connected</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {channels.filter(ch => ch.connected).map(ch => (
                <span key={ch.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                  {ch.icon} {getChannelName(ch)}
                  <button onClick={() => disconnectChannel(ch.id)} className="ml-1 hover:text-red-600">x</button>
                </span>
              ))}
              {connectedCount === 0 && <span className="text-gray-400 text-sm">No channels connected</span>}
            </div>
            <button onClick={() => setShowChannelModal(true)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Channel</button>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Replies</h3>
            <p className="text-gray-600 mb-4">Configure your AI responses</p>
            <Link href="/dashboard/rules" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Manage Rules</Link>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 mb-4">Track your performance</p>
            <Link href="/dashboard/analytics" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Stats</Link>
          </div>
        </div>
      </main>
      {showChannelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Channel</h3>
              <button onClick={() => setShowChannelModal(false)} className="text-gray-400 hover:text-gray-600">x</button>
            </div>
            <div className="space-y-3">
              {channels.map(ch => (
                <button key={ch.id} onClick={() => connectChannel(ch.id)} disabled={ch.connected}
                  className={"w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all " + (ch.connected ? "border-gray-200 bg-gray-50 opacity-60" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50")}>
                  <span className="text-3xl">{ch.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900">{getChannelName(ch)}</div>
                    <div className="text-sm text-gray-500">{ch.connected ? "Connected" : "Click to connect"}</div>
                  </div>
                  {ch.connected && <span className="text-green-500">v</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setShowChannelModal(false)} className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
