// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Agency from "@/models/Agency";

// export async function GET(
//   req: Request,
//   {
//     params,
//   }: {
//     params: {
//       id: string;
//     };
//   }
// ) {
//   await connectDB();

//   const agency =
//     await Agency.findById(
//       params.id
//     );

//   return NextResponse.json({
//     success: true,
//     agency,
//   });
// }

// export async function PATCH(
//   req: Request,
//   {
//     params,
//   }: {
//     params: {
//       id: string;
//     };
//   }
// ) {
//   await connectDB();

//   const body =
//     await req.json();

//   const agency =
//     await Agency.findByIdAndUpdate(
//       params.id,
//       body,
//       {
//         new: true,
//       }
//     );

//   return NextResponse.json({
//     success: true,
//     agency,
//   });
// }

// export async function DELETE(
//   req: Request,
//   {
//     params,
//   }: {
//     params: {
//       id: string;
//     };
//   }
// ) {
//   await connectDB();

//   await Agency.findByIdAndDelete(
//     params.id
//   );

//   return NextResponse.json({
//     success: true,
//   });
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";

// 🔐 Admin Shield Helper
async function isAdminAuthorized() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  return role === "Admin";
}

// 🔧 PATCH: Update a specific agency by ID
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params; // Async destructuring for modern Next.js params
    const updates = await req.json();

    const agency = await Agency.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!agency) {
      return NextResponse.json({ success: false, message: "Agency not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, agency });
  } catch (error: any) {
    console.error("PATCH_AGENCY_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

// 🗑️ DELETE: Remove a specific agency by ID
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deletedAgency = await Agency.findByIdAndDelete(id);

    if (!deletedAgency) {
      return NextResponse.json({ success: false, message: "Agency not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Agency deleted successfully" });
  } catch (error: any) {
    console.error("DELETE_AGENCY_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}