import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Database, Lock, Users, Globe, AlertCircle, Phone } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "المعلومات التي نجمعها",
      subtitle: "Information We Collect",
      content: [
        "معلومات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف",
        "معلومات الطلبات: تفاصيل المشتريات والعناوين",
        "معلومات الاستخدام: كيفية تفاعلك مع المنصة",
        "معلومات الجهاز: نوع المتصفح، عنوان IP، نظام التشغيل",
      ],
    },
    {
      icon: Eye,
      title: "كيف نستخدم معلوماتك",
      subtitle: "How We Use Your Information",
      content: [
        "معالجة الطلبات وتوفير الخدمات المطلوبة",
        "التواصل معك بخصوص طلباتك وحسابك",
        "تحسين تجربة المستخدم وتطوير المنصة",
        "إرسال العروض والتحديثات (يمكنك إلغاء الاشتراك)",
      ],
    },
    {
      icon: Users,
      title: "مشاركة المعلومات",
      subtitle: "Information Sharing",
      content: [
        "مع البائعين: معلومات الطلب والتوصيل فقط",
        "مع شركات التوصيل: العنوان ومعلومات الاتصال",
        "مع السلطات: عند الطلب القانوني فقط",
        "لا نبيع معلوماتك الشخصية لأطراف ثالثة",
      ],
    },
    {
      icon: Lock,
      title: "أمان المعلومات",
      subtitle: "Data Security",
      content: [
        "تشفير جميع البيانات الحساسة أثناء النقل والتخزين",
        "استخدام بروتوكولات أمان متقدمة (SSL/TLS)",
        "مراجعة دورية لأنظمة الأمان والحماية",
        "تدريب الموظفين على أفضل ممارسات الأمان",
      ],
    },
    {
      icon: Shield,
      title: "حقوقك في البيانات",
      subtitle: "Your Data Rights",
      content: [
        "الحق في الوصول إلى بياناتك الشخصية",
        "الحق في تصحيح أو تحديث معلوماتك",
        "الحق في حذف حسابك وبياناتك",
        "الحق في نقل بياناتك إلى منصة أخرى",
      ],
    },
    {
      icon: Globe,
      title: "ملفات تعريف الارتباط",
      subtitle: "Cookies & Tracking",
      content: [
        "نستخدم ملفات تعريف الارتباط لتحسين تجربتك",
        "ملفات تعريف ضرورية لعمل المنصة بشكل صحيح",
        "ملفات تعريف تحليلية لفهم استخدام المنصة",
        "يمكنك التحكم في إعدادات ملفات تعريف الارتباط",
      ],
    },
  ]

  const dataTypes = [
    { type: "معلومات الحساب", retention: "5 سنوات بعد إغلاق الحساب", purpose: "إدارة الحساب والخدمات" },
    { type: "سجل الطلبات", retention: "7 سنوات للأغراض المحاسبية", purpose: "معالجة الطلبات والدعم" },
    { type: "بيانات الاستخدام", retention: "2 سنة", purpose: "تحليل وتحسين المنصة" },
    { type: "معلومات الدفع", retention: "لا نحتفظ بها", purpose: "معالجة المدفوعات فقط" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">سياسة الخصوصية</h1>
          <p className="text-xl text-muted-foreground mb-2">Privacy Policy</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary">آخر تحديث: 15 ديسمبر 2024</Badge>
            <Badge variant="outline">Last Updated: Dec 15, 2024</Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نحن في السبتية نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. هذه السياسة توضح كيف نجمع ونستخدم ونحمي
            بياناتك.
          </p>
        </div>

        {/* Privacy Sections */}
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

        {/* Data Retention Table */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2 justify-end">
              <AlertCircle className="w-5 h-5" />
              فترات الاحتفاظ بالبيانات
            </CardTitle>
            <p className="text-muted-foreground text-right">Data Retention Periods</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 font-semibold">نوع البيانات</th>
                    <th className="py-3 px-4 font-semibold">فترة الاحتفاظ</th>
                    <th className="py-3 px-4 font-semibold">الغرض</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTypes.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-medium">{item.type}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.retention}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Privacy */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2 justify-end">
              <Phone className="w-5 h-5" />
              تواصل معنا بخصوص الخصوصية
            </CardTitle>
            <p className="text-muted-foreground text-right">Privacy Contact Information</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div>
                <h4 className="font-semibold mb-2">مسؤول حماية البيانات:</h4>
                <p className="text-muted-foreground">privacy@sabtiah.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">للاستفسارات الأمنية:</h4>
                <p className="text-muted-foreground">security@sabtiah.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">طلبات حذف البيانات:</h4>
                <p className="text-muted-foreground">delete@sabtiah.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">الهاتف:</h4>
                <p className="text-muted-foreground">+20 2 1234 5678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <div className="text-center mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4">حقوقك محفوظة</h3>
          <p className="text-muted-foreground mb-4">
            يمكنك في أي وقت طلب الوصول إلى بياناتك أو تعديلها أو حذفها. نحن ملتزمون بالاستجابة لطلباتك خلال 30 يوماً.
          </p>
          <Badge variant="secondary" className="text-sm">
            نحن ملتزمون بقوانين حماية البيانات المصرية والدولية
          </Badge>
        </div>
      </div>
    </div>
  )
}
