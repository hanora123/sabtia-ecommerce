"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, TrendingDown, TrendingUp, Target, AlertCircle, Check, X } from "lucide-react"
import { toast } from "sonner"

interface PriceAlert {
  id: string
  productId: string
  productName: string
  productNameAr: string
  productImage: string
  currentPrice: number
  targetPrice: number
  isActive: boolean
  createdAt: Date
  triggeredAt?: Date
}

interface PriceTrackerProps {
  productId: string
  productName: string
  productNameAr: string
  productImage: string
  currentPrice: number
  originalPrice?: number
  className?: string
}

export default function PriceTracker({
  productId,
  productName,
  productNameAr,
  productImage,
  currentPrice,
  originalPrice,
  className,
}: PriceTrackerProps) {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [targetPrice, setTargetPrice] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [priceHistory, setPriceHistory] = useState<{ date: Date; price: number }[]>([])
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    setIsRTL(document.documentElement.dir === "rtl")
    loadPriceAlerts()
    loadPriceHistory()
  }, [productId])

  const loadPriceAlerts = () => {
    try {
      const stored = localStorage.getItem("price-alerts")
      if (stored) {
        const allAlerts = JSON.parse(stored).map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt),
          triggeredAt: alert.triggeredAt ? new Date(alert.triggeredAt) : undefined,
        }))

        const productAlerts = allAlerts.filter((alert: PriceAlert) => alert.productId === productId)
        setAlerts(productAlerts)
        setIsTracking(productAlerts.some((alert: PriceAlert) => alert.isActive))
      }
    } catch (error) {
      console.error("Error loading price alerts:", error)
    }
  }

  const loadPriceHistory = () => {
    try {
      const stored = localStorage.getItem(`price-history-${productId}`)
      if (stored) {
        const history = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        }))
        setPriceHistory(history)
      } else {
        // Initialize with current price
        const initialHistory = [{ date: new Date(), price: currentPrice }]
        setPriceHistory(initialHistory)
        localStorage.setItem(`price-history-${productId}`, JSON.stringify(initialHistory))
      }
    } catch (error) {
      console.error("Error loading price history:", error)
    }
  }

  const createPriceAlert = () => {
    const target = Number.parseFloat(targetPrice)

    if (!target || target <= 0) {
      toast.error(isRTL ? "يرجى إدخال سعر صحيح" : "Please enter a valid price")
      return
    }

    if (target >= currentPrice) {
      toast.error(
        isRTL ? "السعر المستهدف يجب أن يكون أقل من السعر الحالي" : "Target price must be lower than current price",
      )
      return
    }

    try {
      const newAlert: PriceAlert = {
        id: Date.now().toString(),
        productId,
        productName,
        productNameAr,
        productImage,
        currentPrice,
        targetPrice: target,
        isActive: true,
        createdAt: new Date(),
      }

      const stored = localStorage.getItem("price-alerts")
      const allAlerts = stored ? JSON.parse(stored) : []
      allAlerts.push(newAlert)

      localStorage.setItem("price-alerts", JSON.stringify(allAlerts))
      setAlerts([...alerts, newAlert])
      setIsTracking(true)
      setTargetPrice("")

      toast.success(isRTL ? "تم إنشاء تنبيه السعر بنجاح!" : "Price alert created successfully!")
    } catch (error) {
      console.error("Error creating price alert:", error)
      toast.error(isRTL ? "فشل في إنشاء تنبيه السعر" : "Failed to create price alert")
    }
  }

  const toggleAlert = (alertId: string) => {
    try {
      const stored = localStorage.getItem("price-alerts")
      if (stored) {
        const allAlerts = JSON.parse(stored).map((alert: PriceAlert) => {
          if (alert.id === alertId) {
            return { ...alert, isActive: !alert.isActive }
          }
          return alert
        })

        localStorage.setItem("price-alerts", JSON.stringify(allAlerts))

        const updatedAlerts = alerts.map((alert) => {
          if (alert.id === alertId) {
            return { ...alert, isActive: !alert.isActive }
          }
          return alert
        })

        setAlerts(updatedAlerts)
        setIsTracking(updatedAlerts.some((alert) => alert.isActive))
      }
    } catch (error) {
      console.error("Error toggling alert:", error)
    }
  }

  const removeAlert = (alertId: string) => {
    try {
      const stored = localStorage.getItem("price-alerts")
      if (stored) {
        const allAlerts = JSON.parse(stored).filter((alert: PriceAlert) => alert.id !== alertId)
        localStorage.setItem("price-alerts", JSON.stringify(allAlerts))

        const updatedAlerts = alerts.filter((alert) => alert.id !== alertId)
        setAlerts(updatedAlerts)
        setIsTracking(updatedAlerts.some((alert) => alert.isActive))
      }
    } catch (error) {
      console.error("Error removing alert:", error)
    }
  }

  const getPriceChange = () => {
    if (originalPrice && originalPrice !== currentPrice) {
      const change = ((currentPrice - originalPrice) / originalPrice) * 100
      return {
        percentage: Math.abs(change),
        isIncrease: change > 0,
        amount: Math.abs(currentPrice - originalPrice),
      }
    }

    if (priceHistory.length > 1) {
      const previousPrice = priceHistory[priceHistory.length - 2].price
      const change = ((currentPrice - previousPrice) / previousPrice) * 100
      return {
        percentage: Math.abs(change),
        isIncrease: change > 0,
        amount: Math.abs(currentPrice - previousPrice),
      }
    }

    return null
  }

  const priceChange = getPriceChange()

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5" />
          {isRTL ? "تتبع السعر" : "Price Tracker"}
          {isTracking && (
            <Badge variant="secondary" className="text-xs">
              <Bell className="w-3 h-3 mr-1" />
              {isRTL ? "نشط" : "Active"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Price & Change */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">{isRTL ? "السعر الحالي" : "Current Price"}</p>
            <p className="text-xl font-bold text-green-600">
              {currentPrice} {isRTL ? "ج.م" : "EGP"}
            </p>
          </div>

          {priceChange && (
            <div className={`flex items-center gap-1 ${priceChange.isIncrease ? "text-red-500" : "text-green-500"}`}>
              {priceChange.isIncrease ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{priceChange.percentage.toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Create New Alert */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">{isRTL ? "إنشاء تنبيه سعر جديد" : "Create New Price Alert"}</Label>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={isRTL ? "السعر المستهدف" : "Target price"}
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="flex-1"
            />
            <Button onClick={createPriceAlert} disabled={!targetPrice}>
              <Bell className="w-4 h-4 mr-2" />
              {isRTL ? "إنشاء" : "Create"}
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            {isRTL
              ? "سيتم إرسال تنبيه عندما ينخفض السعر إلى المبلغ المحدد أو أقل"
              : "You'll be notified when the price drops to this amount or lower"}
          </p>
        </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">{isRTL ? "التنبيهات النشطة" : "Active Alerts"}</Label>

            <div className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />

                    <div>
                      <p className="text-sm font-medium">
                        {alert.targetPrice} {isRTL ? "ج.م" : "EGP"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isRTL ? "تم الإنشاء:" : "Created:"} {alert.createdAt.toLocaleDateString()}
                      </p>
                    </div>

                    {alert.targetPrice >= currentPrice && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        {isRTL ? "تم الوصول" : "Reached"}
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlert(alert.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price History Summary */}
        {priceHistory.length > 1 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{isRTL ? "ملخص تاريخ الأسعار" : "Price History Summary"}</Label>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-gray-600">{isRTL ? "أعلى سعر" : "Highest"}</p>
                <p className="font-medium">
                  {Math.max(...priceHistory.map((h) => h.price))} {isRTL ? "ج.م" : "EGP"}
                </p>
              </div>

              <div className="p-2 bg-gray-50 rounded">
                <p className="text-gray-600">{isRTL ? "أقل سعر" : "Lowest"}</p>
                <p className="font-medium">
                  {Math.min(...priceHistory.map((h) => h.price))} {isRTL ? "ج.م" : "EGP"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            {isRTL
              ? "يتم فحص الأسعار يومياً. ستتلقى إشعاراً عند انخفاض السعر إلى المستوى المطلوب."
              : "Prices are checked daily. You'll receive a notification when the price drops to your target level."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
