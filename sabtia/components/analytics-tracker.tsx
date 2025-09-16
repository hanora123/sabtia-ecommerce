"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface AnalyticsEvent {
  event: string
  page?: string
  category?: string
  action?: string
  label?: string
  value?: number
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    trackEvent({
      event: "page_view",
      page: pathname,
    })
  }, [pathname])

  const trackEvent = (eventData: AnalyticsEvent) => {
    // In production, this would send to your analytics service
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", eventData)
    }

    // Example: Send to Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventData.event, {
        page_path: eventData.page,
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
      })
    }
  }

  // Expose tracking function globally
  useEffect(() => {
    ;(window as any).trackEvent = trackEvent
  }, [])

  return null
}

// Helper hook for tracking events in components
export function useAnalytics() {
  const trackEvent = (eventData: AnalyticsEvent) => {
    if (typeof window !== "undefined" && (window as any).trackEvent) {
      ;(window as any).trackEvent(eventData)
    }
  }

  const trackProductView = (productId: string, productName: string) => {
    trackEvent({
      event: "view_item",
      category: "ecommerce",
      action: "product_view",
      label: productName,
      value: Number.parseInt(productId),
    })
  }

  const trackAddToCart = (productId: string, productName: string, price: number) => {
    trackEvent({
      event: "add_to_cart",
      category: "ecommerce",
      action: "add_to_cart",
      label: productName,
      value: price,
    })
  }

  const trackPurchase = (orderId: string, value: number) => {
    trackEvent({
      event: "purchase",
      category: "ecommerce",
      action: "purchase",
      label: orderId,
      value: value,
    })
  }

  return {
    trackEvent,
    trackProductView,
    trackAddToCart,
    trackPurchase,
  }
}
