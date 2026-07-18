// Target path in project: src/app/api/resources/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

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
    const resource = await Resource.findById(id);

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, resource });
  } catch (error) {
    console.error("GET Resource Error:", error);

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

    const resource = await Resource.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resource updated successfully.",
      resource,
    });
  } catch (error) {
    console.error("PUT Resource Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update resource." },
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
    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resource deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Resource Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete resource." },
      { status: 500 },
    );
  }
}