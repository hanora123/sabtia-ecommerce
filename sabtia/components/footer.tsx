import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">السَبْتِيّة</h3>
            <p className="text-gray-300 mb-4">
              منصة التجارة الإلكترونية الأولى لتجار شارع السبتية في القاهرة. نربط التجار المحليين بالعملاء في جميع أنحاء
              مصر.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-green-400">
                  المساعدة
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-green-400">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-green-400">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الفئات</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/tools" className="text-gray-300 hover:text-green-400">
                  أدوات ومعدات
                </Link>
              </li>
              <li>
                <Link href="/categories/fabrics" className="text-gray-300 hover:text-green-400">
                  أقمشة ونسيج
                </Link>
              </li>
              <li>
                <Link href="/categories/electronics" className="text-gray-300 hover:text-green-400">
                  إلكترونيات
                </Link>
              </li>
              <li>
                <Link href="/categories/plumbing" className="text-gray-300 hover:text-green-400">
                  سباكة وصحي
                </Link>
              </li>
              <li>
                <Link href="/categories/automotive" className="text-gray-300 hover:text-green-400">
                  قطع غيار سيارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">معلومات التواصل</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">شارع السبتية، القاهرة، مصر</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">+20 2 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">info@sabtiah.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 السَبْتِيّة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
