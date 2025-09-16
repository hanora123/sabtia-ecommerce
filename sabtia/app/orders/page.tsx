import { Search, Package, Clock, CheckCircle, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock orders data
const ordersData = [
  {
    id: "ORD-2024-001",
    status: "في الطريق",
    statusEn: "out_for_delivery",
    date: "2024-01-15",
    total: 285.5,
    itemsCount: 2,
    vendor: "محل أدوات أحمد",
    image: "/screwdriver-set-6-pieces.jpg",
  },
  {
    id: "ORD-2024-002",
    status: "تم التسليم",
    statusEn: "delivered",
    date: "2024-01-12",
    total: 156.0,
    itemsCount: 3,
    vendor: "محل أقمشة فاطمة",
    image: "/blue-cotton-fabric.jpg",
  },
  {
    id: "ORD-2024-003",
    status: "قيد التحضير",
    statusEn: "preparing",
    date: "2024-01-16",
    total: 89.75,
    itemsCount: 1,
    vendor: "محل سباكة محمود",
    image: "/small-water-pump.jpg",
  },
  {
    id: "ORD-2024-004",
    status: "تم التأكيد",
    statusEn: "confirmed",
    date: "2024-01-14",
    total: 234.25,
    itemsCount: 4,
    vendor: "محل أدوات أحمد",
    image: "/adjustable-wrench-tool.jpg",
  },
]

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

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">طلباتي</h1>
          <p className="text-muted-foreground">تتبع وإدارة جميع طلباتك</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="البحث في الطلبات..." className="pr-10" />
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="حالة الطلب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الطلبات</SelectItem>
              <SelectItem value="ordered">تم الطلب</SelectItem>
              <SelectItem value="confirmed">تم التأكيد</SelectItem>
              <SelectItem value="preparing">قيد التحضير</SelectItem>
              <SelectItem value="out_for_delivery">في الطريق</SelectItem>
              <SelectItem value="delivered">تم التسليم</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث أولاً</SelectItem>
              <SelectItem value="oldest">الأقدم أولاً</SelectItem>
              <SelectItem value="highest">الأعلى سعراً</SelectItem>
              <SelectItem value="lowest">الأقل سعراً</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {ordersData.map((order) => {
            const Icon = statusIcons[order.statusEn as keyof typeof statusIcons]

            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={order.image || "/placeholder.svg"}
                      alt="Order item"
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.vendor}</p>
                        </div>
                        <Badge className={statusColors[order.statusEn as keyof typeof statusColors]}>
                          <Icon className="h-3 w-3 ml-1" />
                          {order.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{order.itemsCount} منتج</span>
                        <span>{order.date}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-foreground">{order.total.toFixed(2)} ج.م</div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            إعادة الطلب
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/orders/${order.id}`}>تتبع الطلب</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {ordersData.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">لا توجد طلبات بعد</h3>
            <p className="text-muted-foreground mb-6">ابدأ التسوق واطلب منتجاتك المفضلة</p>
            <Button asChild>
              <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
