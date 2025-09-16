"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react"

interface Review {
  id: number
  user: string
  avatar?: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
  images?: string[]
}

interface ReviewsSectionProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  canReview?: boolean
}

export default function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  canReview = false,
}: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 20, percentage: 27 },
    { stars: 3, count: 8, percentage: 11 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle>التقييمات والمراجعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
              {renderStars(averageRating)}
              <p className="text-sm text-muted-foreground mt-2">بناءً على {totalReviews} تقييم</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm w-8">{item.stars} نجوم</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Button */}
          {canReview && (
            <div className="mt-6 pt-6 border-t">
              <Button onClick={() => setShowReviewForm(!showReviewForm)} className="w-full md:w-auto">
                {showReviewForm ? "إلغاء" : "اكتب تقييماً"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>اكتب تقييمك</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">التقييم</label>
              {renderStars(newRating, true, setNewRating)}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">التعليق</label>
              <Textarea
                placeholder="شاركنا تجربتك مع هذا المنتج..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button disabled={newRating === 0 || !newComment.trim()}>نشر التقييم</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false)
                  setNewRating(0)
                  setNewComment("")
                }}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                  <AvatarFallback>{review.user[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        مشتري موثق
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">{renderStars(review.rating)}</div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                      <ThumbsUp className="h-4 w-4" />
                      مفيد ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                      <ThumbsDown className="h-4 w-4" />
                      غير مفيد
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500">
                      <Flag className="h-4 w-4" />
                      إبلاغ
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <Button variant="outline">عرض المزيد من التقييمات</Button>
      </div>
    </div>
  )
}
