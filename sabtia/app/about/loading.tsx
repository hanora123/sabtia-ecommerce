import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-8" />
          <Skeleton className="h-8 w-48 mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="text-center">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 mx-auto mb-3" />
                <Skeleton className="h-8 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section Skeleton */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>

        {/* Features Section Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-48 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <Skeleton className="h-12 w-12 mx-auto mb-4" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section Skeleton */}
        <Card className="mb-16">
          <CardContent className="p-8 text-center">
            <Skeleton className="h-6 w-24 mx-auto mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mx-auto mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardContent>
        </Card>

        {/* Contact Section Skeleton */}
        <div className="text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-3" />
                  <Skeleton className="h-5 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
