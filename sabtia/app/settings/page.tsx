"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Globe, Moon, Sun, Lock, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile Settings
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,

    // Privacy Settings
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,

    // App Settings
    language: "ar",
    theme: "light",
    currency: "EGP",
  })

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "privacy", label: "الخصوصية", icon: Shield },
    { id: "app", label: "إعدادات التطبيق", icon: Globe },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الإعدادات</h1>
          <p className="text-gray-600">إدارة حسابك وتفضيلاتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-right transition-colors ${
                          activeTab === tab.id
                            ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    معلومات الملف الشخصي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                      <Input
                        value={settings.name}
                        onChange={(e) => handleSettingChange("name", e.target.value)}
                        className="text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange("email", e.target.value)}
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                    <Input
                      value={settings.phone}
                      onChange={(e) => handleSettingChange("phone", e.target.value)}
                      className="text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="اتركها فارغة إذا لم ترد تغييرها"
                        className="text-right pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button className="w-full">حفظ التغييرات</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">تلقي الإشعارات عبر البريد الإلكتروني</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إشعارات الرسائل النصية</h4>
                        <p className="text-sm text-gray-600">تلقي الإشعارات عبر الرسائل النصية</p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">الإشعارات الفورية</h4>
                        <p className="text-sm text-gray-600">تلقي الإشعارات الفورية في التطبيق</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">تحديثات الطلبات</h4>
                        <p className="text-sm text-gray-600">إشعارات حول حالة طلباتك</p>
                      </div>
                      <Switch
                        checked={settings.orderUpdates}
                        onCheckedChange={(checked) => handleSettingChange("orderUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">العروض والخصومات</h4>
                        <p className="text-sm text-gray-600">إشعارات حول العروض الخاصة</p>
                      </div>
                      <Switch
                        checked={settings.promotions}
                        onCheckedChange={(checked) => handleSettingChange("promotions", checked)}
                      />
                    </div>
                  </div>

                  <Button className="w-full">حفظ الإعدادات</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    إعدادات الخصوصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">مستوى الخصوصية</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
                      className="w-full p-2 border rounded-md text-right"
                    >
                      <option value="public">عام - يمكن للجميع رؤية ملفك</option>
                      <option value="private">خاص - مخفي عن الآخرين</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إظهار البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">السماح للآخرين برؤية بريدك الإلكتروني</p>
                      </div>
                      <Switch
                        checked={settings.showEmail}
                        onCheckedChange={(checked) => handleSettingChange("showEmail", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إظهار رقم الهاتف</h4>
                        <p className="text-sm text-gray-600">السماح للآخرين برؤية رقم هاتفك</p>
                      </div>
                      <Switch
                        checked={settings.showPhone}
                        onCheckedChange={(checked) => handleSettingChange("showPhone", checked)}
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">أمان الحساب</h4>
                    <p className="text-sm text-yellow-700 mb-3">قم بتفعيل المصادقة الثنائية لحماية إضافية لحسابك</p>
                    <Button variant="outline" size="sm">
                      <Lock className="w-4 h-4 ml-2" />
                      تفعيل المصادقة الثنائية
                    </Button>
                  </div>

                  <Button className="w-full">حفظ الإعدادات</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "app" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    إعدادات التطبيق
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">اللغة</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange("language", e.target.value)}
                      className="w-full p-2 border rounded-md text-right"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">المظهر</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={settings.theme === "light" ? "default" : "outline"}
                        onClick={() => handleSettingChange("theme", "light")}
                        className="gap-2"
                      >
                        <Sun className="w-4 h-4" />
                        فاتح
                      </Button>
                      <Button
                        variant={settings.theme === "dark" ? "default" : "outline"}
                        onClick={() => handleSettingChange("theme", "dark")}
                        className="gap-2"
                      >
                        <Moon className="w-4 h-4" />
                        داكن
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">العملة</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange("currency", e.target.value)}
                      className="w-full p-2 border rounded-md text-right"
                    >
                      <option value="EGP">جنيه مصري (EGP)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                      <option value="EUR">يورو (EUR)</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">معلومات التطبيق</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p>الإصدار: 1.0.0</p>
                      <p>آخر تحديث: 15 ديسمبر 2024</p>
                      <p>حجم التطبيق: 12.5 ميجابايت</p>
                    </div>
                  </div>

                  <Button className="w-full">حفظ الإعدادات</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
