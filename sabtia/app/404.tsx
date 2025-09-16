import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-sage-200 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-sage-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-sage-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal mb-2">الصفحة غير موجودة</h1>
          <p className="text-sage-600 mb-1">عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها</p>
          <p className="text-sm text-sage-500">Page Not Found</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-accent hover:bg-accent/90">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              العودة للرئيسية
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/products" className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              تصفح المنتجات
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-6 border-t border-sage-200">
          <p className="text-sm text-sage-500 mb-3">هل تحتاج مساعدة؟</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/help" className="text-accent hover:text-accent/80">
              مركز المساعدة
            </Link>
            <Link href="/contact" className="text-accent hover:text-accent/80">
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
