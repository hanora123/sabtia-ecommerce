"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling) return

    currentY.current = e.touches[0].clientY
    const distance = Math.max(0, currentY.current - startY.current)

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance, 100))
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    setIsPulling(false)

    if (pullDistance > 60) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
  }

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: false })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isPulling, pullDistance])

  return (
    <div className="relative">
      {(isPulling || isRefreshing) && (
        <div
          className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b transition-transform duration-200"
          style={{
            transform: `translateY(${Math.min(pullDistance - 60, 0)}px)`,
            opacity: pullDistance > 20 ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-center py-4">
            <RefreshCw
              className={`h-5 w-5 text-accent ${isRefreshing ? "animate-spin" : ""}`}
              style={{
                transform: `rotate(${pullDistance * 3}deg)`,
              }}
            />
            <span className="mr-2 text-sm text-muted-foreground">
              {isRefreshing ? "جاري التحديث..." : pullDistance > 60 ? "اتركه للتحديث" : "اسحب للتحديث"}
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
