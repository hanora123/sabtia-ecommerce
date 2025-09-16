"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOffline(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOffline(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check initial state
    setIsOnline(navigator.onLine)
    if (!navigator.onLine) {
      setShowOffline(true)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showOffline) return null

  return (
    <Card className="fixed top-4 left-4 right-4 z-50 border-2 border-destructive bg-destructive/10 backdrop-blur-sm">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <WifiOff className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">لا يوجد اتصال بالإنترنت</p>
            <p className="text-xs text-destructive/80">بعض الميزات قد لا تعمل بشكل صحيح</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
