"use client"

import { useEffect, useState } from "react"

export function CacheManager() {
  const [cacheSize, setCacheSize] = useState<number>(0)
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    if ("caches" in window) {
      calculateCacheSize()
    }
  }, [])

  const calculateCacheSize = async () => {
    try {
      const cacheNames = await caches.keys()
      let totalSize = 0

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName)
        const requests = await cache.keys()

        for (const request of requests) {
          const response = await cache.match(request)
          if (response) {
            const blob = await response.blob()
            totalSize += blob.size
          }
        }
      }

      setCacheSize(totalSize)
    } catch (error) {
      console.error("Error calculating cache size:", error)
    }
  }

  const clearCache = async () => {
    setIsClearing(true)
    try {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
      setCacheSize(0)

      // Show success message
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update()
        })
      }
    } catch (error) {
      console.error("Error clearing cache:", error)
    } finally {
      setIsClearing(false)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 بايت"
    const k = 1024
    const sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!("caches" in window)) {
    return null
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة التخزين المؤقت</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">حجم التخزين المؤقت:</span>
          <span className="font-medium text-gray-900">{formatBytes(cacheSize)}</span>
        </div>

        <button
          onClick={clearCache}
          disabled={isClearing}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-4 rounded-lg transition-colors"
        >
          {isClearing ? "جاري المسح..." : "مسح التخزين المؤقت"}
        </button>

        <p className="text-sm text-gray-500">مسح التخزين المؤقت سيحسن الأداء ولكن قد يبطئ التحميل في المرة القادمة.</p>
      </div>
    </div>
  )
}
