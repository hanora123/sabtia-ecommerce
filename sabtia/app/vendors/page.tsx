import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Phone, Search, Filter, Package, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock vendors data
const vendors = [
  {
    id: 1,
    name: "محل أحمد للأدوات",
    nameEn: "Ahmed Tools Shop",
    description: "متخصصون في جميع أنواع الأدوات اليدوية والكهربائية منذ 1995",
    descriptionEn: "Specialists in all types of manual and electric tools since 1995",
    image: "/tools-shop-owner.jpg",
    rating: 4.8,
    reviews: 156,
    products: 45,
    location: "السبتية، القاهرة",
    phone: "01234567890",
    category: "أدوات",
    categoryEn: "Tools",
    joinedDate: "2020",
    verified: true,
    responseTime: "خلال ساعة",
    deliveryTime: "نفس اليوم",
  },
  {
    id: 2,
    name: "محل فاطمة للأقمشة",
    nameEn: "Fatma Fabrics Shop",
    description: "أقمشة عالية الجودة وألوان متنوعة للخياطة والتفصيل",
    descriptionEn: "High quality fabrics in various colors for sewing and tailoring",
    image: "/fabric-shop-owner-woman.jpg",
    rating: 4.9,
    reviews: 203,
    products: 78,
    location: "السبتية، القاهرة",
    phone: "01234567891",
    category: "أقمشة",
    categoryEn: "Fabrics",
    joinedDate: "2019",
    verified: true,
    responseTime: "خلال 30 دقيقة",
    deliveryTime: "خلال يومين",
  },
  {
    id: 3,
    name: "محل محمود للسباكة",
    nameEn: "Mahmoud Plumbing Shop",
    description: "جميع مستلزمات السباكة والأدوات الصحية",
    descriptionEn: "All plumbing supplies and sanitary tools",
    image: "/plumbing-shop-owner-man.jpg",
    rating: 4.6,
    reviews: 89,
    products: 32,
    location: "السبتية، القاهرة",
    phone: "01234567892",
    category: "سباكة",
    categoryEn: "Plumbing",
    joinedDate: "2021",
    verified: false,
    responseTime: "خلال ساعتين",
    deliveryTime: "خلال 3 أيام",
  },
]

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-l from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">التجار والبائعين</h1>
            <p className="text-muted-foreground text-lg mb-4">اكتشف أفضل التجار في السبتية واتصل بهم مباشرة</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{vendors.length} تاجر</span>
              <span>•</span>
              <span>متوفر للتوصيل</span>
              <span>•</span>
              <span>خدمة عملاء 24/7</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="ابحث عن التجار..." className="pr-10" />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="tools">أدوات</SelectItem>
                <SelectItem value="fabrics">أقمشة</SelectItem>
                <SelectItem value="plumbing">سباكة</SelectItem>
                <SelectItem value="electronics">إلكترونيات</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="rating">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">التقييم</SelectItem>
                <SelectItem value="reviews">عدد التقييمات</SelectItem>
                <SelectItem value="products">عدد المنتجات</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <Image
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {vendor.verified && <Badge className="absolute top-2 right-2 bg-green-500">موثق</Badge>}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <Link href={`/vendors/${vendor.id}`}>
                        <h3 className="font-bold text-lg mb-1 hover:text-primary line-clamp-1">{vendor.name}</h3>
                      </Link>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {vendor.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{vendor.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(vendor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{vendor.rating}</span>
                    <span className="text-xs text-muted-foreground">({vendor.reviews} تقييم)</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Package className="h-3 w-3" />
                      <span>{vendor.products} منتج</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>رد: {vendor.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/vendors/${vendor.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        زيارة المحل
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            تحميل المزيد من التجار
          </Button>
        </div>
      </div>
    </div>
  )
}
