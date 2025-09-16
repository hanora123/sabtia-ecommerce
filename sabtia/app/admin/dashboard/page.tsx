import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Store,
  Package,
  DollarSign,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">لوحة تحكم الإدارة</h1>
          <p className="text-muted-foreground">إدارة منصة السَبْتِيّة</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التجار النشطون</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,432</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23%</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231 ج.م</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="vendors">التجار</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>النشاط الأخير</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">تاجر جديد انضم للمنصة</p>
                      <p className="text-xs text-muted-foreground">منذ 5 دقائق</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">طلب جديد تم تأكيده</p>
                      <p className="text-xs text-muted-foreground">منذ 12 دقيقة</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">منتج جديد تم إضافته</p>
                      <p className="text-xs text-muted-foreground">منذ 25 دقيقة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    تنبيهات مهمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">3 تجار في انتظار الموافقة</p>
                    <p className="text-xs text-orange-600">يحتاج إلى مراجعة</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">5 شكاوى جديدة</p>
                    <p className="text-xs text-red-600">تحتاج إلى متابعة فورية</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">تحديث النظام متاح</p>
                    <p className="text-xs text-blue-600">الإصدار 2.1.0</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>عرض وإدارة جميع مستخدمي المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="البحث عن مستخدم..." className="pr-10" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="نوع المستخدم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستخدمين</SelectItem>
                        <SelectItem value="customers">العملاء</SelectItem>
                        <SelectItem value="vendors">التجار</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "أحمد محمد",
                      email: "ahmed@example.com",
                      type: "عميل",
                      status: "نشط",
                      joinDate: "2024-01-15",
                    },
                    {
                      name: "فاطمة علي",
                      email: "fatma@example.com",
                      type: "تاجر",
                      status: "نشط",
                      joinDate: "2024-01-10",
                    },
                    {
                      name: "محمود حسن",
                      email: "mahmoud@example.com",
                      type: "عميل",
                      status: "معلق",
                      joinDate: "2024-01-08",
                    },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Avatar>
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge variant={user.type === "تاجر" ? "default" : "secondary"}>{user.type}</Badge>
                        <Badge variant={user.status === "نشط" ? "default" : "destructive"}>{user.status}</Badge>
                        <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة التجار</CardTitle>
                <CardDescription>مراجعة وإدارة طلبات التجار</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "محل أدوات الحاج محمد",
                      owner: "محمد أحمد",
                      status: "في انتظار الموافقة",
                      products: 0,
                      rating: 0,
                    },
                    { name: "أقمشة السيدة فاطمة", owner: "فاطمة علي", status: "نشط", products: 45, rating: 4.8 },
                    { name: "أدوات السباكة - حسن", owner: "حسن محمود", status: "نشط", products: 23, rating: 4.5 },
                  ].map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Avatar>
                          <AvatarFallback>{vendor.name.split(" ")[0][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">المالك: {vendor.owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-center">
                          <p className="text-sm font-medium">{vendor.products}</p>
                          <p className="text-xs text-muted-foreground">منتج</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{vendor.rating || "جديد"}</p>
                          <p className="text-xs text-muted-foreground">التقييم</p>
                        </div>
                        <Badge variant={vendor.status === "نشط" ? "default" : "secondary"}>{vendor.status}</Badge>
                        <div className="flex space-x-2 space-x-reverse">
                          {vendor.status === "في انتظار الموافقة" && (
                            <>
                              <Button size="sm" variant="default">
                                <CheckCircle className="h-4 w-4 ml-1" />
                                موافقة
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="h-4 w-4 ml-1" />
                                رفض
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المنتجات</CardTitle>
                <CardDescription>مراجعة ومراقبة المنتجات المضافة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="البحث عن منتج..." className="pr-10" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        <SelectItem value="tools">أدوات</SelectItem>
                        <SelectItem value="fabrics">أقمشة</SelectItem>
                        <SelectItem value="electronics">إلكترونيات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "مفك براغي 6 قطع",
                      vendor: "محل أدوات الحاج محمد",
                      price: "45 ج.م",
                      stock: 12,
                      status: "نشط",
                    },
                    {
                      name: "قماش قطني أزرق",
                      vendor: "أقمشة السيدة فاطمة",
                      price: "25 ج.م/متر",
                      stock: 0,
                      status: "نفد المخزون",
                    },
                    { name: "كابل USB 2 متر", vendor: "إلكترونيات أحمد", price: "15 ج.م", stock: 8, status: "نشط" },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.vendor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-center">
                          <p className="text-sm font-medium">{product.price}</p>
                          <p className="text-xs text-muted-foreground">السعر</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{product.stock}</p>
                          <p className="text-xs text-muted-foreground">المخزون</p>
                        </div>
                        <Badge variant={product.status === "نشط" ? "default" : "destructive"}>{product.status}</Badge>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
                <CardDescription>متابعة ومراقبة جميع الطلبات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "#12345",
                      customer: "أحمد محمد",
                      vendor: "محل أدوات الحاج محمد",
                      total: "120 ج.م",
                      status: "قيد التحضير",
                      date: "2024-01-20",
                    },
                    {
                      id: "#12346",
                      customer: "سارة أحمد",
                      vendor: "أقمشة السيدة فاطمة",
                      total: "85 ج.م",
                      status: "تم التسليم",
                      date: "2024-01-19",
                    },
                    {
                      id: "#12347",
                      customer: "محمود علي",
                      vendor: "إلكترونيات أحمد",
                      total: "200 ج.م",
                      status: "في الطريق",
                      date: "2024-01-18",
                    },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-center">
                          <p className="text-sm font-medium">{order.total}</p>
                          <p className="text-xs text-muted-foreground">المبلغ</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm">{order.vendor}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "تم التسليم"
                              ? "default"
                              : order.status === "في الطريق"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>تقرير المبيعات الشهرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>يناير 2024</span>
                      <span className="font-bold">45,231 ج.م</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ديسمبر 2023</span>
                      <span className="font-bold">38,456 ج.م</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>نوفمبر 2023</span>
                      <span className="font-bold">42,123 ج.م</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أفضل الفئات مبيعاً</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>أدوات</span>
                      <span className="font-bold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>أقمشة</span>
                      <span className="font-bold">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>إلكترونيات</span>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>أخرى</span>
                      <span className="font-bold">15%</span>
                    </div>
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
