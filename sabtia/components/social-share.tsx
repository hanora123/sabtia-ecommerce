"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, MessageCircle, Facebook, Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface SocialShareProps {
  url?: string
  title?: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  image?: string
  price?: number
  vendor?: string
  vendorAr?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export default function SocialShare({
  url,
  title,
  titleAr,
  description,
  descriptionAr,
  image,
  price,
  vendor,
  vendorAr,
  className,
  size = "md",
  variant = "outline",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isRTL, setIsRTL] = useState(false)

  // Get current URL if not provided
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  // Check RTL
  React.useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl")
  }, [])

  const shareTitle = isRTL ? titleAr || title : title || titleAr
  const shareDescription = isRTL ? descriptionAr || description : description || descriptionAr
  const shareVendor = isRTL ? vendorAr || vendor : vendor || vendorAr

  const formatWhatsAppMessage = () => {
    let message = ""

    if (shareTitle) {
      message += `*${shareTitle}*\n\n`
    }

    if (shareDescription) {
      message += `${shareDescription}\n\n`
    }

    if (price) {
      message += `💰 ${isRTL ? "السعر:" : "Price:"} ${price} ${isRTL ? "ج.م" : "EGP"}\n`
    }

    if (shareVendor) {
      message += `🏪 ${isRTL ? "البائع:" : "Vendor:"} ${shareVendor}\n`
    }

    message += `\n🛒 ${isRTL ? "تسوق الآن من السبتية:" : "Shop now on El-Sabtiah:"}\n${shareUrl}`

    return encodeURIComponent(message)
  }

  const formatFacebookMessage = () => {
    let message = shareTitle || ""
    if (shareDescription) {
      message += ` - ${shareDescription}`
    }
    if (price) {
      message += ` | ${price} ${isRTL ? "ج.م" : "EGP"}`
    }
    return encodeURIComponent(message)
  }

  const copyToClipboard = async () => {
    try {
      let textToCopy = shareUrl

      if (shareTitle || shareDescription || price) {
        textToCopy = `${shareTitle || ""}\n${shareDescription || ""}\n`
        if (price) {
          textToCopy += `${isRTL ? "السعر:" : "Price:"} ${price} ${isRTL ? "ج.م" : "EGP"}\n`
        }
        if (shareVendor) {
          textToCopy += `${isRTL ? "البائع:" : "Vendor:"} ${shareVendor}\n`
        }
        textToCopy += `\n${shareUrl}`
      }

      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success(isRTL ? "تم نسخ الرابط!" : "Link copied!")

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error(isRTL ? "فشل في نسخ الرابط" : "Failed to copy link")
    }
  }

  const shareViaWhatsApp = () => {
    const message = formatWhatsAppMessage()
    const whatsappUrl = `https://wa.me/?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const shareViaFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${formatFacebookMessage()}`
    window.open(fbUrl, "_blank", "width=600,height=400")
  }

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled")
      }
    }
  }

  const hasNativeShare = typeof navigator !== "undefined" && navigator.share

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          {isRTL ? "مشاركة" : "Share"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
        <DropdownMenuItem onClick={shareViaWhatsApp} className="cursor-pointer">
          <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
          {isRTL ? "واتساب" : "WhatsApp"}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareViaFacebook} className="cursor-pointer">
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          {isRTL ? "فيسبوك" : "Facebook"}
        </DropdownMenuItem>

        {hasNativeShare && (
          <DropdownMenuItem onClick={shareViaNative} className="cursor-pointer">
            <Share2 className="w-4 h-4 mr-2" />
            {isRTL ? "مشاركة أخرى" : "More Options"}
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? (isRTL ? "تم النسخ!" : "Copied!") : isRTL ? "نسخ الرابط" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
