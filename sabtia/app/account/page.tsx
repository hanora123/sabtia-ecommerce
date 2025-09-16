"use client"

import { useState } from "react"
import { Package, Heart, MapPin, Phone, Edit, Eye, Calendar, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LanguageToggle } from "@/components/language-toggle"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "أحمد محمد",
    email: "ahmed@email.com",
    phone: "+20 123 456 789",
    avatar: "/placeholder.svg",
    joinDate: "2023-06-15",
    totalOrders: 12,
    totalSpent: 2450,
  }

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: 2,
      total: 170,
      status: "delivered",
      vendor: "محل أحمد للأدوات",
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      items: 1,
      total: 85,
      status: "shipped",
      vendor: "متجر النسيج الذهبي",
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      items: 3,
      total: 245,
      status: "delivered",
      vendor: "ورشة السبتية للسباكة",
    },
  ]

  const wishlist = [
    {
      id: 1,
      name: "مفتاح إنجليزي مقاس 12",
      price: 85,
      vendor: "محل أحمد للأدوات",
      image: "/adjustable-wrench-tool.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "قماش قطني أزرق",
      price: 45,
      vendor: "متجر النسيج الذهبي",
      image: "/blue-cotton-fabric.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "مضخة مياه صغيرة",
      price: 350,
      vendor: "ورشة السبتية للسباكة",
      image: "/small-water-pump.jpg",
      inStock: false,
    },
  ]

  const addresses = [
    {
      id: 1,
      name: "المنزل",
      address: "شارع النيل، المعادي، القاهرة",
      phone: "+20 123 456 789",
      isDefault: true,
    },
    {
      id: 2,
      name: "العمل",
      address: "شارع التحرير، وسط البلد، القاهرة",
      phone: "+20 987 654 321",
      isDefault: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-secondary text-secondary-foreground">تم التوصيل</Badge>
      case "shipped":
        return <Badge className="bg-blue-500 text-white">تم الشحن</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white">قيد المراجعة</Badge>
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
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <a href="/" className="text-2xl font-bold text-primary">
                السَبْتِيّة
              </a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">حسابي</h1>
          <p className="text-muted-foreground">إدارة معلوماتك الشخصية وطلباتك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="orders">طلباتي</TabsTrigger>
            <TabsTrigger value="wishlist">المفضلة</TabsTrigger>
            <TabsTrigger value="addresses">العناوين</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Info */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>المعلومات الشخصية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input id="fullName" defaultValue={user.name} />
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" defaultValue={user.phone} />
                  </div>

                  <Button className="w-full marketplace-button">حفظ التغييرات</Button>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="marketplace-card">
                <CardHeader>
                  <CardTitle>إحصائيات الحساب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>تاريخ الانضمام</span>
                    </div>
                    <span className="font-bold">{user.joinDate}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-secondary" />
                      <span>إجمالي الطلبات</span>
                    </div>
                    <span className="font-bold">{user.totalOrders}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span>إجمالي المشتريات</span>
                    </div>
                    <span className="font-bold">{user.totalSpent.toLocaleString()} ج.م</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>المنتجات المفضلة</span>
                    </div>
                    <span className="font-bold">{wishlist.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <Card className="marketplace-card">
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-semibold">كلمة المرور</h3>
                    <p className="text-sm text-muted-foreground">آخر تغيير منذ 3 أشهر</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تغيير كلمة المرور
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-semibold">التحقق بخطوتين</h3>
                    <p className="text-sm text-muted-foreground">حماية إضافية لحسابك</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تفعيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">طلباتي</h2>
              <span className="text-muted-foreground">{orders.length} طلب</span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="marketplace-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">التاجر</p>
                        <p className="font-medium">{order.vendor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">عدد المنتجات</p>
                        <p className="font-medium">{order.items} منتج</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                        <p className="font-bold text-primary">{order.total} ج.م</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض التفاصيل
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          إعادة الطلب
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">المنتجات المفضلة</h2>
              <span className="text-muted-foreground">{wishlist.length} منتج</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="marketplace-card group cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="destructive">غير متوفر</Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.vendor}</p>
                    <span className="text-lg font-bold text-primary">{item.price} ج.م</span>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 marketplace-button-secondary" disabled={!item.inStock}>
                        أضف للسلة
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500 bg-transparent">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">عناوين التوصيل</h2>
              <Button className="marketplace-button">
                <MapPin className="h-4 w-4 mr-2" />
                إضافة عنوان جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <Card key={address.id} className="marketplace-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{address.name}</h3>
                      {address.isDefault && <Badge className="bg-secondary text-secondary-foreground">افتراضي</Badge>}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{address.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{address.phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        تعديل
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          جعله افتراضي
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
