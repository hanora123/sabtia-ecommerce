import { Card, CardContent } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 bg-muted rounded w-32 mb-2"></div>
            <div className="h-4 bg-muted rounded w-48"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-muted rounded w-24"></div>
            <div className="h-8 bg-muted rounded w-20"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="h-10 bg-muted rounded mb-6"></div>

        {/* Notifications Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-5 bg-muted rounded w-48"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-full mb-3"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-20"></div>
                      <div className="h-6 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
