"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useLanguage } from "../components/LanguageContext"

export default function Login() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState("")

  const t = (zh: string, en: string) => lang === "zh" ? zh : en

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setMessage(t("错误：" + error.message, "Error: " + error.message))
      } else {
        setMessage(t("注册成功！请查看邮箱验证。", "Sign up successful! Please check your email to confirm."))
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setMessage(t("错误：" + error.message, "Error: " + error.message))
      } else {
        setMessage(t("登录成功！", "Login successful!"))
        window.location.href = "/"
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isSignUp ? t("注册 ChatFlow", "Sign Up for ChatFlow") : t("登录 ChatFlow", "Login to ChatFlow")}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("邮箱", "Email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("密码", "Password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? t("注册", "Sign Up") : t("登录", "Login")}
          </button>
        </form>
        
        {message && (
          <div className="mt-4 p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700">
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? (
            <p>
              {t("已有账号？", "Already have an account?")}{" "}
              <button onClick={() => setIsSignUp(false)} className="text-blue-600 hover:underline">
                {t("登录", "Login")}
              </button>
            </p>
          ) : (
            <p>
              {t("没有账号？", "Don't have an account?")}{" "}
              <button onClick={() => setIsSignUp(true)} className="text-blue-600 hover:underline">
                {t("注册", "Sign Up")}
              </button>
            </p>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
            {t("返回首页", "Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  )
}