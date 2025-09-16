"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<string>("")

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Get connection info if available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      setConnectionType(connection.effectiveType || "")

      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || "")
      }

      connection.addEventListener("change", handleConnectionChange)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
        connection.removeEventListener("change", handleConnectionChange)
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <Wifi className="w-4 h-4" />
        <span>متصل</span>
        {connectionType && <span className="text-gray-500">({connectionType})</span>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-red-600 text-sm">
      <WifiOff className="w-4 h-4" />
      <span>غير متصل</span>
    </div>
  )
}
