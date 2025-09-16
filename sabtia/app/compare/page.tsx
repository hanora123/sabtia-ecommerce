"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X, Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const sampleProducts = [
  {
    id: 1,
    name: "مفك براغي مجموعة 6 قطع",
    price: 45,
    originalPrice: 60,
    image: "/screwdriver-set-6-pieces.jpg",
    rating: 4.5,
    reviews: 23,
    vendor: "محل أحمد للأدوات",
    inStock: true,
    features: ["مقاوم للصدأ", "6 أحجام مختلفة", "مقبض مريح", "ضمان سنة"],
  },
  {
    id: 2,
    name: "مضخة مياه صغيرة",
    price: 120,
    originalPrice: 150,
    image: "/small-water-pump.jpg",
    rating: 4.2,
    reviews: 18,
    vendor: "محل السباكة الحديثة",
    inStock: true,
    features: ["قوة 100 واط", "صامتة", "موفرة للطاقة", "ضمان 6 أشهر"],
  },
  {
    id: 3,
    name: "مفتاح إنجليزي قابل للتعديل",
    price: 35,
    originalPrice: 45,
    image: "/adjustable-wrench-tool.jpg",
    rating: 4.7,
    reviews: 31,
    vendor: "محل أحمد للأدوات",
    inStock: false,
    features: ["قابل للتعديل", "مقاوم للصدأ", "مقبض مطاطي", "خفيف الوزن"],
  },
]

export default function ComparePage() {
  const [compareProducts, setCompareProducts] = useState(sampleProducts.slice(0, 2))

  const removeProduct = (id: number) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const addToCart = (productId: number) => {
    console.log("Adding to cart:", productId)
  }

  const addToWishlist = (productId: number) => {
    console.log("Adding to wishlist:", productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مقارنة المنتجات</h1>
            <p className="text-gray-600">قارن بين المنتجات لاتخاذ القرار الأفضل</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="flex items-center space-x-2 space-x-reverse bg-transparent">
              <ArrowRight className="w-4 h-4" />
              <span>العودة للمنتجات</span>
            </Button>
          </Link>
        </div>

        {compareProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">لا توجد منتجات للمقارنة</h3>
              <p className="text-gray-600 mb-6">أضف منتجات من صفحة المنتجات لبدء المقارنة</p>
              <Link href="/products">
                <Button>تصفح المنتجات</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compareProducts.map((product) => (
              <Card key={product.id} className="relative">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-4 left-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>

                <CardContent className="p-6">
                  {/* Product Image */}
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">غير متوفر</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center space-x-2 space-x-reverse mb-3">
                    <span className="text-2xl font-bold text-green-600">{product.price} ج.م</span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through">{product.originalPrice} ج.م</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 space-x-reverse mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Vendor */}
                  <p className="text-sm text-gray-600 mb-4">{product.vendor}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">المميزات:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button onClick={() => addToCart(product.id)} disabled={!product.inStock} className="w-full">
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      {product.inStock ? "أضف للسلة" : "غير متوفر"}
                    </Button>
                    <Button variant="outline" onClick={() => addToWishlist(product.id)} className="w-full">
                      <Heart className="w-4 h-4 ml-2" />
                      أضف للمفضلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
