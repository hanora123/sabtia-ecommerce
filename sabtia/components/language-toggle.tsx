"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const [isArabic, setIsArabic] = useState(true)

  const toggleLanguage = () => {
    setIsArabic(!isArabic)
    const html = document.documentElement
    if (isArabic) {
      html.setAttribute("lang", "en")
      html.setAttribute("dir", "ltr")
    } else {
      html.setAttribute("lang", "ar")
      html.setAttribute("dir", "rtl")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 bg-transparent">
      <Globe className="h-4 w-4" />
      {isArabic ? "English" : "العربية"}
    </Button>
  )
}
