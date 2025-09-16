import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    // In a real app, you would update the order in the database
    console.log(`Updating order ${id} to status ${status}`);

    return NextResponse.json({ id, status });
  } catch (error) {
    console.error(`Error updating order:`, error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
