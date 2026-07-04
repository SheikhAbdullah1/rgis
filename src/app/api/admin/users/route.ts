import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";

// 🔐 Helper function to handle async cookie auth check safely within Next.js context
async function isAdminAuthorized() {
  const cookieStore = await cookies(); // Handled as async for modern Next.js safety
  const role = cookieStore.get("role")?.value;
  return role === "Admin";
}

// ✅ GET: Fetch all users for admin table (🛡️ Admin Only)
export async function GET() {
  try {
    // Check administrative shield
    if (!(await isAdminAuthorized())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access denied." },
        { status: 401 }
      );
    }

    await connectDB();

    // .lean() adds lightning-fast reading performance for dashboard panels
    const users = await User.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: any) {
    console.error("GET_USERS_ERROR:", error.message); // Real debugging log
    return NextResponse.json(
      { success: false, message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

// 🔐 PATCH: Update user roles (🛡️ Admin Only)
export async function PATCH(req: Request) {
  try {
    // Check administrative shield
    if (!(await isAdminAuthorized())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access denied." },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { id, role } = body;

    // ⚠️ Validation Check
    if (!id || !role) {
      return NextResponse.json(
        { success: false, message: "User ID and Role are required parameters." },
        { status: 400 }
      );
    }

    // Explicit Role Enum Safeguard
    const allowedRoles = ["Admin", "Reviewer", "Member"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role assignment value." },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true } // Return freshly updated document and double check schema rules
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Target user not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role} successfully.`,
    });
  } catch (error: any) {
    console.error("PATCH_USER_ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server update error." },
      { status: 500 }
    );
  }
}