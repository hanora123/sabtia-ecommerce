import { type NextRequest, NextResponse } from "next/server"

// GET /api/vendors - Fetch vendors with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sortBy") || "rating"

    // Mock vendors data
    const mockVendors = [
      {
        id: "1",
        shop_name: "محل أحمد للأدوات",
        shop_description: "أدوات عالية الجودة للورش والمنازل منذ 1995",
        shop_logo: "/tools-shop-owner.jpg",
        shop_address: "شارع السبتية، القاهرة",
        shop_phone: "+201111111111",
        rating: 4.5,
        total_reviews: 25,
        total_products: 45,
        is_verified: true,
        categories: ["أدوات", "قطع غيار"],
        created_at: "2020-01-15T00:00:00Z",
      },
      {
        id: "2",
        shop_name: "أقمشة فاطمة",
        shop_description: "أقمشة فاخرة وخامات متنوعة للخياطة والتفصيل",
        shop_logo: "/fabric-shop-owner-woman.jpg",
        shop_address: "شارع السبتية، القاهرة",
        shop_phone: "+201222222222",
        rating: 4.3,
        total_reviews: 18,
        total_products: 32,
        is_verified: true,
        categories: ["أقمشة"],
        created_at: "2019-06-20T00:00:00Z",
      },
      {
        id: "3",
        shop_name: "سباكة عمر",
        shop_description: "مستلزمات السباكة والصرف الصحي بأفضل الأسعار",
        shop_logo: "/plumbing-shop-owner-man.jpg",
        shop_address: "شارع السبتية، القاهرة",
        shop_phone: "+201333333333",
        rating: 4.7,
        total_reviews: 31,
        total_products: 28,
        is_verified: true,
        categories: ["سباكة", "مواد بناء"],
        created_at: "2018-03-10T00:00:00Z",
      },
    ]

    // Apply filters
    let filteredVendors = mockVendors

    if (search) {
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.shop_name.includes(search) || vendor.shop_description.includes(search),
      )
    }

    if (category) {
      filteredVendors = filteredVendors.filter((vendor) => vendor.categories.some((cat) => cat.includes(category)))
    }

    // Sort vendors
    filteredVendors.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.total_reviews - a.total_reviews
        case "products":
          return b.total_products - a.total_products
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return b.rating - a.rating
      }
    })

    // Pagination
    const offset = (page - 1) * limit
    const paginatedVendors = filteredVendors.slice(offset, offset + limit)

    return NextResponse.json({
      vendors: paginatedVendors,
      pagination: {
        page,
        limit,
        total: filteredVendors.length,
        totalPages: Math.ceil(filteredVendors.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching vendors:", error)
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}
