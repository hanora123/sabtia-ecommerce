"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Compass as Compare, ShoppingCart, Eye, Star, MessageCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  vendor: string
}

interface QuickActionsProps {
  product: Product
  onAddToCart: (productId: string) => void
  onAddToWishlist: (productId: string) => void
  onShare: (productId: string) => void
  onCompare: (productId: string) => void
  onQuickView: (productId: string) => void
  isInWishlist?: boolean
  isInCart?: boolean
  isInComparison?: boolean
}

export default function QuickActions({
  product,
  onAddToCart,
  onAddToWishlist,
  onShare,
  onCompare,
  onQuickView,
  isInWishlist = false,
  isInCart = false,
  isInComparison = false,
}: QuickActionsProps) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div className="relative">
      {/* Main Action Button */}
      <Button variant="outline" size="sm" onClick={() => setShowActions(!showActions)} className="relative">
        إجراءات سريعة
        {(isInWishlist || isInCart || isInComparison) && (
          <Badge
            variant="secondary"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {[isInWishlist, isInCart, isInComparison].filter(Boolean).length}
          </Badge>
        )}
      </Button>

      {/* Actions Menu */}
      {showActions && (
        <Card className="absolute top-full mt-2 right-0 z-50 w-64 shadow-lg">
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-2">
              {/* Add to Cart */}
              <Button
                variant={isInCart ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onAddToCart(product.id)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 justify-start"
              >
                <ShoppingCart className="h-4 w-4" />
                {isInCart ? "في السلة" : "أضف للسلة"}
              </Button>

              {/* Add to Wishlist */}
              <Button
                variant={isInWishlist ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onAddToWishlist(product.id)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
                {isInWishlist ? "محفوظ" : "حفظ"}
              </Button>

              {/* Quick View */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onQuickView(product.id)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Eye className="h-4 w-4" />
                عرض سريع
              </Button>

              {/* Compare */}
              <Button
                variant={isInComparison ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onCompare(product.id)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Compare className="h-4 w-4" />
                {isInComparison ? "في المقارنة" : "قارن"}
              </Button>

              {/* Share */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onShare(product.id)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 justify-start"
              >
                <Share2 className="h-4 w-4" />
                مشاركة
              </Button>

              {/* Contact Vendor */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowActions(false)}
                className="flex items-center gap-2 justify-start"
              >
                <MessageCircle className="h-4 w-4" />
                تواصل
              </Button>
            </div>

            {/* Product Info */}
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.vendor}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{product.price} ج.م</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backdrop */}
      {showActions && <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />}
    </div>
  )
}
