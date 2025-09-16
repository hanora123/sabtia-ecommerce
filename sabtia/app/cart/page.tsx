"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, MapPin, Truck, CreditCard, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "@/components/language-toggle"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("courier")
  const [paymentMethod, setPaymentMethod] = useState("cash")

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = deliveryMethod === "courier" ? 20 : 0
  const total = subtotal + deliveryFee

  const availableItems = cart.filter((item) => item.inStock !== false)
  const unavailableItems = cart.filter((item) => item.inStock === false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <a href="/" className="text-2xl font-bold text-primary">
                السَبْتِيّة
              </a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">سلة التسوق</h1>
              <span className="text-muted-foreground">{cart.length} منتج</span>
            </div>

            {cart.length === 0 ? (
              <Card className="marketplace-card">
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">سلة التسوق فارغة</h3>
                  <p className="text-muted-foreground mb-6">ابدأ التسوق واضف منتجات إلى سلتك</p>
                  <Button className="marketplace-button">
                    <a href="/products">تصفح المنتجات</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Available Items */}
                {availableItems.length > 0 && (
                  <Card className="marketplace-card">
                    <CardHeader>
                      <CardTitle className="text-lg">المنتجات المتوفرة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {availableItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.vendor}</p>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">{item.price} ج.م</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {item.originalPrice} ج.م
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Unavailable Items */}
                {unavailableItems.length > 0 && (
                  <Card className="marketplace-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-muted-foreground">المنتجات غير المتوفرة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {unavailableItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg opacity-60"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg grayscale"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.vendor}</p>
                            <Badge variant="destructive">غير متوفر</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {availableItems.length > 0 && (
            <div className="space-y-6">
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span className="font-medium">{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل:</span>
                    <span className="font-medium">{deliveryFee === 0 ? "مجاناً" : `${deliveryFee} ج.م`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-primary">{total} ج.م</span>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>طريقة التوصيل</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-2 space-x-reverse p-3 border border-border rounded-lg">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">توصيل بالكورير</div>
                            <div className="text-sm text-muted-foreground">1-2 يوم عمل - 20 ج.م</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse p-3 border border-border rounded-lg">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-secondary" />
                          <div>
                            <div className="font-medium">استلام من المحل</div>
                            <div className="text-sm text-muted-foreground">مجاناً - متاح فوراً</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>طريقة الدفع</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 space-x-reverse p-3 border-2 border-secondary rounded-lg bg-secondary/5">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Banknote className="h-5 w-5 text-secondary" />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              الدفع عند الاستلام
                              <Badge className="bg-secondary text-secondary-foreground">مُوصى به</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">ادفع نقداً عند وصول الطلب</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse p-3 border border-border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">بطاقة ائتمان</div>
                            <div className="text-sm text-muted-foreground">فيزا، ماستركارد، أو بطاقات أخرى</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Address (if courier selected) */}
              {deliveryMethod === "courier" && (
                <Card className="marketplace-card">
                  <CardHeader>
                    <CardTitle>عنوان التوصيل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="fullName">الاسم الكامل</Label>
                        <Input id="fullName" placeholder="أدخل اسمك الكامل" />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input id="phone" placeholder="01xxxxxxxxx" />
                      </div>
                      <div>
                        <Label htmlFor="address">العنوان التفصيلي</Label>
                        <Input id="address" placeholder="الشارع، المنطقة، المحافظة" />
                      </div>
                      <div>
                        <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                        <Input id="notes" placeholder="تعليمات خاصة للتوصيل" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Checkout Button */}
              <Button asChild className="w-full marketplace-button" size="lg">
                <a href="/checkout/success">إتمام الطلب - {total} ج.م</a>
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                بالمتابعة، أنت توافق على{" "}
                <a href="/terms" className="text-primary hover:underline">
                  شروط الخدمة
                </a>{" "}
                و{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  سياسة الخصوصية
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
