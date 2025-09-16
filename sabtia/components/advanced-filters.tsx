"use client"

import { useState } from "react"
import { Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  rating: number
  availability: string[]
  vendors: string[]
  features: string[]
}

const categories = ["أدوات ومعدات", "أقمشة ونسيج", "إلكترونيات", "سباكة وصحي", "قطع غيار سيارات", "مواد بناء"]

const vendors = [
  "محل أحمد للأدوات",
  "محل السباكة الحديثة",
  "متجر الأقمشة الفاخرة",
  "محل الإلكترونيات",
  "ورشة قطع الغيار",
]

const features = ["ضمان", "توصيل مجاني", "خصم", "منتج جديد", "الأكثر مبيعاً"]

export default function AdvancedFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    availability: [],
    vendors: [],
    features: [],
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleVendorChange = (vendor: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      vendors: checked ? [...prev.vendors, vendor] : prev.vendors.filter((v) => v !== vendor),
    }))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      features: checked ? [...prev.features, feature] : prev.features.filter((f) => f !== feature),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      availability: [],
      vendors: [],
      features: [],
    })
  }

  const getActiveFiltersCount = () => {
    return (
      filters.categories.length +
      filters.vendors.length +
      filters.features.length +
      (filters.rating > 0 ? 1 : 0) +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0)
    )
  }

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse"
      >
        <Filter className="w-4 h-4" />
        <span>فلترة متقدمة</span>
        {getActiveFiltersCount() > 0 && (
          <Badge variant="secondary" className="ml-2">
            {getActiveFiltersCount()}
          </Badge>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {/* Filters Panel */}
      {isOpen && (
        <Card className="absolute top-12 left-0 z-50 w-80 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">فلترة النتائج</CardTitle>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                مسح الكل
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-3">الفئات</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-semibold mb-3">نطاق السعر</h4>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
                  max={1000}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{filters.priceRange[0]} ج.م</span>
                  <span>{filters.priceRange[1]} ج.م</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-semibold mb-3">التقييم</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          rating: checked ? rating : 0,
                        }))
                      }
                    />
                    <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                      {rating} نجوم فأكثر
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors */}
            <div>
              <h4 className="font-semibold mb-3">التجار</h4>
              <div className="space-y-2">
                {vendors.map((vendor) => (
                  <div key={vendor} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={vendor}
                      checked={filters.vendors.includes(vendor)}
                      onCheckedChange={(checked) => handleVendorChange(vendor, checked as boolean)}
                    />
                    <label htmlFor={vendor} className="text-sm cursor-pointer">
                      {vendor}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-3">المميزات</h4>
              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={feature}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              تطبيق الفلاتر ({getActiveFiltersCount()})
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
