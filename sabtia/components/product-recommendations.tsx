"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, TrendingUp, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
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
  isNew?: boolean
  isTrending?: boolean
}

interface ProductRecommendationsProps {
  currentProductId?: string
  userId?: string
  category?: string
  type?: "similar" | "trending" | "recommended" | "recently-viewed"
  title?: string
  titleAr?: string
  maxItems?: number
}

export default function ProductRecommendations({
  currentProductId,
  userId,
  category,
  type = "recommended",
  title,
  titleAr,
  maxItems = 6,
}: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isRTL, setIsRTL] = useState(false)

  // Mock data - in real app, this would come from API
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Professional Screwdriver Set",
      nameAr: "طقم مفكات احترافي",
      price: 45,
      originalPrice: 60,
      image: "/screwdriver-set-6-pieces.jpg",
      rating: 4.8,
      reviews: 124,
      vendor: "Ahmed Tools",
      vendorAr: "أدوات أحمد",
      category: "tools",
      isTrending: true,
    },
    {
      id: "2",
      name: "Premium Cotton Fabric",
      nameAr: "قماش قطني فاخر",
      price: 25,
      image: "/blue-cotton-fabric.jpg",
      rating: 4.6,
      reviews: 89,
      vendor: "Fatma Textiles",
      vendorAr: "منسوجات فاطمة",
      category: "fabrics",
      isNew: true,
    },
    {
      id: "3",
      name: "Water Pump Motor",
      nameAr: "موتور مضخة مياه",
      price: 120,
      originalPrice: 150,
      image: "/small-water-pump.jpg",
      rating: 4.7,
      reviews: 67,
      vendor: "Hassan Electronics",
      vendorAr: "إلكترونيات حسان",
      category: "electronics",
    },
    {
      id: "4",
      name: "USB Cable 2 Meters",
      nameAr: "كابل يو إس بي ٢ متر",
      price: 15,
      image: "/usb-cable-2-meters.jpg",
      rating: 4.5,
      reviews: 156,
      vendor: "Tech Corner",
      vendorAr: "ركن التكنولوجيا",
      category: "electronics",
      isTrending: true,
    },
    {
      id: "5",
      name: "Red Silk Fabric",
      nameAr: "قماش حرير أحمر",
      price: 80,
      image: "/red-silk-fabric.jpg",
      rating: 4.9,
      reviews: 43,
      vendor: "Luxury Fabrics",
      vendorAr: "أقمشة فاخرة",
      category: "fabrics",
      isNew: true,
    },
    {
      id: "6",
      name: "Adjustable Wrench",
      nameAr: "مفتاح ربط قابل للتعديل",
      price: 35,
      image: "/adjustable-wrench-tool.jpg",
      rating: 4.4,
      reviews: 92,
      vendor: "Pro Tools",
      vendorAr: "أدوات محترفة",
      category: "tools",
    },
  ]

  useEffect(() => {
    // Check RTL
    setIsRTL(document.documentElement.dir === "rtl")

    // Simulate API call
    const fetchRecommendations = async () => {
      setLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let filteredProducts = [...mockProducts]

      // Filter based on type
      switch (type) {
        case "similar":
          if (category) {
            filteredProducts = filteredProducts.filter((p) => p.category === category && p.id !== currentProductId)
          }
          break
        case "trending":
          filteredProducts = filteredProducts.filter((p) => p.isTrending)
          break
        case "recently-viewed":
          // In real app, get from localStorage or user history
          filteredProducts = filteredProducts.slice(0, 4)
          break
        default:
          // Mix of trending and category-based recommendations
          break
      }

      // Limit results
      filteredProducts = filteredProducts.slice(0, maxItems)

      setProducts(filteredProducts)
      setLoading(false)
    }

    fetchRecommendations()
  }, [currentProductId, category, type, maxItems])

  const getTitle = () => {
    if (title || titleAr) {
      return isRTL ? titleAr || title : title || titleAr
    }

    const titles = {
      similar: isRTL ? "منتجات مشابهة" : "Similar Products",
      trending: isRTL ? "المنتجات الرائجة" : "Trending Products",
      recommended: isRTL ? "منتجات مقترحة لك" : "Recommended for You",
      "recently-viewed": isRTL ? "شاهدت مؤخراً" : "Recently Viewed",
    }

    return titles[type]
  }

  const getIcon = () => {
    const icons = {
      similar: <Users className="w-5 h-5" />,
      trending: <TrendingUp className="w-5 h-5" />,
      recommended: <Star className="w-5 h-5" />,
      "recently-viewed": <Clock className="w-5 h-5" />,
    }

    return icons[type]
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: maxItems }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-3">
                <div className="w-full h-32 bg-gray-200 rounded mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded mb-1" />
                <div className="w-2/3 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-1/2 h-5 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-800">
        {getIcon()}
        <h2 className="text-lg font-semibold">{getTitle()}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
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

                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                      {isRTL ? "جديد" : "New"}
                    </Badge>
                  )}

                  {product.isTrending && (
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {isRTL ? "رائج" : "Hot"}
                    </Badge>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
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

      {products.length >= maxItems && (
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href={`/products?category=${category}&type=${type}`}>{isRTL ? "عرض المزيد" : "View More"}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
