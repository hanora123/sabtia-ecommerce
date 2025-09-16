import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Category Header Skeleton */}
      <div className="bg-gradient-to-l from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-6 w-96 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-10 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="aspect-square rounded-t-lg" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-3 w-32 mb-2" />
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
    </div>
  )
}
