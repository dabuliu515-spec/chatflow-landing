"use client"
import { useState } from "react"
import { useLanguage } from "../../components/LanguageContext"
import Link from "next/link"
interface Rule {
  id: number
  name: string
  keywords: string[]
  response: string
  enabled: boolean
}
export default function RulesPage() {
  const { lang } = useLanguage()
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, name: "欢迎语", keywords: ["你好", "hi", "hello"], response: "您好！有什么可以帮助您的？", enabled: true },
    { id: 2, name: "工作时间", keywords: ["营业时间", "什么时候开"], response: "我们的工作时间是周一至周五 9:00-18:00", enabled: true },
    { id: 3, name: "价格咨询", keywords: ["多少钱", "价格", "price"], response: "您可以访问我们的定价页面查看详细信息：/pricing", enabled: false },
  ])
  const [editingRule, setEditingRule] = useState<Rule | null>(null)
  const [showForm, setShowForm] = useState(false)
  const t = (zh: string, en: string) => lang === "zh" ? zh : en
  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }
  const deleteRule = (id: number) => {
    setRules(rules.filter(r => r.id !== id))
  }
  const saveRule = (rule: Rule) => {
    if (rule.id === 0) {
      setRules([...rules, { ...rule, id: Date.now() }])
    } else {
      setRules(rules.map(r => r.id === rule.id ? rule : r))
    }
    setShowForm(false)
    setEditingRule(null)
  }
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t("自动回复规则", "Auto Reply Rules")}</h2>
          <button 
            onClick={() => { setEditingRule({ id: 0, name: "", keywords: [], response: "", enabled: true }); setShowForm(true) }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + {t("添加规则", "Add Rule")}
          </button>
        </div>
        <div className="space-y-4">
          {rules.map(rule => (
            <div key={rule.id} className={`p-6 bg-white rounded-2xl shadow ${rule.enabled ? "" : "opacity-60"}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{rule.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${rule.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {rule.enabled ? t("已启用", "Enabled") : t("已禁用", "Disabled")}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">{t("关键词：", "Keywords:")}</span> {rule.keywords.join(", ")}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">{t("回复：", "Response:")}</span> {rule.response}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className={`px-3 py-1 rounded-full text-sm ${rule.enabled ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"}`}
                  >
                    {rule.enabled ? t("禁用", "Disable") : t("启用", "Enable")}
                  </button>
                  <button 
                    onClick={() => { setEditingRule(rule); setShowForm(true) }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                  >
                    {t("编辑", "Edit")}
                  </button>
                  <button 
                    onClick={() => deleteRule(rule.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200"
                  >
                    {t("删除", "Delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {rules.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {t("还没有规则，点击添加规则开始", "No rules yet. Click Add Rule to get started")}
            </div>
          )}
        </div>
      </main>
      {/* Modal */}
      {showForm && editingRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingRule.id === 0 ? t("添加规则", "Add Rule") : t("编辑规则", "Edit Rule")}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); saveRule(editingRule) }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("规则名称", "Rule Name")}</label>
                <input 
                  type="text" 
                  value={editingRule.name} 
                  onChange={e => setEditingRule({...editingRule, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("关键词（用逗号分隔）", "Keywords (comma separated)")}</label>
                <input 
                  type="text" 
                  value={editingRule.keywords.join(", ")} 
                  onChange={e => setEditingRule({...editingRule, keywords: e.target.value.split(",").map(k => k.trim()).filter(k => k)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("回复内容", "Response")}</label>
                <textarea 
                  value={editingRule.response} 
                  onChange={e => setEditingRule({...editingRule, response: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={editingRule.enabled}
                    onChange={e => setEditingRule({...editingRule, enabled: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{t("启用此规则", "Enable this rule")}</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setShowForm(false); setEditingRule(null) }}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {t("取消", "Cancel")}
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {t("保存", "Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}