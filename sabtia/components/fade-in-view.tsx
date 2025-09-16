"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface FadeInViewProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export function FadeInView({ children, className = "", threshold = 0.1, delay = 0 }: FadeInViewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, delay])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}
