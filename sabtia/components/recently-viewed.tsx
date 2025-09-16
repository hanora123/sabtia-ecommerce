"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, X, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ViewedProduct {
  id: string
  name: string
  nameAr: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  vendor: string
  vendorAr: string
  category: string
  viewedAt: Date
}

interface RecentlyViewedProps {
  maxItems?: number
  showClearAll?: boolean
  className?: string
}

export default function RecentlyViewed({ maxItems = 6, showClearAll = true, className }: RecentlyViewedProps) {
  const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([])
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl")
    loadViewedProducts()
  }, [])

  const loadViewedProducts = () => {
    try {
      const stored = localStorage.getItem("recently-viewed")
      if (stored) {
        const products = JSON.parse(stored).map((p: any) => ({
          ...p,
          viewedAt: new Date(p.viewedAt),
        }))

        // Sort by most recent first
        products.sort((a: ViewedProduct, b: ViewedProduct) => b.viewedAt.getTime() - a.viewedAt.getTime())

        setViewedProducts(products.slice(0, maxItems))
      }
    } catch (error) {
      console.error("Error loading recently viewed products:", error)
    }
  }

  const addToRecentlyViewed = (product: Omit<ViewedProduct, "viewedAt">) => {
    try {
      const stored = localStorage.getItem("recently-viewed")
      let products: ViewedProduct[] = stored ? JSON.parse(stored) : []

      // Remove if already exists
      products = products.filter((p) => p.id !== product.id)

      // Add to beginning
      products.unshift({
        ...product,
        viewedAt: new Date(),
      })

      // Keep only last 20 items
      products = products.slice(0, 20)

      localStorage.setItem("recently-viewed", JSON.stringify(products))
      setViewedProducts(products.slice(0, maxItems))
    } catch (error) {
      console.error("Error saving recently viewed product:", error)
    }
  }

  const removeFromRecentlyViewed = (productId: string) => {
    try {
      const stored = localStorage.getItem("recently-viewed")
      if (stored) {
        const products = JSON.parse(stored).filter((p: ViewedProduct) => p.id !== productId)
        localStorage.setItem("recently-viewed", JSON.stringify(products))
        setViewedProducts(products.slice(0, maxItems))
      }
    } catch (error) {
      console.error("Error removing recently viewed product:", error)
    }
  }

  const clearAllViewed = () => {
    try {
      localStorage.removeItem("recently-viewed")
      setViewedProducts([])
    } catch (error) {
      console.error("Error clearing recently viewed products:", error)
    }
  }

  const formatViewedTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return isRTL ? "الآن" : "Just now"
    } else if (diffInMinutes < 60) {
      return isRTL ? `منذ ${diffInMinutes} دقيقة` : `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return isRTL ? `منذ ${hours} ساعة` : `${hours}h ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return isRTL ? `منذ ${days} يوم` : `${days}d ago`
    }
  }

  // Expose the addToRecentlyViewed function globally for other components to use
  useEffect(() => {
    ;(window as any).addToRecentlyViewed = addToRecentlyViewed
  }, [])

  if (viewedProducts.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800">
          <Clock className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{isRTL ? "شاهدت مؤخراً" : "Recently Viewed"}</h2>
          <Badge variant="secondary" className="text-xs">
            {viewedProducts.length}
          </Badge>
        </div>

        {showClearAll && (
          <Button variant="ghost" size="sm" onClick={clearAllViewed} className="text-gray-500 hover:text-red-500">
            {isRTL ? "مسح الكل" : "Clear All"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {viewedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 w-6 h-6 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeFromRecentlyViewed(product.id)}
            >
              <X className="w-3 h-3" />
            </Button>

            <CardContent className="p-3">
              <Link href={`/products/${product.id}`}>
                <div className="relative mb-2">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={isRTL ? product.nameAr : product.name}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform duration-200"
                  />

                  <Badge className="absolute bottom-2 left-2 bg-black/60 text-white text-xs">
                    {formatViewedTime(product.viewedAt)}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-green-600 transition-colors">
                    {isRTL ? product.nameAr : product.name}
                  </h3>

                  <p className="text-xs text-gray-600">{isRTL ? product.vendorAr : product.vendor}</p>

                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-green-600">
                        {product.price} {isRTL ? "ج.م" : "EGP"}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {viewedProducts.length >= maxItems && (
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/account?tab=history">{isRTL ? "عرض كامل السجل" : "View Full History"}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
