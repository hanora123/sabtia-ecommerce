import { Card, CardContent } from "@/components/ui/card"

export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-muted rounded w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-muted rounded w-80 mx-auto mb-8"></div>
          <div className="max-w-md mx-auto">
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>

        {/* Contact Options Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-5 bg-muted rounded w-20 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-16 mx-auto mb-4"></div>
                <div className="h-8 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories Skeleton */}
        <div className="mb-12">
          <div className="h-6 bg-muted rounded w-48 mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4"></div>
                  <div className="h-5 bg-muted rounded w-24 mx-auto mb-2"></div>
                  <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="h-6 bg-muted rounded w-32 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
