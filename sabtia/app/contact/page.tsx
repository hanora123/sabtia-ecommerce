"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "اتصل بنا",
      subtitle: "Call Us",
      value: "+20 2 1234 5678",
      description: "متاح من 9 صباحاً حتى 6 مساءً",
      available: true,
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      subtitle: "WhatsApp",
      value: "+20 10 1234 5678",
      description: "رد سريع خلال دقائق",
      available: true,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      subtitle: "Email",
      value: "support@sabtiah.com",
      description: "رد خلال 24 ساعة",
      available: true,
    },
    {
      icon: MapPin,
      title: "العنوان",
      subtitle: "Address",
      value: "شارع السبتية، القاهرة",
      description: "El-Sabtiah Street, Cairo",
      available: false,
    },
  ]

  const inquiryTypes = [
    { value: "general", label: "استفسار عام", subtitle: "General Inquiry" },
    { value: "vendor", label: "أريد أن أصبح بائع", subtitle: "Become a Vendor" },
    { value: "order", label: "مشكلة في الطلب", subtitle: "Order Issue" },
    { value: "technical", label: "مشكلة تقنية", subtitle: "Technical Issue" },
    { value: "partnership", label: "شراكة تجارية", subtitle: "Business Partnership" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">تواصل معنا</h1>
          <p className="text-xl text-muted-foreground mb-2">Contact Us</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا في أي وقت وسنرد عليك في أسرع وقت ممكن
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">طرق التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card/50">
                    <div
                      className={`p-2 rounded-lg ${method.available ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <h3 className="font-semibold">{method.title}</h3>
                        {method.available && (
                          <Badge variant="secondary" className="text-xs">
                            متاح
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{method.subtitle}</p>
                      <p className="font-medium text-foreground">{method.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right flex items-center gap-2 justify-end">
                  <Clock className="w-5 h-5" />
                  ساعات العمل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sun - Thu</span>
                  <span className="font-medium">الأحد - الخميس</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
                  <span className="text-sm">9 صباحاً - 6 مساءً</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="font-medium">الجمعة</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">2:00 PM - 6:00 PM</span>
                  <span className="text-sm">2 ظهراً - 6 مساءً</span>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-red-600">السبت - مغلق</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">أرسل لنا رسالة</CardTitle>
                <p className="text-muted-foreground text-right">Send us a message</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-muted-foreground">سنرد عليك في أسرع وقت ممكن</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-right">نوع الاستفسار</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.value })}
                            className={`p-3 rounded-lg border text-right transition-colors ${
                              formData.type === type.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.subtitle}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-right">الاسم *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="اسمك الكامل"
                          className="text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-right">رقم الهاتف</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+20 10 1234 5678"
                          className="text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-right">البريد الإلكتروني *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-right">الموضوع *</label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="موضوع رسالتك"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-right">الرسالة *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        className="text-right"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-right">الأسئلة الشائعة</CardTitle>
            <p className="text-muted-foreground text-right">Frequently Asked Questions</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-right">كيف يمكنني أن أصبح بائع؟</h4>
                  <p className="text-sm text-muted-foreground text-right">
                    يمكنك التسجيل كبائع من خلال صفحة التسجيل واختيار "بائع" كنوع الحساب
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-right">ما هي طرق الدفع المتاحة؟</h4>
                  <p className="text-sm text-muted-foreground text-right">
                    نقبل الدفع عند الاستلام والدفع بالبطاقات الائتمانية
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-right">كم تستغرق عملية التوصيل؟</h4>
                  <p className="text-sm text-muted-foreground text-right">عادة من 1-3 أيام عمل حسب موقعك ونوع المنتج</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-right">هل يمكنني إرجاع المنتج؟</h4>
                  <p className="text-sm text-muted-foreground text-right">
                    نعم، يمكنك إرجاع المنتج خلال 7 أيام من تاريخ الاستلام
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
