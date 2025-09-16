"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
  alt?: string
  className?: string
}

export function ImageGallery({ images, alt = "صورة المنتج", className = "" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
  }

  const nextModalImage = () => {
    setModalIndex((prev) => (prev + 1) % images.length)
  }

  const prevModalImage = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-400">لا توجد صور</span>
      </div>
    )
  }

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Image */}
        <div className="relative group">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${alt} ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-lg cursor-zoom-in"
            onClick={() => openModal(currentIndex)}
          />

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openModal(currentIndex)}
              className="bg-white/80 hover:bg-white"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? "border-green-500" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${alt} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Modal Image */}
            <img
              src={images[modalIndex] || "/placeholder.svg"}
              alt={`${alt} ${modalIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Modal Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {modalIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
