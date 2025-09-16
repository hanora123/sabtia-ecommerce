"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    if (media.addEventListener) {
      media.addEventListener("change", listener)
    } else {
      // Fallback for older browsers
      media.addListener(listener)
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener)
      } else {
        // Fallback for older browsers
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery("(max-width: 768px)")
export const useIsTablet = () => useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)")
export const useIsLargeScreen = () => useMediaQuery("(min-width: 1440px)")

// RTL detection hook
export const useIsRTL = () => {
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const direction = document.documentElement.dir || document.body.dir
    setIsRTL(direction === "rtl")
  }, [])

  return isRTL
}

// Dark mode detection hook
export const usePrefersDarkMode = () => useMediaQuery("(prefers-color-scheme: dark)")

// Reduced motion detection hook
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")
