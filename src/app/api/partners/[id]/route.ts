// Target path in project: src/app/api/partners/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/Partner";

interface Params {
  params: Promise<{ id: string }>;
}

async function requireAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("role")?.value === "Admin";
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const partner = await Partner.findById(id);

    if (!partner) {
      return NextResponse.json(
        { success: false, message: "Partner not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, partner });
  } catch (error) {
    console.error("GET Partner Error:", error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    if (!(await requireAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();

    const partner = await Partner.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!partner) {
      return NextResponse.json(
        { success: false, message: "Partner not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner updated successfully.",
      partner,
    });
  } catch (error) {
    console.error("PUT Partner Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update partner." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    if (!(await requireAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return NextResponse.json(
        { success: false, message: "Partner not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Partner Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete partner." },
      { status: 500 },
    );
  }
}