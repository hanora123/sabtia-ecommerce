"use client"

import { CheckCircle, Package, MapPin, Phone, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LanguageToggle } from "@/components/language-toggle"

export default function CheckoutSuccessPage() {
  // Mock order data - in real app, get from URL params or API
  const order = {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "confirmed",
    total: 190,
    deliveryMethod: "courier",
    paymentMethod: "cash",
    estimatedDelivery: "2024-01-17",
    items: [
      {
        id: 1,
        name: "مفتاح إنجليزي مقاس 12",
        price: 85,
        quantity: 2,
        vendor: "محل أحمد للأدوات",
        image: "/adjustable-wrench-tool.jpg",
      },
      {
        id: 2,
        name: "قماش قطني أزرق",
        price: 45,
        quantity: 1,
        vendor: "متجر النسيج الذهبي",
        image: "/blue-cotton-fabric.jpg",
      },
    ],
    deliveryAddress: {
      name: "أحمد محمد",
      phone: "+20 123 456 789",
      address: "شارع النيل، المعادي، القاهرة",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <a href="/" className="text-2xl font-bold text-primary">
                السَبْتِيّة
              </a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Success Message */}
          <Card className="marketplace-card text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-secondary mb-2">تم تأكيد طلبك بنجاح!</h1>
              <p className="text-muted-foreground mb-6">
                شكراً لك على ثقتك في السبتية. سيتم التواصل معك قريباً لتأكيد التوصيل.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>رقم الطلب: {order.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>تاريخ الطلب: {order.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="marketplace-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>تفاصيل الطلب</span>
                <Badge className="bg-secondary text-secondary-foreground">مؤكد</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.vendor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium">{item.price} ج.م</span>
                      <span className="text-sm text-muted-foreground">× {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary">{item.price * item.quantity} ج.م</span>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-medium">170 ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span className="font-medium">20 ج.م</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-primary">{order.total} ج.م</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="marketplace-card">
              <CardHeader>
                <CardTitle className="text-lg">معلومات التوصيل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {order.deliveryMethod === "courier" ? "توصيل بالكورير" : "استلام من المحل"}
                  </span>
                </div>
                {order.deliveryMethod === "courier" && (
                  <>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">{order.deliveryAddress.name}</div>
                        <div className="text-muted-foreground">{order.deliveryAddress.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">{order.deliveryAddress.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">التوصيل المتوقع: {order.estimatedDelivery}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="marketplace-card">
              <CardHeader>
                <CardTitle className="text-lg">طريقة الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {order.paymentMethod === "cash" ? (
                    <>
                      <Package className="h-4 w-4 text-secondary" />
                      <span className="text-sm">الدفع عند الاستلام (نقداً)</span>
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-sm">بطاقة ائتمان</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {order.paymentMethod === "cash"
                    ? "يرجى تحضير المبلغ المطلوب عند وصول الطلب"
                    : "تم خصم المبلغ من بطاقتك الائتمانية"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="marketplace-card">
            <CardHeader>
              <CardTitle className="text-lg">الخطوات التالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">تأكيد الطلب</div>
                    <div className="text-muted-foreground">سيتم التواصل معك خلال ساعة لتأكيد الطلب</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">تحضير الطلب</div>
                    <div className="text-muted-foreground">سيقوم التجار بتحضير منتجاتك</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">التوصيل</div>
                    <div className="text-muted-foreground">
                      {order.deliveryMethod === "courier"
                        ? "سيتم توصيل الطلب إلى عنوانك"
                        : "يمكنك استلام الطلب من المحل"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 marketplace-button" onClick={() => (window.location.href = "/products")}>
              متابعة التسوق
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              تتبع الطلب
            </Button>
          </div>

          {/* Contact Info */}
          <Card className="marketplace-card">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">هل تحتاج مساعدة؟</h3>
              <p className="text-sm text-muted-foreground mb-4">تواصل معنا في أي وقت للاستفسار عن طلبك</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+20 123 456 789</span>
                </div>
                <span>•</span>
                <span>خدمة العملاء متاحة 24/7</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
