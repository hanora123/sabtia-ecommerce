"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Gift, Percent } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  vendor: string
  image: string
  available: boolean
}

interface CartSummaryProps {
  items: CartItem[]
  onCheckout: () => void
  onApplyCoupon: (code: string) => void
  discount?: number
  deliveryFee?: number
}

export default function CartSummary({
  items,
  onCheckout,
  onApplyCoupon,
  discount = 0,
  deliveryFee = 25,
}: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount + deliveryFee

  const availableItems = items.filter((item) => item.available)
  const unavailableItems = items.filter((item) => !item.available)

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          ملخص الطلب
          <Badge variant="secondary">{items.length} منتج</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Available Items Summary */}
        {availableItems.length > 0 && (
          <div>
            <h4 className="font-medium text-green-600 mb-2">المنتجات المتاحة ({availableItems.length})</h4>
            <div className="space-y-2">
              {availableItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.price * item.quantity} ج.م</span>
                </div>
              ))}
              {availableItems.length > 3 && (
                <div className="text-sm text-muted-foreground">و {availableItems.length - 3} منتجات أخرى...</div>
              )}
            </div>
          </div>
        )}

        {/* Unavailable Items Warning */}
        {unavailableItems.length > 0 && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-600 mb-1">منتجات غير متاحة ({unavailableItems.length})</h4>
            <p className="text-sm text-red-600">هذه المنتجات لن تكون مشمولة في الطلب</p>
          </div>
        )}

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>المجموع الفرعي</span>
            <span>{subtotal.toFixed(2)} ج.م</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center gap-1">
                <Percent className="h-4 w-4" />
                خصم ({discount}%)
              </span>
              <span>-{discountAmount.toFixed(2)} ج.م</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              رسوم التوصيل
            </span>
            <span>{deliveryFee} ج.م</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>الإجمالي</span>
            <span>{total.toFixed(2)} ج.م</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="كود الخصم"
              className="flex-1 px-3 py-2 border rounded-md text-sm"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onApplyCoupon((e.target as HTMLInputElement).value)
                }
              }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const input = document.querySelector('input[placeholder="كود الخصم"]') as HTMLInputElement
                if (input?.value) {
                  onApplyCoupon(input.value)
                }
              }}
            >
              تطبيق
            </Button>
          </div>
        </div>

        {/* Checkout Button */}
        <Button onClick={onCheckout} className="w-full" size="lg" disabled={availableItems.length === 0}>
          {availableItems.length === 0 ? "لا توجد منتجات متاحة" : "إتمام الطلب"}
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1">
            <Gift className="h-3 w-3" />
            توصيل مجاني للطلبات أكثر من 200 ج.م
          </div>
          <div>الدفع عند الاستلام متاح</div>
        </div>
      </CardContent>
    </Card>
  )
}
