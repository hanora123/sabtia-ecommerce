"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
}

export default function Pagination({ currentPage, totalPages, onPageChange, showFirstLast = true }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 space-x-reverse">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-1 space-x-reverse"
      >
        <ChevronRight className="h-4 w-4" />
        <span>السابق</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1 space-x-reverse">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <div className="flex items-center justify-center w-8 h-8">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-1 space-x-reverse"
      >
        <span>التالي</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Info */}
      <div className="text-sm text-muted-foreground mr-4">
        صفحة {currentPage} من {totalPages}
      </div>
    </div>
  )
}
