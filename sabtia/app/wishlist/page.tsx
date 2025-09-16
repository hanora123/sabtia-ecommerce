"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Eye, Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { toast } from "sonner"

export default function WishlistPage() {
  const { addToCart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
    toast.success(`${product.name} has been added to your cart.`)
  }

  const handleRemoveFromWishlist = (product: any) => {
    toggleWishlist(product)
    toast.error(`${product.name} has been removed from your wishlist.`)
  }

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0)
  const availableCount = wishlist.filter(item => item.inStock !== false).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">قائمة الأمنيات</h1>
          <p className="text-muted-foreground">المنتجات المحفوظة للشراء لاحقاً</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{wishlist.length}</div>
              <div className="text-sm text-muted-foreground">منتجات محفوظة</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{availableCount}</div>
              <div className="text-sm text-muted-foreground">متوفر حالياً</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{totalValue} ج.م</div>
              <div className="text-sm text-muted-foreground">إجمالي القيمة</div>
            </CardContent>
          </Card>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.inStock === false && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">غير متوفر</Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{item.name}</h3>
                        {/* <p className="text-sm text-muted-foreground mb-2">{item.nameEn}</p> */}

                        {/* Vendor Info */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          {/* <span>{item.vendor}</span> */}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {/* <span className="text-sm font-medium">{item.rating}</span> */}
                          </div>
                          {/* <span className="text-sm text-muted-foreground">({item.reviews} تقييم)</span> */}
                        </div>

                        {/* Added Date */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {/* <span>أُضيف {item.addedDate}</span> */}
                        </div>
                      </div>

                      {/* Remove from Wishlist */}
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleRemoveFromWishlist(item)}>
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{item.price} ج.م</span>
                        {/* {item.originalPrice > item.price && (
                          <span className="text-lg text-muted-foreground line-through">{item.originalPrice} ج.م</span>
                        )} */}
                        {/* {item.originalPrice > item.price && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            وفر {item.originalPrice - item.price} ج.م
                          </Badge>
                        )} */}
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/products/${item.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 ml-2" />
                            عرض المنتج
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          disabled={item.inStock === false}
                          className={item.inStock === false ? "opacity-50 cursor-not-allowed" : ""}
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="w-4 h-4 ml-2" />
                          {item.inStock !== false ? "أضف للسلة" : "غير متوفر"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no items) */}
        {wishlist.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">قائمة الأمنيات فارغة</h3>
              <p className="text-muted-foreground mb-6">ابدأ بإضافة المنتجات التي تعجبك لحفظها للشراء لاحقاً</p>
              <Link href="/products">
                <Button>تصفح المنتجات</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
