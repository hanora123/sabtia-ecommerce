"use client"

import { useState, useEffect } from "react"
import { Bell, Package, Star, ShoppingCart, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "order" | "review" | "stock" | "promotion"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ["order", "review", "stock", "promotion"][Math.floor(Math.random() * 4)] as any,
        title: "إشعار جديد",
        message: "لديك طلب جديد من أحمد محمد",
        timestamp: new Date(),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      setUnreadCount((prev) => prev + 1)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4" />
      case "review":
        return <Star className="w-4 h-4" />
      case "stock":
        return <AlertCircle className="w-4 h-4" />
      case "promotion":
        return <ShoppingCart className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-right">الإشعارات</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">لا توجد إشعارات جديدة</div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3 text-right">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{notification.timestamp.toLocaleString("ar-EG")}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
