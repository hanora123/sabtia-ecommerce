import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // In a real app, you'd create a new user in the database
    // and perform validation.
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Mock user creation
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "customer",
    };

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
