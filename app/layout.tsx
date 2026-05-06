import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { LanguageProvider } from "./components/LanguageContext"
import LanguageSwitcher from "./components/LanguageSwitcher"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ChatFlow - AI Customer Service Platform",
  description: "Automate customer responses without losing the human touch.",
}

function LoadingSwitcher() {
  return <div style={{ position: "fixed", top: 16, right: 16, zIndex: 50 }} />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <LanguageProvider>
          <Suspense fallback={<LoadingSwitcher />}>
            <LanguageSwitcher />
          </Suspense>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}