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
            Profile Content
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            Orders Content
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            Wishlist Content
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            Addresses Content
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
