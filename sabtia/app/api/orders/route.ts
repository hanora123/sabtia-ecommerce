import { type NextRequest, NextResponse } from "next/server"

// GET /api/orders - Fetch user orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // In real app, get user from authentication
    // const user = await getCurrentUser(request)
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Mock orders data
    const mockOrders = [
      {
        id: "1",
        order_number: "SBT-2024-001",
        status: "delivered",
        total_amount: 120.0,
        delivery_fee: 15.0,
        payment_method: "cod",
        payment_status: "paid",
        delivery_address: "شارع النيل، المعادي، القاهرة",
        estimated_delivery: "2024-01-15",
        created_at: "2024-01-10T10:00:00Z",
        items: [
          {
            id: "1",
            product: {
              name_ar: "مفك براغي مجموعة 6 قطع",
              name_en: "Screwdriver Set 6 Pieces",
              images: ["/screwdriver-set-6-pieces.jpg"],
            },
            quantity: 2,
            unit_price: 45.0,
            total_price: 90.0,
            vendor: {
              shop_name: "محل أحمد للأدوات",
            },
          },
        ],
      },
      {
        id: "2",
        order_number: "SBT-2024-002",
        status: "processing",
        total_amount: 75.0,
        delivery_fee: 10.0,
        payment_method: "cod",
        payment_status: "pending",
        delivery_address: "شارع التحرير، وسط البلد، القاهرة",
        estimated_delivery: "2024-01-20",
        created_at: "2024-01-18T14:30:00Z",
        items: [
          {
            id: "2",
            product: {
              name_ar: "قماش قطني أزرق",
              name_en: "Blue Cotton Fabric",
              images: ["/blue-cotton-fabric.jpg"],
            },
            quantity: 3,
            unit_price: 25.0,
            total_price: 75.0,
            vendor: {
              shop_name: "أقمشة فاطمة",
            },
          },
        ],
      },
    ]

    // Apply status filter
    let filteredOrders = mockOrders
    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    // Pagination
    const offset = (page - 1) * limit
    const paginatedOrders = filteredOrders.slice(offset, offset + limit)

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { items, delivery_address, delivery_phone, delivery_notes, payment_method = "cod" } = body

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 })
    }

    if (!delivery_address || !delivery_phone) {
      return NextResponse.json({ error: "Delivery address and phone are required" }, { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const delivery_fee = subtotal > 200 ? 0 : 15 // Free delivery over 200 EGP
    const total_amount = subtotal + delivery_fee

    // Generate order number
    const order_number = `SBT-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Mock response - in real app, insert into database
    const newOrder = {
      id: Date.now().toString(),
      order_number,
      status: "pending",
      total_amount,
      delivery_fee,
      payment_method,
      payment_status: "pending",
      delivery_address,
      delivery_phone,
      delivery_notes,
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      items: items.map((item) => ({
        ...item,
        total_price: item.price * item.quantity,
      })),
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
