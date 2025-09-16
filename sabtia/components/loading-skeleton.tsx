interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({ className = "", variant = "rectangular", width, height, lines = 1 }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 rounded"

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded",
  }

  const style = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses.text} ${
              index === lines - 1 ? "w-3/4" : "w-full"
            } ${index > 0 ? "mt-2" : ""}`}
            style={index === 0 ? style : undefined}
          />
        ))}
      </div>
    )
  }

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton variant="text" lines={2} className="mb-2" />
        <div className="flex items-center justify-between mb-2">
          <Skeleton width={80} height={20} />
          <Skeleton width={60} height={20} />
        </div>
        <Skeleton width="100%" height={36} className="mt-4" />
      </div>
    </div>
  )
}

// Vendor Card Skeleton
export function VendorCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="text" lines={3} className="mb-4" />
      <div className="flex gap-2">
        <Skeleton width={80} height={32} />
        <Skeleton width={100} height={32} />
      </div>
    </div>
  )
}

// Order Item Skeleton
export function OrderItemSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <Skeleton width={80} height={80} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" className="mb-2" />
          <Skeleton variant="text" width="40%" className="mb-2" />
          <div className="flex items-center justify-between">
            <Skeleton width={60} height={20} />
            <Skeleton width={80} height={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton width="40%" height={32} className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
