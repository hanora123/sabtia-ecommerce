import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // In a real app, you'd validate against a database
    if (email === "customer@example.com" && password === "password") {
      const user = {
        id: "1",
        name: "أحمد محمد",
        email: "customer@example.com",
        role: "customer",
      };
      // In a real app, you'd create a session or JWT
      return NextResponse.json({ user });
    }

    if (email === "vendor@example.com" && password === "password") {
        const user = {
          id: "2",
          name: "فاطمة علي",
          email: "vendor@example.com",
          role: "vendor",
        };
        // In a real app, you'd create a session or JWT
        return NextResponse.json({ user });
      }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
