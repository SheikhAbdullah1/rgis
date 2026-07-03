import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid credentials",
    },
    { status: 401 }
  );
}