"use client"

import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

export function AppUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true)
      })

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setUpdateAvailable(true)
              }
            })
          }
        })
      })
    }
  }, [])

  const handleUpdate = async () => {
    setIsUpdating(true)

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" })
      }
    }

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  if (!updateAvailable) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">تحديث متاح</h4>
          <p className="text-sm opacity-90">إصدار جديد من التطبيق متاح الآن</p>
        </div>
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
          {isUpdating ? "جاري التحديث..." : "تحديث"}
        </button>
      </div>
    </div>
  )
}
