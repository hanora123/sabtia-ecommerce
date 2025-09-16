import { ArrowRight, Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Mock order data
const orderData = {
  id: "ORD-2024-001",
  status: "في الطريق",
  statusEn: "out_for_delivery",
  date: "2024-01-15",
  total: 285.5,
  items: [
    {
      id: 1,
      name: "مفك براغي مجموعة 6 قطع",
      nameEn: "Screwdriver Set 6 Pieces",
      price: 45.0,
      quantity: 2,
      image: "/screwdriver-set-6-pieces.jpg",
      vendor: "محل أدوات أحمد",
    },
    {
      id: 2,
      name: "قماش قطني أزرق - متر",
      nameEn: "Blue Cotton Fabric - 1 Meter",
      price: 25.5,
      quantity: 8,
      image: "/blue-cotton-fabric.jpg",
      vendor: "محل أقمشة فاطمة",
    },
  ],
  timeline: [
    { status: "تم الطلب", statusEn: "ordered", date: "2024-01-15 10:30", completed: true },
    { status: "تم التأكيد", statusEn: "confirmed", date: "2024-01-15 11:15", completed: true },
    { status: "قيد التحضير", statusEn: "preparing", date: "2024-01-15 14:20", completed: true },
    { status: "في الطريق", statusEn: "out_for_delivery", date: "2024-01-16 09:00", completed: true },
    { status: "تم التسليم", statusEn: "delivered", date: "", completed: false },
  ],
  delivery: {
    method: "توصيل بالكوريير",
    methodEn: "Courier Delivery",
    address: "شارع السبتية، القاهرة، مصر",
    addressEn: "El-Sabtiah Street, Cairo, Egypt",
    courier: "محمد أحمد",
    courierEn: "Mohamed Ahmed",
    phone: "+20 100 123 4567",
    estimatedTime: "خلال ساعتين",
    estimatedTimeEn: "Within 2 hours",
  },
  payment: {
    method: "الدفع عند الاستلام",
    methodEn: "Cash on Delivery",
    status: "في انتظار الدفع",
    statusEn: "Pending Payment",
  },
}

const statusIcons = {
  ordered: Clock,
  confirmed: CheckCircle,
  preparing: Package,
  out_for_delivery: Truck,
  delivered: CheckCircle,
}

const statusColors = {
  ordered: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  preparing: "bg-yellow-100 text-yellow-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const order = orderData

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">تتبع الطلب</h1>
            <p className="text-muted-foreground">رقم الطلب: {order.id}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  حالة الطلب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={statusColors[order.statusEn as keyof typeof statusColors]}>{order.status}</Badge>
                  <span className="text-sm text-muted-foreground">
                    آخر تحديث: {order.timeline.find((t) => t.completed)?.date}
                  </span>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {order.timeline.map((step, index) => {
                    const Icon = statusIcons[step.statusEn as keyof typeof statusIcons]
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full ${step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.status}
                          </p>
                          {step.date && <p className="text-sm text-muted-foreground">{step.date}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  معلومات التوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">عنوان التوصيل</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">الكوريير</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.courier}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">رقم الهاتف</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">الوقت المتوقع للوصول</p>
                    <p className="text-sm text-muted-foreground">{order.delivery.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.vendor}</p>
                      <p className="text-sm">
                        {item.quantity} × {item.price.toFixed(2)} ج.م
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center font-bold">
                  <span>الإجمالي</span>
                  <span>{order.total.toFixed(2)} ج.م</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">طريقة الدفع</span>
                    <span>{order.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">حالة الدفع</span>
                    <Badge variant="outline">{order.payment.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full">
                <Phone className="h-4 w-4 ml-2" />
                اتصال بالكوريير
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                تحتاج مساعدة؟
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
