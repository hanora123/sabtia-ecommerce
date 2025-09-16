"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  title: string
  type: "product" | "vendor" | "category"
  image?: string
  price?: number
}

interface AutocompleteSearchProps {
  placeholder?: string
  onSelect: (result: SearchResult) => void
  onSearch?: (query: string) => void
}

export function AutocompleteSearch({
  placeholder = "ابحث عن المنتجات والبائعين...",
  onSelect,
  onSearch,
}: AutocompleteSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Mock search results - in real app, this would be an API call
  const mockResults: SearchResult[] = [
    { id: "1", title: "مفك براغي متعدد الأحجام", type: "product", price: 25 },
    { id: "2", title: "قماش قطني أزرق", type: "product", price: 15 },
    { id: "3", title: "محل أدوات أحمد", type: "vendor" },
    { id: "4", title: "أدوات كهربائية", type: "category" },
    { id: "5", title: "كابل USB 2 متر", type: "product", price: 10 },
  ]

  useEffect(() => {
    if (query.length > 0) {
      // Simulate API search
      const filtered = mockResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      setResults(filtered)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex])
        } else if (query) {
          onSearch?.(query)
          setIsOpen(false)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = (result: SearchResult) => {
    onSelect(result)
    setQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "منتج"
      case "vendor":
        return "بائع"
      case "category":
        return "فئة"
      default:
        return ""
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-green-100 text-green-800"
      case "vendor":
        return "bg-blue-100 text-blue-800"
      case "category":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="pr-10 pl-10 text-right"
          dir="rtl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {results.map((result, index) => (
            <div
              key={result.id}
              onClick={() => handleSelect(result)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                index === selectedIndex ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-right">
                  <div className="font-medium text-gray-900">{result.title}</div>
                  {result.price && <div className="text-sm text-green-600 font-semibold mt-1">{result.price} جنيه</div>}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(result.type)}`}>
                  {getTypeLabel(result.type)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 text-center text-gray-500">
          لا توجد نتائج للبحث "{query}"
        </div>
      )}
    </div>
  )
}
