import { Card, CardContent } from "@/components/ui/card"

export default function CompareLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="space-y-2 mb-6">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
