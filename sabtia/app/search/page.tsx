"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Star, MapPin, Package, Store, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("all")

  const searchResults = {
    products: [
      {
        id: 1,
        name: "مفك براغي 6 قطع",
        price: 45,
        originalPrice: 60,
        image: "/screwdriver-set-6-pieces.jpg",
        vendor: "محل أدوات الحاج محمد",
        rating: 4.5,
        reviews: 23,
        location: "شارع السبتية",
        inStock: true,
        category: "أدوات",
      },
      {
        id: 2,
        name: "قماش قطني أزرق",
        price: 25,
        image: "/blue-cotton-fabric.jpg",
        vendor: "أقمشة السيدة فاطمة",
        rating: 4.8,
        reviews: 45,
        location: "شارع السبتية",
        inStock: true,
        category: "أقمشة",
        unit: "متر",
      },
      {
        id: 3,
        name: "مضخة مياه صغيرة",
        price: 120,
        image: "/small-water-pump.jpg",
        vendor: "أدوات السباكة - حسن",
        rating: 4.2,
        reviews: 18,
        location: "شارع السبتية",
        inStock: false,
        category: "أدوات",
      },
    ],
    vendors: [
      {
        id: 1,
        name: "محل أدوات الحاج محمد",
        owner: "محمد أحمد",
        image: "/tools-shop-owner.jpg",
        rating: 4.6,
        reviews: 89,
        products: 45,
        location: "شارع السبتية، القاهرة",
        category: "أدوات",
        verified: true,
      },
      {
        id: 2,
        name: "أقمشة السيدة فاطمة",
        owner: "فاطمة علي",
        image: "/fabric-shop-owner-woman.jpg",
        rating: 4.8,
        reviews: 156,
        products: 78,
        location: "شارع السبتية، القاهرة",
        category: "أقمشة",
        verified: true,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="ابحث عن المنتجات والتجار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-12 text-lg"
              />
            </div>
            <Button size="lg" className="px-8">
              بحث
            </Button>
          </div>

          {/* Search Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="tools">أدوات</SelectItem>
                <SelectItem value="fabrics">أقمشة</SelectItem>
                <SelectItem value="electronics">إلكترونيات</SelectItem>
                <SelectItem value="plumbing">سباكة</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نطاق السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأسعار</SelectItem>
                <SelectItem value="0-50">0 - 50 ج.م</SelectItem>
                <SelectItem value="50-100">50 - 100 ج.م</SelectItem>
                <SelectItem value="100-200">100 - 200 ج.م</SelectItem>
                <SelectItem value="200+">200+ ج.م</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="التقييم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التقييمات</SelectItem>
                <SelectItem value="4+">4+ نجوم</SelectItem>
                <SelectItem value="3+">3+ نجوم</SelectItem>
                <SelectItem value="2+">2+ نجوم</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              المزيد من الفلاتر
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">الكل (156)</TabsTrigger>
              <TabsTrigger value="products">المنتجات (134)</TabsTrigger>
              <TabsTrigger value="vendors">التجار (22)</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">الأكثر صلة</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                  <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                  <SelectItem value="newest">الأحدث</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="space-y-8">
            {/* Products Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">المنتجات</h2>
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
              >
                {searchResults.products.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className={`${viewMode === "list" ? "flex gap-4" : ""}`}>
                        <div
                          className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square mb-4"}`}
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white font-medium">نفد المخزون</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>

                          <Link
                            href={`/vendors/${product.vendor}`}
                            className="text-sm text-muted-foreground hover:text-primary mb-2 block"
                          >
                            {product.vendor}
                          </Link>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium mr-1">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{product.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                {product.price} ج.م{product.unit && `/${product.unit}`}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {product.originalPrice} ج.م
                                </span>
                              )}
                            </div>
                            <Button size="sm" disabled={!product.inStock}>
                              {product.inStock ? "أضف للسلة" : "نفد المخزون"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Vendors Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">التجار</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.vendors.map((vendor) => (
                  <Card key={vendor.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
                          <AvatarFallback>{vendor.name.split(" ")[0][0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {vendor.name}
                            </h3>
                            {vendor.verified && (
                              <Badge variant="default" className="text-xs">
                                موثق
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{vendor.owner}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium mr-1">{vendor.rating}</span>
                          <span className="text-sm text-muted-foreground">({vendor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{vendor.products} منتج</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{vendor.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{vendor.category}</Badge>
                        <Link href={`/vendors/${vendor.id}`}>
                          <Button size="sm">
                            <Store className="h-4 w-4 ml-1" />
                            زيارة المتجر
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {searchResults.products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className={`${viewMode === "list" ? "flex gap-4" : ""}`}>
                      <div
                        className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square mb-4"}`}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white font-medium">نفد المخزون</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        <Link
                          href={`/vendors/${product.vendor}`}
                          className="text-sm text-muted-foreground hover:text-primary mb-2 block"
                        >
                          {product.vendor}
                        </Link>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium mr-1">{product.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{product.location}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              {product.price} ج.م{product.unit && `/${product.unit}`}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice} ج.م
                              </span>
                            )}
                          </div>
                          <Button size="sm" disabled={!product.inStock}>
                            {product.inStock ? "أضف للسلة" : "نفد المخزون"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.vendors.map((vendor) => (
                <Card key={vendor.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
                        <AvatarFallback>{vendor.name.split(" ")[0][0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {vendor.name}
                          </h3>
                          {vendor.verified && (
                            <Badge variant="default" className="text-xs">
                              موثق
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{vendor.owner}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium mr-1">{vendor.rating}</span>
                        <span className="text-sm text-muted-foreground">({vendor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{vendor.products} منتج</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{vendor.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{vendor.category}</Badge>
                      <Link href={`/vendors/${vendor.id}`}>
                        <Button size="sm">
                          <Store className="h-4 w-4 ml-1" />
                          زيارة المتجر
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            تحميل المزيد من النتائج
          </Button>
        </div>
      </div>
    </div>
  )
}
