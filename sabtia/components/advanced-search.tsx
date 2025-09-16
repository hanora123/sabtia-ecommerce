"use client"

import { useState } from "react"
import { Search, Filter, X, ChevronDown, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

interface SearchFilters {
  query: string
  category: string
  priceRange: [number, number]
  rating: number
  location: string
  availability: string
  sortBy: string
}

export default function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    location: "",
    availability: "all",
    sortBy: "relevance",
  })

  const categories = [
    "أدوات",
    "أقمشة",
    "إلكترونيات",
    "مواد بناء",
    "قطع غيار",
    "أجهزة منزلية",
    "ملابس",
    "أحذية",
    "إكسسوارات",
  ]

  const locations = ["شارع السبتية", "وسط البلد", "الأزهر", "الجمالية", "باب الشعرية"]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "",
      priceRange: [0, 1000],
      rating: 0,
      location: "",
      availability: "all",
      sortBy: "relevance",
    })
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) =>
      value !== "" &&
      value !== "all" &&
      value !== "relevance" &&
      (Array.isArray(value) ? value[0] !== 0 || value[1] !== 1000 : value !== 0),
  ).length

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="ابحث عن المنتجات والتجار..."
          value={filters.query}
          onChange={(e) => handleFilterChange("query", e.target.value)}
          className="pr-10 pl-4 h-12 text-right"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 gap-2"
        >
          <Filter className="w-4 h-4" />
          فلترة
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {isOpen && (
        <Card className="p-6 mb-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">فلاتر البحث المتقدم</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 ml-2" />
              مسح الكل
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">الفئة</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full p-2 border rounded-md text-right"
              >
                <option value="">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">الموقع</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full p-2 border rounded-md text-right"
              >
                <option value="">جميع المواقع</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">التوفر</label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.value)}
                className="w-full p-2 border rounded-md text-right"
              >
                <option value="all">الكل</option>
                <option value="available">متوفر</option>
                <option value="out-of-stock">غير متوفر</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              نطاق السعر: {filters.priceRange[0]} - {filters.priceRange[1]} جنيه
            </label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              max={1000}
              step={10}
              className="w-full"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">التقييم الأدنى</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={filters.rating >= rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("rating", rating)}
                  className="gap-1"
                >
                  <Star className="w-4 h-4" />
                  {rating}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium mb-2">ترتيب حسب</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full p-2 border rounded-md text-right"
            >
              <option value="relevance">الأكثر صلة</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">التقييم</option>
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر شعبية</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => setIsOpen(false)} className="flex-1">
              تطبيق الفلاتر
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              إعادة تعيين
            </Button>
          </div>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("category", "")} />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="w-3 h-3" />
              {filters.location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("location", "")} />
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Star className="w-3 h-3" />
              {filters.rating}+ نجوم
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("rating", 0)} />
            </Badge>
          )}
          {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
            <Badge variant="secondary" className="gap-1">
              {filters.priceRange[0]} - {filters.priceRange[1]} جنيه
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleFilterChange("priceRange", [0, 1000])} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
