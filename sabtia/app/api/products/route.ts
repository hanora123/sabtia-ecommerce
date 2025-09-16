import { type NextRequest, NextResponse } from "next/server"

// GET /api/products - Fetch products with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "created_at"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Mock data for demonstration
    const mockProducts = [
      {
        id: "1",
        name_ar: "مفك براغي مجموعة 6 قطع",
        name_en: "Screwdriver Set 6 Pieces",
        price: 45.0,
        original_price: 60.0,
        rating: 4.5,
        total_reviews: 12,
        images: ["/screwdriver-set-6-pieces.jpg"],
        vendor: {
          id: "1",
          shop_name: "محل أحمد للأدوات",
          rating: 4.5,
        },
        category: {
          name_ar: "أدوات",
          name_en: "Tools",
        },
        stock_quantity: 15,
        is_featured: true,
      },
      {
        id: "2",
        name_ar: "قماش قطني أزرق",
        name_en: "Blue Cotton Fabric",
        price: 25.0,
        rating: 4.2,
        total_reviews: 8,
        images: ["/blue-cotton-fabric.jpg"],
        vendor: {
          id: "2",
          shop_name: "أقمشة فاطمة",
          rating: 4.3,
        },
        category: {
          name_ar: "أقمشة",
          name_en: "Fabrics",
        },
        stock_quantity: 50,
        is_featured: false,
      },
    ]

    // Apply filters (in real app, this would be database queries)
    let filteredProducts = mockProducts

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category.name_en.toLowerCase() === category.toLowerCase())
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) => p.name_ar.includes(search) || p.name_en.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseFloat(maxPrice))
    }

    // Pagination
    const offset = (page - 1) * limit
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create new product (vendor only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In real app, validate user authentication and vendor status
    // const user = await getCurrentUser(request)
    // if (!user || user.user_type !== 'vendor') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const {
      name_ar,
      name_en,
      description_ar,
      description_en,
      price,
      original_price,
      stock_quantity,
      category_id,
      images,
      specifications,
    } = body

    // Validate required fields
    if (!name_ar || !name_en || !price || !category_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock response - in real app, insert into database
    const newProduct = {
      id: Date.now().toString(),
      name_ar,
      name_en,
      description_ar,
      description_en,
      price: Number.parseFloat(price),
      original_price: original_price ? Number.parseFloat(original_price) : null,
      stock_quantity: Number.parseInt(stock_quantity) || 0,
      category_id,
      images: images || [],
      specifications: specifications || {},
      is_active: true,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
