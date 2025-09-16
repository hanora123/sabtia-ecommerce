"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Smartphone, Key, AlertTriangle, CheckCircle, Eye, EyeOff, Clock, MapPin } from "lucide-react"

export default function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const recentActivity = [
    {
      id: 1,
      action: "تسجيل دخول",
      device: "iPhone 13",
      location: "القاهرة، مصر",
      time: "منذ ساعتين",
      status: "success",
    },
    {
      id: 2,
      action: "تغيير كلمة المرور",
      device: "MacBook Pro",
      location: "القاهرة، مصر",
      time: "أمس",
      status: "success",
    },
    {
      id: 3,
      action: "محاولة دخول فاشلة",
      device: "جهاز غير معروف",
      location: "الإسكندرية، مصر",
      time: "منذ 3 أيام",
      status: "warning",
    },
  ]

  const connectedDevices = [
    {
      id: 1,
      name: "iPhone 13",
      type: "mobile",
      lastActive: "نشط الآن",
      location: "القاهرة، مصر",
    },
    {
      id: 2,
      name: "MacBook Pro",
      type: "desktop",
      lastActive: "منذ ساعة",
      location: "القاهرة، مصر",
    },
    {
      id: 3,
      name: "Chrome - Windows",
      type: "browser",
      lastActive: "منذ يومين",
      location: "الجيزة، مصر",
    },
  ]

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePasswordSubmit = () => {
    // Handle password change logic
    console.log("Password change submitted")
  }

  const handleDeviceLogout = (deviceId: number) => {
    // Handle device logout logic
    console.log("Logging out device:", deviceId)
  }

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            تغيير كلمة المرور
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                className="text-right pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                className="text-right pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور الجديدة</label>
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
              className="text-right"
            />
          </div>

          <Button onClick={handlePasswordSubmit} className="w-full">
            تحديث كلمة المرور
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            المصادقة الثنائية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">تفعيل المصادقة الثنائية</h4>
              <p className="text-sm text-gray-600">حماية إضافية لحسابك باستخدام تطبيق المصادقة</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">المصادقة الثنائية مفعلة</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                حسابك محمي بالمصادقة الثنائية. ستحتاج إلى رمز من تطبيق المصادقة عند تسجيل الدخول.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  عرض رموز الاحتياط
                </Button>
                <Button variant="outline" size="sm">
                  إعادة تكوين
                </Button>
              </div>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">المصادقة الثنائية غير مفعلة</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-3">ننصح بتفعيل المصادقة الثنائية لحماية أفضل لحسابك</p>
              <Button size="sm">
                <Key className="w-4 h-4 ml-2" />
                إعداد المصادقة الثنائية
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            تنبيهات الأمان
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">تنبيهات تسجيل الدخول</h4>
              <p className="text-sm text-gray-600">تلقي إشعار عند تسجيل الدخول من جهاز جديد</p>
            </div>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            النشاط الأخير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{activity.device}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            الأجهزة المتصلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{device.lastActive}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{device.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.lastActive === "نشط الآن" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      نشط
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleDeviceLogout(device.id)}>
                    تسجيل خروج
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
