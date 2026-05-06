"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      await supabase.auth.getAuthFromUrl(window.location.href)
      router.push("/dashboard")
    }
    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifying...</h1>
        <p className="text-gray-600">Please wait while we verify your email.</p>
      </div>
    </div>
  )
}