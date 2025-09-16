"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Grid3X3, List, Filter, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { toast } from "sonner"

// Mock data for categories
const categories = {
  tools: {
    name: "أدوات",
    nameEn: "Tools",
    description: "جميع أنواع الأدوات والعدد اليدوية والكهربائية",
    descriptionEn: "All types of manual and electric tools",
    products: [
      {
        id: 1,
        name: "مفك براغي مجموعة 6 قطع",
        nameEn: "Screwdriver Set 6 Pieces",
        price: 45,
        originalPrice: 60,
        image: "/screwdriver-set-6-pieces.jpg",
        rating: 4.5,
        reviews: 23,
        vendor: "محل أحمد للأدوات",
        vendorEn: "Ahmed Tools Shop",
        vendorId: 1,
        location: "السبتية، القاهرة",
        inStock: true,
        discount: 25,
      },
      {
        id: 2,
        name: "مفتاح إنجليزي قابل للتعديل",
        nameEn: "Adjustable Wrench Tool",
        price: 35,
        image: "/adjustable-wrench-tool.jpg",
        rating: 4.2,
        reviews: 18,
        vendor: "محل أحمد للأدوات",
        vendorEn: "Ahmed Tools Shop",
        vendorId: 1,
        location: "السبتية، القاهرة",
        inStock: true,
      },
    ],
  },
  fabrics: {
    name: "أقمشة",
    nameEn: "Fabrics",
    description: "أقمشة عالية الجودة بألوان وأنواع متنوعة",
    descriptionEn: "High quality fabrics in various colors and types",
    products: [
      {
        id: 3,
        name: "قماش قطني أزرق - المتر",
        nameEn: "Blue Cotton Fabric - Per Meter",
        price: 25,
        image: "/blue-cotton-fabric.jpg",
        rating: 4.7,
        reviews: 34,
        vendor: "محل فاطمة للأقمشة",
        vendorEn: "Fatma Fabrics Shop",
        vendorId: 2,
        location: "السبتية، القاهرة",
        inStock: true,
      },
      {
        id: 4,
        name: "قماش حرير أحمر - المتر",
        nameEn: "Red Silk Fabric - Per Meter",
        price: 85,
        image: "/red-silk-fabric.jpg",
        rating: 4.8,
        reviews: 12,
        vendor: "محل فاطمة للأقمشة",
        vendorEn: "Fatma Fabrics Shop",
        vendorId: 2,
        location: "السبتية، القاهرة",
        inStock: false,
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories[params.slug as keyof typeof categories]
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
    toast.success(`${product.name} has been added to your cart.`)
  }

  const handleToggleWishlist = (product: any) => {
    toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })
    toast.info(isInWishlist(product.id) ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist.`)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">القسم غير موجود</h1>
          <p className="text-muted-foreground mb-6">عذراً، القسم المطلوب غير متوفر</p>
          <Link href="/">
            <Button>العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="bg-gradient-to-l from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">{category.name}</h1>
            <p className="text-muted-foreground text-lg mb-4">{category.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{category.products.length} منتج</span>
              <span>•</span>
              <span>متوفر للتوصيل</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  تصفية النتائج
                </h3>

                {/* Price Range */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">نطاق السعر</label>
                  <Slider defaultValue={[0, 100]} max={200} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 ج.م</span>
                    <span>200 ج.م</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">التوفر</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" defaultChecked />
                      متوفر الآن
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      غير متوفر
                    </label>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">التقييم</label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span>فأكثر</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Select defaultValue="popular">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">الأكثر شعبية</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                    <SelectItem value="newest">الأحدث</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount && (
                            <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge variant="secondary">غير متوفر</Badge>
                            </div>
                          )}
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => handleToggleWishlist(product)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">{product.name}</h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>

                      <Link href={`/vendors/${product.vendorId}`} className="block mb-2">
                        <p className="text-xs text-muted-foreground hover:text-primary">{product.vendor}</p>
                      </Link>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{product.price} ج.م</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {product.originalPrice} ج.م
                            </span>
                          )}
                        </div>

                        <Button size="sm" disabled={!product.inStock} className="h-8" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart className="h-3 w-3 ml-1" />
                          إضافة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                تحميل المزيد من المنتجات
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
