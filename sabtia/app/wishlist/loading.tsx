import { Card, CardContent } from "@/components/ui/card"

export default function WishlistLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 text-center">
                <div className="h-8 bg-muted rounded w-12 mx-auto mb-1"></div>
                <div className="h-4 bg-muted rounded w-20 mx-auto"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wishlist Items Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 bg-muted"></div>
                  <div className="flex-1 p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-muted rounded w-24"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-muted rounded w-20"></div>
                        <div className="h-8 bg-muted rounded w-24"></div>
                      </div>
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
