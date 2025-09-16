import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function VendorLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image Skeleton */}
      <Skeleton className="h-64 md:h-80 w-full" />

      {/* Vendor Info Skeleton */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-32 h-32 rounded-full" />

              <div className="flex-1">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="h-6 w-12 mx-auto mb-1" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="aspect-square rounded-t-lg" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-24 mb-2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
