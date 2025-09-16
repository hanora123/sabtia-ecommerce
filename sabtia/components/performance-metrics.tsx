"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
            break
          case "largest-contentful-paint":
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }))
            break
          case "first-input":
            setMetrics((prev) => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
            break
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
            }
            break
          case "navigation":
            const navEntry = entry as PerformanceNavigationTiming
            setMetrics((prev) => ({ ...prev, ttfb: navEntry.responseStart - navEntry.requestStart }))
            break
        }
      }
    })

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "first-input", "layout-shift", "navigation"] })

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  const formatMetric = (value: number | null, unit = "ms") => {
    if (value === null) return "N/A"
    return `${Math.round(value)}${unit}`
  }

  const getScoreColor = (metric: string, value: number | null) => {
    if (value === null) return "text-gray-500"

    switch (metric) {
      case "fcp":
        return value < 1800 ? "text-green-600" : value < 3000 ? "text-yellow-600" : "text-red-600"
      case "lcp":
        return value < 2500 ? "text-green-600" : value < 4000 ? "text-yellow-600" : "text-red-600"
      case "fid":
        return value < 100 ? "text-green-600" : value < 300 ? "text-yellow-600" : "text-red-600"
      case "cls":
        return value < 0.1 ? "text-green-600" : value < 0.25 ? "text-yellow-600" : "text-red-600"
      case "ttfb":
        return value < 800 ? "text-green-600" : value < 1800 ? "text-yellow-600" : "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-white/95 backdrop-blur-sm border shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">مقاييس الأداء</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>First Contentful Paint:</span>
          <span className={getScoreColor("fcp", metrics.fcp)}>{formatMetric(metrics.fcp)}</span>
        </div>
        <div className="flex justify-between">
          <span>Largest Contentful Paint:</span>
          <span className={getScoreColor("lcp", metrics.lcp)}>{formatMetric(metrics.lcp)}</span>
        </div>
        <div className="flex justify-between">
          <span>First Input Delay:</span>
          <span className={getScoreColor("fid", metrics.fid)}>{formatMetric(metrics.fid)}</span>
        </div>
        <div className="flex justify-between">
          <span>Cumulative Layout Shift:</span>
          <span className={getScoreColor("cls", metrics.cls)}>{formatMetric(metrics.cls, "")}</span>
        </div>
        <div className="flex justify-between">
          <span>Time to First Byte:</span>
          <span className={getScoreColor("ttfb", metrics.ttfb)}>{formatMetric(metrics.ttfb)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
