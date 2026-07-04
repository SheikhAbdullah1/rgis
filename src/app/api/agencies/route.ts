import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency"; // Ensure your model name matches

// 🔐 Admin Shield Helper
async function isAdminAuthorized() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  return role === "Admin";
}

// ✅ GET: Fetch all agencies
export async function GET() {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const agencies = await Agency.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, agencies });
  } catch (error: any) {
    console.error("GET_AGENCIES_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Failed to fetch agencies" }, { status: 500 });
  }
}

// 📂 POST: Create a new agency
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const agency = await Agency.create(body);

    return NextResponse.json({ success: true, agency }, { status: 201 });
  } catch (error: any) {
    console.error("POST_AGENCY_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Failed to create agency" }, { status: 500 });
  }
}