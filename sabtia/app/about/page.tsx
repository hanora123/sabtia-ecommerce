import { MapPin, Users, Package, Award, Heart, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { icon: Users, label: "التجار المسجلين", labelEn: "Registered Vendors", value: "150+" },
  { icon: Package, label: "المنتجات المتاحة", labelEn: "Available Products", value: "5000+" },
  { icon: Award, label: "سنوات الخبرة", labelEn: "Years of Experience", value: "25+" },
  { icon: Heart, label: "عملاء راضون", labelEn: "Happy Customers", value: "10000+" },
]

const features = [
  {
    icon: Package,
    title: "منتجات أصلية",
    titleEn: "Authentic Products",
    description: "جميع المنتجات أصلية ومضمونة من التجار المحليين",
  },
  {
    icon: Users,
    title: "تجار موثوقون",
    titleEn: "Trusted Vendors",
    description: "نختار التجار بعناية لضمان أفضل جودة وخدمة",
  },
  {
    icon: MapPin,
    title: "توصيل سريع",
    titleEn: "Fast Delivery",
    description: "توصيل سريع وآمن لجميع أنحاء القاهرة",
  },
  {
    icon: Award,
    title: "أسعار منافسة",
    titleEn: "Competitive Prices",
    description: "أفضل الأسعار مباشرة من التجار بدون وسطاء",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">عن السَبْتِيّة</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            منصة إلكترونية تربط بين تجار شارع السبتية في القاهرة والعملاء، لتسهيل التسوق وتطوير التجارة المحلية
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <MapPin className="h-4 w-4 ml-2" />
            شارع السبتية، القاهرة
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">قصة السبتية</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                شارع السبتية في القاهرة هو واحد من أعرق الشوارع التجارية في المدينة، حيث يضم مئات المحلات التي تبيع كل
                شيء من الأدوات والمعدات إلى الأقمشة والإكسسوارات.
              </p>
              <p>
                لأكثر من 25 عاماً، كان هذا الشارع مقصداً للباحثين عن الجودة والأسعار المناسبة، ولكن مع التطور التكنولوجي،
                أردنا أن نجلب هذه التجربة الفريدة إلى العالم الرقمي.
              </p>
              <p>
                منصة السبتية تهدف إلى دعم التجار المحليين وتسهيل وصول العملاء إلى منتجاتهم المتنوعة، مع الحفاظ على روح
                التجارة التقليدية والثقة المتبادلة.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/tools-shop-interior.jpg"
              alt="شارع السبتية"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">لماذا تختار السبتية؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">رسالتنا</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              نسعى لتطوير التجارة المحلية في مصر من خلال توفير منصة إلكترونية حديثة تربط بين التجار والعملاء، مع الحفاظ
              على القيم التقليدية للتجارة المصرية من صدق وأمانة وجودة في الخدمة.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">تواصل معنا</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">اتصل بنا</h3>
                <p className="text-muted-foreground">+20 100 123 4567</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">راسلنا</h3>
                <p className="text-muted-foreground">info@sabtiah.com</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">ابدأ التسوق الآن</Button>
            <Button variant="outline" size="lg">
              انضم كتاجر
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
