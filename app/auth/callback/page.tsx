"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get code from URL
      const code = searchParams.get("code")
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.push("/dashboard")
          return
        }
      }
      // Fallback: go to home
      router.push("/")
    }
    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifying...</h1>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  )
}