"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, User, Store, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { LanguageToggle } from "@/components/language-toggle"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("customer")

  const [customerForm, setCustomerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [vendorForm, setVendorForm] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'vendor') {
      setUserType('vendor')
    }
  }, [searchParams])

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerForm({ ...customerForm, [e.target.id]: e.target.value })
  }

  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVendorForm({ ...vendorForm, [e.target.id]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const isCustomer = userType === "customer"
    const formData = isCustomer ? customerForm : vendorForm
    const name = isCustomer ? `${formData.firstName} ${formData.lastName}` : vendorForm.ownerName

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email: formData.email, password: formData.password }),
      })

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...")
        setTimeout(() => {
          window.location.href = "/auth/login"
        }, 2000)
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
            <h1 className="text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground">انضم إلى السبتية اليوم</p>
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
              <form onSubmit={handleSignup}>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                <TabsContent value="customer" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input id="firstName" placeholder="أحمد" value={customerForm.firstName} onChange={handleCustomerChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">اسم العائلة</Label>
                      <Input id="lastName" placeholder="محمد" value={customerForm.lastName} onChange={handleCustomerChange} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="example@email.com" value={customerForm.email} onChange={handleCustomerChange} required />
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="01xxxxxxxxx" value={customerForm.phone} onChange={handleCustomerChange} />
                  </div>

                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="أدخل كلمة المرور" value={customerForm.password} onChange={handleCustomerChange} required />
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

                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        value={customerForm.confirmPassword}
                        onChange={handleCustomerChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-4 mt-0">
                  <div>
                    <Label htmlFor="shopName">اسم المتجر</Label>
                    <Input id="shopName" placeholder="محل أحمد للأدوات" value={vendorForm.shopName} onChange={handleVendorChange} required />
                  </div>

                  <div>
                    <Label htmlFor="ownerName">اسم صاحب المتجر</Label>
                    <Input id="ownerName" placeholder="أحمد محمد" value={vendorForm.ownerName} onChange={handleVendorChange} required />
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="shop@email.com" value={vendorForm.email} onChange={handleVendorChange} required />
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="01xxxxxxxxx" value={vendorForm.phone} onChange={handleVendorChange} />
                  </div>

                  <div>
                    <Label htmlFor="location">عنوان المتجر</Label>
                    <Input id="location" placeholder="شارع السبتية - المحل رقم XX" value={vendorForm.location} onChange={handleVendorChange} />
                  </div>

                  <div>
                    <Label htmlFor="description">وصف المتجر</Label>
                    <Textarea id="description" placeholder="وصف مختصر عن متجرك ومنتجاتك" rows={3} value={vendorForm.description} onChange={handleVendorChange} />
                  </div>

                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={vendorForm.password}
                        onChange={handleVendorChange}
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

                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        value={vendorForm.confirmPassword}
                        onChange={handleVendorChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <h3 className="font-semibold text-secondary mb-2">متطلبات التاجر</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-secondary" />
                        محل فعلي في شارع السبتية
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-secondary" />
                        سجل تجاري ساري المفعول
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-secondary" />
                        التزام بمعايير الجودة
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    أوافق على{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      شروط الخدمة
                    </a>{" "}
                    و{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </a>
                  </Label>
                </div>

                <Button type="submit" className="w-full marketplace-button" size="lg" disabled={loading}>
                  {loading ? "جاري الإنشاء..." : (userType === "customer" ? "إنشاء حساب" : "طلب انضمام كتاجر")}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">لديك حساب بالفعل؟ </span>
                <a href="/auth/login" className="text-sm text-primary hover:underline font-medium">
                  تسجيل الدخول
                </a>
              </div>

              {userType === "vendor" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>ملاحظة:</strong> طلبات التجار تخضع للمراجعة والموافقة. سيتم التواصل معك خلال 24-48 ساعة.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
