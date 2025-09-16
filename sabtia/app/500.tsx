"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw, ArrowRight } from "lucide-react"

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 500 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-red-200 mb-4">500</div>
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-16 h-16 text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal mb-2">خطأ في الخادم</h1>
          <p className="text-red-600 mb-1">عذراً، حدث خطأ غير متوقع في الخادم</p>
          <p className="text-sm text-red-500">Internal Server Error</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700">
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة تحميل الصفحة
          </Button>

          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              العودة للرئيسية
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-6 border-t border-red-200">
          <p className="text-sm text-red-500 mb-3">المشكلة مستمرة؟</p>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/help" className="text-accent hover:text-accent/80">
              مركز المساعدة
            </Link>
            <Link href="/contact" className="text-accent hover:text-accent/80">
              تبليغ عن مشكلة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
