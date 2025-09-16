"use client"

import { useState } from "react"
import {
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Upload,
  Star,
  MapPin,
  Phone,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageToggle } from "@/components/language-toggle"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock vendor data
  const vendor = {
    name: "محل أحمد للأدوات",
    description: "متخصصون في جميع أنواع الأدوات والمعدات منذ 1995",
    rating: 4.9,
    totalProducts: 156,
    totalOrders: 342,
    monthlyRevenue: 15420,
    image: "/tools-shop-owner.jpg",
    location: "شارع السبتية - المحل رقم 15",
    phone: "+20 123 456 789",
    joinDate: "2023-01-15",
  }

  const analytics = {
    weeklyViews: 1247,
    conversionRate: 3.2,
    averageOrderValue: 185,
    topSellingCategory: "أدوات",
    lowStockItems: 8,
    pendingOrders: 5,
    monthlyGrowth: 12.5,
    customerSatisfaction: 4.8,
  }

  const [recentOrders, setRecentOrders] = useState([
    {
      id: "ORD-001",
      customer: "محمد أحمد",
      items: 2,
      total: 170,
      status: "pending",
      date: "2024-01-15",
      phone: "+20 100 123 456",
    },
    {
      id: "ORD-002",
      customer: "سارة محمود",
      items: 1,
      total: 85,
      status: "completed",
      date: "2024-01-14",
      phone: "+20 101 234 567",
    },
    {
      id: "ORD-003",
      customer: "أحمد علي",
      items: 3,
      total: 245,
      status: "shipped",
      date: "2024-01-13",
      phone: "+20 102 345 678",
    },
    {
      id: "ORD-004",
      customer: "فاطمة حسن",
      items: 1,
      total: 95,
      status: "pending",
      date: "2024-01-15",
      phone: "+20 103 456 789",
    },
    {
      id: "ORD-005",
      customer: "عمر محمد",
      items: 4,
      total: 420,
      status: "processing",
      date: "2024-01-14",
      phone: "+20 104 567 890",
    },
  ])

  const products = [
    {
      id: 1,
      name: "مفتاح إنجليزي مقاس 12",
      price: 85,
      stock: 15,
      category: "أدوات",
      image: "/adjustable-wrench-tool.jpg",
      status: "active",
      views: 124,
      sales: 8,
    },
    {
      id: 2,
      name: "مفك براغي مجموعة 6 قطع",
      price: 65,
      stock: 0,
      category: "أدوات",
      image: "/screwdriver-set-6-pieces.jpg",
      status: "out_of_stock",
      views: 89,
      sales: 12,
    },
    {
      id: 3,
      name: "مضخة مياه صغيرة",
      price: 350,
      stock: 8,
      category: "سباكة",
      image: "/small-water-pump.jpg",
      status: "active",
      views: 67,
      sales: 5,
    },
  ]

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const originalOrders = [...recentOrders];
    const updatedOrders = recentOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setRecentOrders(updatedOrders);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update order status');
      }

      toast.success(`Order ${orderId} has been updated to ${status}.`);
    } catch (error) {
      toast.error('Failed to update order status.');
      setRecentOrders(originalOrders);
    }
  };

  const lowStockProducts = products.filter((product) => product.stock <= 5 && product.stock > 0)
  const outOfStockProducts = products.filter((product) => product.stock === 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500 text-white">قيد المراجعة</Badge>
      case "processing":
        return <Badge className="bg-blue-500 text-white">قيد التجهيز</Badge>
      case "completed":
        return <Badge className="bg-secondary text-secondary-foreground">مكتمل</Badge>
      case "shipped":
        return <Badge className="bg-green-500 text-white">تم الشحن</Badge>
      case "active":
        return <Badge className="bg-secondary text-secondary-foreground">نشط</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">نفد المخزون</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
              <Badge variant="outline">لوحة التاجر</Badge>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Avatar>
                <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
                <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">مرحباً، {vendor.name}</h1>
          <p className="text-muted-foreground">إدارة متجرك ومنتجاتك من هنا</p>
        </div>

        {(lowStockProducts.length > 0 || outOfStockProducts.length > 0 || analytics.pendingOrders > 0) && (
          <div className="mb-6 space-y-3">
            {analytics.pendingOrders > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-800">لديك {analytics.pendingOrders} طلبات قيد المراجعة</p>
                  <p className="text-sm text-yellow-700">يرجى مراجعة الطلبات الجديدة والرد عليها</p>
                </div>
              </div>
            )}

            {lowStockProducts.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
                <Package className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-800">{lowStockProducts.length} منتجات قاربت على النفاد</p>
                  <p className="text-sm text-orange-700">يرجى تجديد المخزون قريباً</p>
                </div>
              </div>
            )}

            {outOfStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-red-800">{outOfStockProducts.length} منتجات نفدت من المخزون</p>
                  <p className="text-sm text-red-700">هذه المنتجات غير متاحة للعملاء حالياً</p>
                </div>
              </div>
            )}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
                      <p className="text-2xl font-bold">{vendor.totalProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                      <p className="text-2xl font-bold">{vendor.totalOrders}</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
                      <p className="text-2xl font-bold">{vendor.monthlyRevenue.toLocaleString()} ج.م</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">التقييم</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold">{vendor.rating}</p>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="marketplace-card">
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="text-sm">
                          <p>{order.items} منتج</p>
                          <p className="text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-primary">{order.total} ج.م</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">تحليلات المتجر</h2>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">المشاهدات الأسبوعية</p>
                      <p className="text-2xl font-bold">{analytics.weeklyViews.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">معدل التحويل</p>
                      <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">متوسط قيمة الطلب</p>
                      <p className="text-2xl font-bold">{analytics.averageOrderValue} ج.م</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">النمو الشهري</p>
                      <p className="text-2xl font-bold text-green-600">+{analytics.monthlyGrowth}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>أداء الأقسام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">أدوات</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">سباكة</span>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">إلكترونيات</span>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>رضا العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">{analytics.customerSatisfaction}/5</div>
                    <div className="flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${
                            star <= Math.floor(analytics.customerSatisfaction)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">بناءً على 127 تقييم</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
              <Button className="marketplace-button">
                <Plus className="h-4 w-4 mr-2" />
                إضافة منتج جديد
              </Button>
            </div>

            {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lowStockProducts.length > 0 && (
                  <Card className="marketplace-card border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-800 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        منتجات قاربت على النفاد
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {lowStockProducts.map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                            <span className="text-sm">{product.name}</span>
                            <Badge variant="outline" className="text-orange-700 border-orange-300">
                              {product.stock} متبقي
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {outOfStockProducts.length > 0 && (
                  <Card className="marketplace-card border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        منتجات نفدت من المخزون
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {outOfStockProducts.map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                            <span className="text-sm">{product.name}</span>
                            <Badge variant="destructive">نفد المخزون</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="marketplace-card">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {getStatusBadge(product.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>السعر:</span>
                        <span className="font-bold text-primary">{product.price} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المخزون:</span>
                        <span className={product.stock > 0 ? "text-secondary" : "text-destructive"}>
                          {product.stock} قطعة
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>المشاهدات:</span>
                        <span>{product.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المبيعات:</span>
                        <span>{product.sales}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        تعديل
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Product Form */}
            <Card className="marketplace-card">
              <CardHeader>
                <CardTitle>إضافة منتج جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">اسم المنتج</Label>
                    <Input id="productName" placeholder="أدخل اسم المنتج" />
                  </div>
                  <div>
                    <Label htmlFor="productPrice">السعر (ج.م)</Label>
                    <Input id="productPrice" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="productStock">الكمية المتوفرة</Label>
                    <Input id="productStock" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="productCategory">القسم</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tools">أدوات</SelectItem>
                        <SelectItem value="plumbing">سباكة</SelectItem>
                        <SelectItem value="electronics">إلكترونيات</SelectItem>
                        <SelectItem value="fabrics">أقمشة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="productDescription">وصف المنتج</Label>
                  <Textarea id="productDescription" placeholder="أدخل وصف تفصيلي للمنتج" rows={3} />
                </div>
                <div>
                  <Label htmlFor="productImage">صورة المنتج</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">اسحب الصورة هنا أو انقر للاختيار</p>
                    <Button variant="outline" size="sm">
                      اختيار صورة
                    </Button>
                  </div>
                </div>
                <Button className="w-full marketplace-button">إضافة المنتج</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الطلبات</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="processing">قيد التجهيز</SelectItem>
                    <SelectItem value="shipped">تم الشحن</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="marketplace-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-muted-foreground">قيد المراجعة</div>
                </CardContent>
              </Card>
              <Card className="marketplace-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">قيد التجهيز</div>
                </CardContent>
              </Card>
              <Card className="marketplace-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-muted-foreground">تم الشحن</div>
                </CardContent>
              </Card>
              <Card className="marketplace-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">28</div>
                  <div className="text-sm text-muted-foreground">مكتملة</div>
                </CardContent>
              </Card>
            </div>

            <Card className="marketplace-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-right">
                        <th className="p-4 font-semibold">رقم الطلب</th>
                        <th className="p-4 font-semibold">العميل</th>
                        <th className="p-4 font-semibold">الهاتف</th>
                        <th className="p-4 font-semibold">المنتجات</th>
                        <th className="p-4 font-semibold">المبلغ</th>
                        <th className="p-4 font-semibold">التاريخ</th>
                        <th className="p-4 font-semibold">الحالة</th>
                        <th className="p-4 font-semibold">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4 text-sm text-muted-foreground">{order.phone}</td>
                          <td className="p-4">{order.items} منتج</td>
                          <td className="p-4 font-bold text-primary">{order.total} ج.م</td>
                          <td className="p-4 text-muted-foreground">{order.date}</td>
                          <td className="p-4">{getStatusBadge(order.status)}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                عرض
                              </Button>
                              {order.status === "pending" && (
                                <>
                                  <Button size="sm" className="marketplace-button-secondary" onClick={() => handleUpdateStatus(order.id, 'processing')}>
                                    قبول
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                  >
                                    رفض
                                  </Button>
                                </>
                              )}
                              {order.status === "processing" && (
                                <Button size="sm" className="marketplace-button" onClick={() => handleUpdateStatus(order.id, 'shipped')}>
                                  شحن
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">الملف الشخصي</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Info */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>معلومات المتجر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={vendor.image || "/placeholder.svg"} alt={vendor.name} />
                      <AvatarFallback className="text-2xl">{vendor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shopName">اسم المتجر</Label>
                    <Input id="shopName" defaultValue={vendor.name} />
                  </div>

                  <div>
                    <Label htmlFor="shopDescription">وصف المتجر</Label>
                    <Textarea id="shopDescription" defaultValue={vendor.description} rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="shopLocation">العنوان</Label>
                    <Input id="shopLocation" defaultValue={vendor.location} />
                  </div>

                  <div>
                    <Label htmlFor="shopPhone">رقم الهاتف</Label>
                    <Input id="shopPhone" defaultValue={vendor.phone} />
                  </div>

                  <Button className="w-full marketplace-button">حفظ التغييرات</Button>
                </CardContent>
              </Card>

              {/* Shop Stats */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>إحصائيات المتجر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span>التقييم العام</span>
                    </div>
                    <span className="font-bold text-lg">{vendor.rating}/5</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      <span>إجمالي المنتجات</span>
                    </div>
                    <span className="font-bold text-lg">{vendor.totalProducts}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-secondary" />
                      <span>إجمالي الطلبات</span>
                    </div>
                    <span className="font-bold text-lg">{vendor.totalOrders}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>تاريخ الانضمام</span>
                    </div>
                    <span className="font-bold text-lg">{vendor.joinDate}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>رقم الهاتف</span>
                    </div>
                    <span className="font-bold text-lg">{vendor.phone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
