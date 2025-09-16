"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Package, Users, ShoppingCart, Heart, User, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "المنتجات", href: "/products", icon: Package },
  { name: "التجار", href: "/vendors", icon: Users },
  { name: "السلة", href: "/cart", icon: ShoppingCart, badge: 3 },
  { name: "المفضلة", href: "/wishlist", icon: Heart, badge: 5 },
  { name: "الحساب", href: "/account", icon: User },
]

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            السَبْتِيّة
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-green-600 transition-colors relative"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Search and Notifications */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                2
              </Badge>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-green-600">السَبْتِيّة</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Search className="w-4 h-4 ml-2" />
                    بحث
                  </Button>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Bell className="w-4 h-4" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                      2
                    </Badge>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
