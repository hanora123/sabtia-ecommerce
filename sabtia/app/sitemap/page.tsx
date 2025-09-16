import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const siteStructure = {
  "الصفحات الرئيسية": [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات", href: "/products" },
    { name: "التجار", href: "/vendors" },
    { name: "البحث", href: "/search" },
    { name: "مقارنة المنتجات", href: "/compare" },
  ],
  "الحساب والمستخدم": [
    { name: "تسجيل الدخول", href: "/auth/login" },
    { name: "إنشاء حساب", href: "/auth/signup" },
    { name: "حسابي", href: "/account" },
    { name: "طلباتي", href: "/orders" },
    { name: "المفضلة", href: "/wishlist" },
    { name: "الإشعارات", href: "/notifications" },
  ],
  التسوق: [
    { name: "السلة", href: "/cart" },
    { name: "الدفع", href: "/checkout" },
    { name: "تتبع الطلب", href: "/orders/track" },
  ],
  التجار: [
    { name: "لوحة التاجر", href: "/vendor/dashboard" },
    { name: "إدارة المنتجات", href: "/vendor/products" },
    { name: "إدارة الطلبات", href: "/vendor/orders" },
  ],
  الإدارة: [
    { name: "لوحة الإدارة", href: "/admin/dashboard" },
    { name: "إدارة المستخدمين", href: "/admin/users" },
    { name: "إدارة التجار", href: "/admin/vendors" },
  ],
  "المساعدة والدعم": [
    { name: "المساعدة", href: "/help" },
    { name: "اتصل بنا", href: "/contact" },
    { name: "من نحن", href: "/about" },
  ],
  القانونية: [
    { name: "الشروط والأحكام", href: "/terms" },
    { name: "سياسة الخصوصية", href: "/privacy" },
  ],
}

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">خريطة الموقع</h1>
          <p className="text-gray-600">جميع صفحات منصة السَبْتِيّة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(siteStructure).map(([section, links]) => (
            <Card key={section}>
              <CardHeader>
                <CardTitle className="text-lg">{section}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">إجمالي الصفحات: {Object.values(siteStructure).flat().length} صفحة</p>
        </div>
      </div>
    </div>
  )
}
