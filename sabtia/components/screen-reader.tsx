"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScreenReaderProps {
  message: string
  priority?: "polite" | "assertive"
  children?: React.ReactNode
}

export function ScreenReader({ message, priority = "polite", children }: ScreenReaderProps) {
  const ariaLiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (message && ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message
    }
  }, [message])

  return (
    <>
      <div ref={ariaLiveRef} aria-live={priority} aria-atomic="true" className="sr-only" role="status" />
      {children}
    </>
  )
}

// Hook for announcing messages to screen readers
export function useScreenReader() {
  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", priority)
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return { announce }
}
