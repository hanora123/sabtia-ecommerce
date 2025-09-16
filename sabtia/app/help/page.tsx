import { Search, Phone, Mail, MessageCircle, Book, Shield, Truck, CreditCard, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Book,
      title: "دليل الاستخدام",
      description: "تعلم كيفية استخدام السوق الإلكتروني",
      color: "text-blue-600",
    },
    {
      icon: Truck,
      title: "الشحن والتوصيل",
      description: "معلومات عن طرق الشحن والتوصيل",
      color: "text-green-600",
    },
    {
      icon: CreditCard,
      title: "الدفع والفواتير",
      description: "طرق الدفع المتاحة وإدارة الفواتير",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "إدارة الحساب",
      description: "تعديل البيانات الشخصية وإعدادات الحساب",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      title: "الأمان والخصوصية",
      description: "حماية حسابك وبياناتك الشخصية",
      color: "text-red-600",
    },
    {
      icon: Settings,
      title: "للبائعين",
      description: "دليل البائعين وإدارة المتاجر",
      color: "text-teal-600",
    },
  ]

  const faqs = [
    {
      question: "كيف يمكنني إنشاء حساب جديد؟",
      answer:
        "يمكنك إنشاء حساب جديد بالضغط على زر 'إنشاء حساب' في أعلى الصفحة، ثم ملء البيانات المطلوبة مثل الاسم والبريد الإلكتروني ورقم الهاتف.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نوفر طريقتين للدفع: الدفع عند الاستلام (الطريقة المفضلة) والدفع بالبطاقة الائتمانية. جميع المعاملات آمنة ومحمية.",
    },
    {
      question: "كم تستغرق عملية التوصيل؟",
      answer: "التوصيل عادة يستغرق من 1-3 أيام عمل داخل القاهرة. يمكنك أيضاً اختيار الاستلام من المتجر مباشرة مجاناً.",
    },
    {
      question: "هل يمكنني إرجاع المنتجات؟",
      answer:
        "نعم، يمكنك إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام بشرط أن تكون في حالتها الأصلية. تواصل مع خدمة العملاء لبدء عملية الإرجاع.",
    },
    {
      question: "كيف يمكنني تتبع طلبي؟",
      answer:
        "بعد تأكيد الطلب، ستحصل على رقم تتبع عبر الرسائل النصية والبريد الإلكتروني. يمكنك استخدام هذا الرقم لتتبع حالة طلبك.",
    },
    {
      question: "كيف أصبح بائعاً في السوق؟",
      answer:
        "للانضمام كبائع، اضغط على 'انضم كبائع' وقم بملء طلب الانضمام. سيتم مراجعة طلبك خلال 2-3 أيام عمل والتواصل معك.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">مركز المساعدة</h1>
          <p className="text-xl text-muted-foreground mb-8">نحن هنا لمساعدتك في أي وقت</p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input placeholder="ابحث عن إجابة..." className="pr-10 text-right" />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">اتصل بنا</h3>
              <p className="text-muted-foreground mb-4">متاح 24/7</p>
              <Button variant="outline" className="w-full bg-transparent">
                01234567890
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <MessageCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">دردشة مباشرة</h3>
              <p className="text-muted-foreground mb-4">رد فوري</p>
              <Button variant="outline" className="w-full bg-transparent">
                ابدأ المحادثة
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Mail className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">البريد الإلكتروني</h3>
              <p className="text-muted-foreground mb-4">رد خلال 24 ساعة</p>
              <Button variant="outline" className="w-full bg-transparent">
                support@sabtiah.com
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">كيف يمكننا مساعدتك؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${category.color}`} />
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">الأسئلة الشائعة</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Need Help */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">لم تجد ما تبحث عنه؟</h3>
            <p className="text-muted-foreground mb-6">فريق خدمة العملاء جاهز لمساعدتك في أي وقت</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <MessageCircle className="w-4 h-4 ml-2" />
                تواصل معنا
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 ml-2" />
                أرسل رسالة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
