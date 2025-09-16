import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Star, MapPin, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "@/components/language-toggle"
import { ProductCard } from "@/components/product-card"

async function getCategories() {
  try {
    const res = await fetch('http://localhost:8000/api/categories', { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const res = await fetch('http://localhost:8000/api/products?featured=true', { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

async function getTopVendors() {
  try {
    const res = await fetch('http://localhost:8000/api/vendors?top=true', { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch top vendors:', error);
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();
  const topVendors = await getTopVendors();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">السَبْتِيّة</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input placeholder="ابحث في السبتية..." className="pl-12 pr-4 py-3 text-lg" />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link href="/wishlist">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input placeholder="ابحث في السبتية..." className="pl-12 pr-4 py-3" />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">مرحباً بك في السَبْتِيّة</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            السوق الإلكتروني الأول لتجار شارع السبتية في القاهرة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="marketplace-button">
                تسوق الآن
              </Button>
            </Link>
            <Link href="/auth/signup?type=vendor">
              <Button size="lg" variant="outline">
                انضم كتاجر
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">تصفح الأقسام</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="marketplace-card hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h4 className="font-semibold mb-2">{category.name_ar}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold">المنتجات المميزة</h3>
            <Button variant="outline">عرض الكل</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={{
                id: product.id,
                name: product.name_ar,
                price: product.price,
                originalPrice: product.original_price,
                vendor: 'محل السبتية', // Placeholder
                rating: product.rating,
                reviews: product.total_reviews,
                image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
                badge: product.is_featured ? 'مميز' : null,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">أفضل التجار</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVendors.map((vendor, index) => (
              <Card key={index} className="marketplace-card">
                <CardContent className="p-6 text-center">
                  <img
                    src={vendor.shop_logo || "/placeholder.svg"}
                    alt={vendor.shop_name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-lg mb-2">{vendor.shop_name}</h4>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vendor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{vendor.total_products || 0} منتج</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.shop_address}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-12 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">عروض خاصة هذا الأسبوع</h3>
          <p className="text-lg text-muted-foreground mb-6">خصومات تصل إلى 50% على مختارات من المنتجات</p>
          <Link href="/products">
            <Button size="lg" className="marketplace-button">
              اكتشف العروض
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold text-primary mb-4">السَبْتِيّة</h4>
              <p className="text-muted-foreground mb-4">السوق الإلكتروني الأول لتجار شارع السبتية في القاهرة</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+20 123 456 789</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">روابط سريعة</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-primary transition-colors">
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="hover:text-primary transition-colors">
                    التجار
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    من نحن
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">خدمة العملاء</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    الأسئلة الشائعة
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    سياسة الإرجاع
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    الشحن والتوصيل
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">للتجار</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/auth/signup?type=vendor" className="hover:text-primary transition-colors">
                    انضم كتاجر
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/dashboard" className="hover:text-primary transition-colors">
                    لوحة التحكم
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/products" className="hover:text-primary transition-colors">
                    إدارة المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    الدعم الفني
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 السَبْتِيّة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
