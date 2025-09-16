import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Footer from "@/components/footer"
import ChatSupport from "@/components/chat-support"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/hooks/use-auth"; // New import

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "السَبْتِيّة - سوق الكتروني",
  description: "سوق الكتروني لتجار شارع السبتية في القاهرة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${cairo.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider> {/* New wrapper */}
          <Providers>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Footer />
            <ChatSupport />
            <Analytics />
            <Toaster />
          </Providers>
        </AuthProvider> {/* New wrapper */}
      </body>
    </html>
  )
}
