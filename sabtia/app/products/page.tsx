"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { LanguageToggle } from "@/components/language-toggle"
import AdvancedFilters from "@/components/advanced-filters"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { toast } from "sonner"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name_ar, price: product.price, image: product.images?.[0] || '' }, 1)
    toast.success(`${product.name_ar} has been added to your cart.`)
  }

  const handleToggleWishlist = (product: any) => {
    toggleWishlist({ id: product.id, name: product.name_ar, price: product.price, image: product.images?.[0] || '' })
    toast.info(isInWishlist(product.id) ? `${product.name_ar} removed from wishlist.` : `${product.name_ar} added to wishlist.`)
  }

  const categories = ["الكل", "أدوات", "أقمشة", "سباكة", "إلكترونيات", "أجهزة منزلية"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl font-bold text-primary">
                السَبْتِيّة
              </a>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input placeholder="ابحث في المنتجات..." className="pl-12 pr-4 py-3 text-lg" />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card className="marketplace-card">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  تصفية النتائج
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Advanced Filters */}
                <AdvancedFilters />

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">الأقسام</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">نطاق السعر</h4>
                  <div className="space-y-3">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]} ج.م</span>
                      <span>{priceRange[1]} ج.م</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-3">التقييم</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm cursor-pointer">
                          <div className="flex">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span>فأكثر</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-medium mb-3">التوفر</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox id="in-stock" />
                      <label htmlFor="in-stock" className="text-sm cursor-pointer">
                        متوفر
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox id="out-of-stock" />
                      <label htmlFor="out-of-stock" className="text-sm cursor-pointer">
                        غير متوفر
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">جميع المنتجات</h1>
                <p className="text-muted-foreground">عرض {products.length} منتج</p>
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                    <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`marketplace-card group cursor-pointer ${viewMode === "list" ? "flex flex-row" : ""}`}
                >
                  <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <div className="relative">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name_ar}
                        className={`object-cover ${
                          viewMode === "list" ? "w-full h-32 rounded-l-lg" : "w-full h-48 rounded-t-lg"
                        }`}
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
                          {product.badge}
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="absolute top-2 left-2 bg-white/80 hover:bg-white" onClick={() => handleToggleWishlist(product)}>
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      {!product.stock_quantity && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="destructive">غير متوفر</Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <div className="flex-1">
                    <CardContent className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{product.name_ar}</h4>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.total_reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">{product.price} ج.م</span>
                        {product.original_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.original_price} ج.م
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex gap-2 w-full">
                        <Button className="flex-1 marketplace-button-secondary" disabled={!product.stock_quantity} onClick={() => handleAddToCart(product)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          أضف للسلة
                        </Button>
                        <Link href={`/products/${product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            عرض
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  السابق
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">التالي</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
