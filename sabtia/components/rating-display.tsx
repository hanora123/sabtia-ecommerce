"use client"

import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating: number
  maxRating?: number
  showNumber?: boolean
  size?: "sm" | "md" | "lg"
  reviewCount?: number
}

export default function RatingDisplay({
  rating,
  maxRating = 5,
  showNumber = true,
  size = "md",
  reviewCount,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      {/* Stars */}
      <div className="flex items-center space-x-0.5 space-x-reverse">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= Math.floor(rating)
          const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0

          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalfFilled
                    ? "fill-yellow-200 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
              }`}
            />
          )
        })}
      </div>

      {/* Rating Number */}
      {showNumber && <span className={`${textSizeClasses[size]} font-medium text-gray-700`}>{rating.toFixed(1)}</span>}

      {/* Review Count */}
      {reviewCount !== undefined && (
        <span className={`${textSizeClasses[size]} text-muted-foreground`}>({reviewCount} تقييم)</span>
      )}
    </div>
  )
}
