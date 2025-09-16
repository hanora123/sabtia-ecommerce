import { Bell, Package, Star, AlertCircle, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "تم شحن طلبك #1234",
      message: "طلبك من محل أدوات أحمد في الطريق إليك",
      time: "منذ ساعتين",
      read: false,
      icon: Package,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "review",
      title: "تقييم جديد على منتجك",
      message: 'حصل منتج "مفك براغي مجموعة 6 قطع" على تقييم 5 نجوم',
      time: "منذ 4 ساعات",
      read: false,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      id: 3,
      type: "stock",
      title: "تنبيه مخزون منخفض",
      message: 'منتج "قماش حرير أحمر" أوشك على النفاد (3 قطع متبقية)',
      time: "منذ 6 ساعات",
      read: true,
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      id: 4,
      type: "order",
      title: "تم تأكيد طلبك",
      message: "طلبك #1233 تم تأكيده وسيتم تحضيره قريباً",
      time: "أمس",
      read: true,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "promotion",
      title: "عرض خاص لك!",
      message: "خصم 20% على جميع الأدوات في محل أحمد - ينتهي غداً",
      time: "أمس",
      read: true,
      icon: Bell,
      color: "text-purple-600",
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">الإشعارات</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : "جميع الإشعارات مقروءة"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              تحديد الكل كمقروء
            </Button>
            <Button variant="outline" size="sm">
              <X className="w-4 h-4 ml-2" />
              مسح الكل
            </Button>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              الكل
              {unreadCount > 0 && (
                <Badge variant="destructive" className="mr-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            <TabsTrigger value="stock">المخزون</TabsTrigger>
            <TabsTrigger value="promotions">العروض</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-background ${notification.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3
                              className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{notification.time}</span>
                              {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-3">{notification.message}</p>

                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="outline" size="sm">
                                تحديد كمقروء
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Other tab contents would filter notifications by type */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              {notifications
                .filter((n) => n.type === "order")
                .map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <Card
                      key={notification.id}
                      className={`transition-all hover:shadow-md ${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-full bg-background ${notification.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3
                                className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </h3>
                              <span className="text-sm text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-muted-foreground text-sm">{notification.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">لا توجد إشعارات</h3>
              <p className="text-muted-foreground">ستظهر هنا جميع إشعاراتك المهمة</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
