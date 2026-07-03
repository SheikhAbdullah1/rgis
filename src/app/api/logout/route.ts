import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Extract the token from the incoming request body
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    // 2. Create the response object
    const response = NextResponse.json({
      success: true,
    });

    // 3. Perform cookie operations ON the response object first
    response.cookies.delete("token");
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // 4. FINALLY, return the fully configured response
    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}