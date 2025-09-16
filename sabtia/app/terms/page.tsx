import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollText, Shield, Users, CreditCard, Truck, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      icon: ScrollText,
      title: "الشروط العامة",
      subtitle: "General Terms",
      content: [
        "باستخدام منصة السبتية، فإنك توافق على هذه الشروط والأحكام",
        "يجب أن تكون 18 سنة أو أكثر لاستخدام المنصة",
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت",
        "استخدام المنصة يخضع للقوانين المصرية",
      ],
    },
    {
      icon: Users,
      title: "حسابات المستخدمين",
      subtitle: "User Accounts",
      content: [
        "يجب تقديم معلومات صحيحة ومحدثة عند التسجيل",
        "أنت مسؤول عن الحفاظ على سرية كلمة المرور",
        "يُمنع مشاركة الحساب مع أشخاص آخرين",
        "نحتفظ بالحق في إيقاف الحسابات المخالفة",
      ],
    },
    {
      icon: CreditCard,
      title: "الدفع والأسعار",
      subtitle: "Payment & Pricing",
      content: [
        "جميع الأسعار معروضة بالجنيه المصري شاملة الضرائب",
        "نقبل الدفع عند الاستلام والدفع الإلكتروني",
        "قد تطبق رسوم إضافية للتوصيل حسب المنطقة",
        "الأسعار قابلة للتغيير دون إشعار مسبق",
      ],
    },
    {
      icon: Truck,
      title: "التوصيل والإرجاع",
      subtitle: "Delivery & Returns",
      content: [
        "مدة التوصيل من 1-3 أيام عمل داخل القاهرة",
        "يمكن إرجاع المنتجات خلال 7 أيام من الاستلام",
        "المنتجات المرتجعة يجب أن تكون في حالتها الأصلية",
        "تكلفة الإرجاع على المشتري إلا في حالة العيوب",
      ],
    },
    {
      icon: Shield,
      title: "مسؤولية البائعين",
      subtitle: "Vendor Responsibilities",
      content: [
        "البائعون مسؤولون عن جودة ووصف منتجاتهم",
        "يجب الالتزام بمعايير الخدمة المحددة",
        "ممنوع بيع المنتجات المحظورة أو المقلدة",
        "نحتفظ بالحق في إزالة المنتجات المخالفة",
      ],
    },
    {
      icon: AlertTriangle,
      title: "إخلاء المسؤولية",
      subtitle: "Disclaimer",
      content: [
        "المنصة وسيط بين البائعين والمشترين",
        "لا نتحمل مسؤولية جودة المنتجات المباعة",
        "المعاملات تتم على مسؤولية الأطراف",
        "نسعى لحل النزاعات بطريقة عادلة",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">الشروط والأحكام</h1>
          <p className="text-xl text-muted-foreground mb-2">Terms & Conditions</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary">آخر تحديث: 15 ديسمبر 2024</Badge>
            <Badge variant="outline">Last Updated: Dec 15, 2024</Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة السبتية. باستخدام المنصة، فإنك توافق على الالتزام
            بهذه الشروط.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-3 text-right">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-right">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-right">تواصل معنا</CardTitle>
            <p className="text-muted-foreground text-right">Contact Information</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div>
                <h4 className="font-semibold mb-2">للاستفسارات القانونية:</h4>
                <p className="text-muted-foreground">legal@sabtiah.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">للدعم الفني:</h4>
                <p className="text-muted-foreground">support@sabtiah.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">العنوان:</h4>
                <p className="text-muted-foreground">شارع السبتية، القاهرة، مصر</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">الهاتف:</h4>
                <p className="text-muted-foreground">+20 2 1234 5678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agreement */}
        <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg max-w-4xl mx-auto">
          <p className="text-muted-foreground">
            باستخدام منصة السبتية، فإنك تؤكد أنك قرأت وفهمت ووافقت على هذه الشروط والأحكام. إذا كان لديك أي أسئلة، يرجى
            التواصل معنا.
          </p>
        </div>
      </div>
    </div>
  )
}
