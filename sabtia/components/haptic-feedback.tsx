"use client"

import type React from "react"

export const hapticFeedback = {
  light: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10)
    }
  },

  medium: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(20)
    }
  },

  heavy: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([30, 10, 30])
    }
  },

  success: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  },

  error: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }
  },
}

export function HapticButton({
  children,
  onClick,
  feedback = "light",
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  feedback?: keyof typeof hapticFeedback
  [key: string]: any
}) {
  const handleClick = () => {
    hapticFeedback[feedback]()
    onClick?.()
  }

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  )
}
