"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  connectionType: string
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      const memory = (performance as any).memory
      const connection = (navigator as any).connection

      setMetrics({
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        memoryUsage: memory ? memory.usedJSHeapSize / 1024 / 1024 : 0,
        connectionType: connection ? connection.effectiveType : "unknown",
      })
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
    }

    return () => window.removeEventListener("load", measurePerformance)
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !metrics) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>Load: {metrics.loadTime.toFixed(2)}ms</div>
      <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
      <div>Memory: {metrics.memoryUsage.toFixed(2)}MB</div>
      <div>Connection: {metrics.connectionType}</div>
    </div>
  )
}
