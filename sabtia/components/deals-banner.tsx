"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Clock, Zap, Gift, Percent } from "lucide-react"

interface Deal {
  id: string
  title: string
  titleEn: string
  description: string
  discount: number
  validUntil: string
  type: "flash" | "daily" | "weekend" | "special"
  color: string
}

export default function DealsBanner() {
  const [currentDeal, setCurrentDeal] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState("")

  const deals: Deal[] = [
    {
      id: "1",
      title: "عرض البرق ⚡",
      titleEn: "Flash Sale",
      description: "خصم 30% على جميع الأدوات",
      discount: 30,
      validUntil: "2024-12-20T23:59:59",
      type: "flash",
      color: "bg-red-500",
    },
    {
      id: "2",
      title: "عرض نهاية الأسبوع",
      titleEn: "Weekend Deal",
      description: "توصيل مجاني + خصم 15%",
      discount: 15,
      validUntil: "2024-12-22T23:59:59",
      type: "weekend",
      color: "bg-blue-500",
    },
    {
      id: "3",
      title: "عرض خاص للعملاء الجدد",
      titleEn: "New Customer Special",
      description: "خصم 25% على أول طلب",
      discount: 25,
      validUntil: "2024-12-31T23:59:59",
      type: "special",
      color: "bg-green-500",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "flash":
        return Zap
      case "daily":
        return Clock
      case "weekend":
        return Gift
      case "special":
        return Percent
      default:
        return Gift
    }
  }

  const calculateTimeLeft = (validUntil: string) => {
    const difference = +new Date(validUntil) - +new Date()

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)

      if (days > 0) {
        return `${days} يوم ${hours} ساعة`
      } else if (hours > 0) {
        return `${hours} ساعة ${minutes} دقيقة`
      } else {
        return `${minutes} دقيقة`
      }
    }
    return "انتهى العرض"
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deals[currentDeal].validUntil))
    }, 60000) // Update every minute

    setTimeLeft(calculateTimeLeft(deals[currentDeal].validUntil))

    return () => clearInterval(timer)
  }, [currentDeal, deals])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeal((prev) => (prev + 1) % deals.length)
    }, 5000) // Change deal every 5 seconds

    return () => clearInterval(interval)
  }, [deals.length])

  if (!isVisible) return null

  const deal = deals[currentDeal]
  const Icon = getIcon(deal.type)

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 shadow-lg">
      <div className={`absolute inset-0 ${deal.color} opacity-10`} />
      <CardContent className="relative p-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 left-2 h-6 w-6 p-0 hover:bg-background/80"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${deal.color} text-white`}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Badge variant="secondary" className="text-xs">
                {deal.titleEn}
              </Badge>
              <h3 className="font-bold text-lg">{deal.title}</h3>
            </div>
            <p className="text-muted-foreground mb-2">{deal.description}</p>

            <div className="flex items-center gap-4 justify-end">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{deal.discount}%</div>
                <div className="text-xs text-muted-foreground">خصم</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-semibold text-orange-600">{timeLeft}</div>
                <div className="text-xs text-muted-foreground">متبقي</div>
              </div>
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90">تسوق الآن</Button>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-1 mt-4 justify-center">
          {deals.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-colors ${index === currentDeal ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
