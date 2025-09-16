"use client"

import type React from "react"
import { useEffect } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
  className?: string
}

export function SmoothScroll({ children, className = "" }: SmoothScrollProps) {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return (
    <div className={className} style={{ scrollBehavior: "smooth" }}>
      {children}
    </div>
  )
}
