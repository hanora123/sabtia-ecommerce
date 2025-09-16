import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Clock, Package, Users, MessageCircle, Share2, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock vendor data
const vendor = {
  id: 1,
  name: "محل أحمد للأدوات",
  nameEn: "Ahmed Tools Shop",
  description:
    "متخصصون في جميع أنواع الأدوات اليدوية والكهربائية منذ 1995. نقدم أفضل الأسعار وأعلى جودة في السوق المصري.",
  descriptionEn: "Specialists in all types of manual and electric tools since 1995",
  image: "/tools-shop-owner.jpg",
  coverImage: "/tools-shop-interior.jpg",
  rating: 4.8,
  reviews: 156,
  products: 45,
  location: "السبتية، القاهرة",
  address: "شارع السبتية، بجوار مسجد النور، القاهرة",
  phone: "01234567890",
  whatsapp: "01234567890",
  category: "أدوات",
  categoryEn: "Tools",
  joinedDate: "2020",
  verified: true,
  responseTime: "خلال ساعة",
  deliveryTime: "نفس اليوم",
  workingHours: "السبت - الخميس: 9 صباحاً - 9 مساءً",
  specialties: ["أدوات يدوية", "أدوات كهربائية", "عدد البناء", "أدوات القياس"],
  followers: 234,
}

const vendorProducts = [
  {
    id: 1,
    name: "مفك براغي مجموعة 6 قطع",
    nameEn: "Screwdriver Set 6 Pieces",
    price: 45,
    originalPrice: 60,
    image: "/screwdriver-set-6-pieces.jpg",
    rating: 4.5,
    reviews: 23,
    inStock: true,
    discount: 25,
  },
  {
    id: 2,
    name: "مفتاح إنجليزي قابل للتعديل",
    nameEn: "Adjustable Wrench Tool",
    price: 35,
    image: "/adjustable-wrench-tool.jpg",
    rating: 4.2,
    reviews: 18,
    inStock: true,
  },
]

const vendorReviews = [
  {
    id: 1,
    user: "محمد أحمد",
    rating: 5,
    comment: "تاجر ممتاز وأسعار معقولة. الأدوات عالية الجودة والخدمة سريعة.",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    user: "سارة محمود",
    rating: 4,
    comment: "محل جيد ولكن أحياناً بعض الأدوات غير متوفرة.",
    date: "2024-01-10",
    verified: false,
  },
]

export default function VendorPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={vendor.coverImage || "/placeholder.svg"}
          alt={`${vendor.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Vendor Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                  <Image src={vendor.image || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
                </div>
              </div>

              {/* Vendor Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{vendor.name}</h1>
                      {vendor.verified && <Badge className="bg-green-500">موثق</Badge>}
                    </div>
                    <Badge variant="secondary" className="mb-2">
                      {vendor.category}
                    </Badge>
                    <p className="text-muted-foreground mb-3">{vendor.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{vendor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{vendor.reviews} تقييم</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Package className="h-4 w-4" />
                      <span className="font-bold">{vendor.products}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">منتج</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="font-bold">{vendor.followers}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">متابع</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-bold text-xs">ساعة</span>
                    </div>
                    <p className="text-xs text-muted-foreground">وقت الرد</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1 md:flex-none">
                    <Phone className="h-4 w-4 ml-2" />
                    اتصال
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none bg-transparent">
                    <MessageCircle className="h-4 w-4 ml-2" />
                    واتساب
                  </Button>
                  <Button variant="outline">متابعة</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="about">عن المحل</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            <TabsTrigger value="contact">التواصل</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount && (
                            <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>
                          )}
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">{product.name}</h3>
                      </Link>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{product.price} ج.م</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {product.originalPrice} ج.م
                            </span>
                          )}
                        </div>

                        <Button size="sm" className="h-8">
                          <ShoppingCart className="h-3 w-3 ml-1" />
                          إضافة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline">عرض جميع المنتجات ({vendor.products})</Button>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">عن المحل</h3>
                <p className="text-muted-foreground mb-6">{vendor.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">معلومات المحل</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{vendor.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{vendor.workingHours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>التوصيل: {vendor.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">التخصصات</h4>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {vendorReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{review.user.charAt(0)}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              مشتري موثق
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline">عرض جميع التقييمات ({vendor.reviews})</Button>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">معلومات التواصل</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">رقم الهاتف</p>
                      <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                    </div>
                    <Button size="sm" className="mr-auto">
                      اتصال
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">واتساب</p>
                      <p className="text-sm text-muted-foreground">{vendor.whatsapp}</p>
                    </div>
                    <Button size="sm" variant="outline" className="mr-auto bg-transparent">
                      مراسلة
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">العنوان</p>
                      <p className="text-sm text-muted-foreground">{vendor.address}</p>
                    </div>
                    <Button size="sm" variant="outline" className="mr-auto bg-transparent">
                      خريطة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
