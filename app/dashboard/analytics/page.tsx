"use client"

import { useState } from "react"
import { useLanguage } from "../../components/LanguageContext"
import Link from "next/link"

export default function AnalyticsPage() {
  const { lang } = useLanguage()
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d")

  const t = (zh: string, en: string) => lang === "zh" ? zh : en

  // Mock data
  const stats = {
    totalMessages: { zh: "总消息数", en: "Total Messages" },
    aiResponses: { zh: "AI 回复", en: "AI Responses" },
    humanHandoff: { zh: "人工接管", en: "Human Handoff" },
    satisfaction: { zh: "满意度", en: "Satisfaction" },
  }

  const mockValues = {
    totalMessages: 12453,
    aiResponses: 9876,
    humanHandoff: 2577,
    satisfaction: 94.2,
  }

  const weeklyData = [
    { day: t("周一", "Mon"), messages: 1200 },
    { day: t("周二", "Tue"), messages: 1500 },
    { day: t("周三", "Wed"), messages: 1800 },
    { day: t("周四", "Thu"), messages: 1400 },
    { day: t("周五", "Fri"), messages: 2200 },
    { day: t("周六", "Sat"), messages: 2800 },
    { day: t("周日", "Sun"), messages: 2553 },
  ]

  const maxMessages = Math.max(...weeklyData.map(d => d.messages))

  const channelData = [
    { name: t("微信", "WeChat"), count: 4500, color: "bg-green-500" },
    { name: t("飞书", "Feishu"), count: 3200, color: "bg-blue-500" },
    { name: t("WhatsApp", "WhatsApp"), count: 2800, color: "bg-green-600" },
    { name: t("网站", "Website"), count: 1953, color: "bg-blue-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">ChatFlow</h1>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              ← {t("返回控制台", "Back to Dashboard")}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t("数据分析", "Analytics")}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setPeriod("7d")}
              className={`px-4 py-2 rounded-lg ${period === "7d" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
            >
              7{t("天", "d")}
            </button>
            <button 
              onClick={() => setPeriod("30d")}
              className={`px-4 py-2 rounded-lg ${period === "30d" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
            >
              30{t("天", "d")}
            </button>
            <button 
              onClick={() => setPeriod("90d")}
              className={`px-4 py-2 rounded-lg ${period === "90d" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}
            >
              90{t("天", "d")}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="text-sm text-gray-500 mb-1">{stats.totalMessages.zh}</p>
            <p className="text-3xl font-bold text-gray-900">{mockValues.totalMessages.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="text-sm text-gray-500 mb-1">{stats.aiResponses.zh}</p>
            <p className="text-3xl font-bold text-blue-600">{mockValues.aiResponses.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="text-sm text-gray-500 mb-1">{stats.humanHandoff.zh}</p>
            <p className="text-3xl font-bold text-orange-500">{mockValues.humanHandoff.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="text-sm text-gray-500 mb-1">{stats.satisfaction.zh}</p>
            <p className="text-3xl font-bold text-green-600">{mockValues.satisfaction}%</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{t("每周消息趋势", "Weekly Message Trend")}</h3>
          <div className="flex items-end justify-between gap-4 h-64">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-100 rounded-t-lg relative" style={{ height: `${(d.messages / maxMessages) * 200}px` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg" style={{ height: `${(d.messages / maxMessages) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500 mt-2">{d.day}</span>
                <span className="text-xs text-gray-400">{d.messages}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{t("渠道分布", "Channel Distribution")}</h3>
          <div className="space-y-4">
            {channelData.map((ch, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-20 text-sm text-gray-600">{ch.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                  <div 
                    className={`${ch.color} rounded-full h-8 flex items-center justify-end pr-3`}
                    style={{ width: `${(ch.count / 4500) * 100}%` }}
                  >
                    <span className="text-white text-sm font-medium">{ch.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}