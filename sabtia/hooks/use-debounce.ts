"use client"

import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Only re-call effect if value or delay changes

  return debouncedValue
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>()

  const debouncedCallback = ((...args: any[]) => {
    clearTimeout(debounceTimer)
    const newTimer = setTimeout(() => callback(...args), delay)
    setDebounceTimer(newTimer)
  }) as T

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  return debouncedCallback
}
