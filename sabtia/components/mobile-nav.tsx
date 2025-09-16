"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingCart, Heart, User, Package, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const bottomNavItems = [
  { href: "/", icon: Home, label: "الرئيسية", labelEn: "Home" },
  { href: "/search", icon: Search, label: "البحث", labelEn: "Search" },
  { href: "/cart", icon: ShoppingCart, label: "السلة", labelEn: "Cart", badge: 3 },
  { href: "/wishlist", icon: Heart, label: "المفضلة", labelEn: "Wishlist", badge: 5 },
  { href: "/account", icon: User, label: "حسابي", labelEn: "Account" },
]

const sideMenuItems = [
  { href: "/products", icon: Package, label: "المنتجات", labelEn: "Products" },
  { href: "/vendors", icon: User, label: "التجار", labelEn: "Vendors" },
  { href: "/orders", icon: Package, label: "طلباتي", labelEn: "My Orders" },
  { href: "/notifications", icon: Bell, label: "الإشعارات", labelEn: "Notifications", badge: 2 },
  { href: "/help", icon: Menu, label: "المساعدة", labelEn: "Help" },
  { href: "/about", icon: Menu, label: "عن السبتية", labelEn: "About" },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="p-2 bg-transparent">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">القائمة</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="space-y-2">
              {sideMenuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="mr-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* User Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">أحمد محمد</p>
                  <p className="text-sm text-muted-foreground">ahmed@example.com</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-16 md:hidden" />
    </>
  )
}
