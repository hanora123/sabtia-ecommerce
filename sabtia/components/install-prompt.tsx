"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-dismissed", "true")
  }

  if (!showPrompt || localStorage.getItem("pwa-dismissed")) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-2 border-accent bg-background/95 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Download className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">تثبيت التطبيق</h3>
            <p className="text-xs text-muted-foreground mt-1">احصل على تجربة أفضل مع تطبيق السَبْتِيّة</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleInstall} className="text-xs">
              تثبيت
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
