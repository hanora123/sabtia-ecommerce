"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-1 space-x-reverse text-sm text-muted-foreground mb-4">
      <Link href="/" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">الرئيسية</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 space-x-reverse">
          <ChevronRight className="h-4 w-4 rotate-180" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
