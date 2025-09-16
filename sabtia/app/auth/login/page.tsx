"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, User, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageToggle } from "@/components/language-toggle"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("customer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        // TODO: Handle session/token
        console.log("Logged in user:", data.user)
        window.location.href = "/account"
      } else {
        const data = await res.json()
        setError(data.error || "An error occurred.")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <a href="/" className="text-2xl font-bold text-primary">
                السَبْتِيّة
              </a>
            </div>

            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">مرحباً بعودتك</h1>
            <p className="text-muted-foreground">سجل دخولك للمتابعة</p>
          </div>

          <Card className="marketplace-card">
            <CardHeader>
              <Tabs value={userType} onValueChange={setUserType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="customer" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    عميل
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    تاجر
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleLogin}>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                  <Label htmlFor="email">البريد الإلكتروني أو رقم الهاتف</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      تذكرني
                    </Label>
                  </div>
                  <a href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>

                <Button type="submit" className="w-full marketplace-button" size="lg" disabled={loading}>
                  {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">ليس لديك حساب؟ </span>
                <a href="/auth/signup" className="text-sm text-primary hover:underline font-medium">
                  إنشاء حساب جديد
                </a>
              </div>

              {userType === "vendor" && (
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <h3 className="font-semibold text-secondary mb-2">للتجار الجدد</h3>
                  <p className="text-sm text-muted-foreground mb-3">انضم إلى السبتية وابدأ بيع منتجاتك لآلاف العملاء</p>
                  <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                    <a href="/auth/signup?type=vendor">طلب انضمام كتاجر</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            بتسجيل الدخول، أنت توافق على{" "}
            <a href="/terms" className="text-primary hover:underline">
              شروط الخدمة
            </a>{" "}
            و{" "}
            <a href="/privacy" className="text-primary hover:underline">
              سياسة الخصوصية
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
