// Target path in project: src/app/api/collaboration-requests/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import CollaborationRequest from "@/models/CollaborationRequest";

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

    if (!(await requireAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const request = await CollaborationRequest.findById(id).populate(
      "partnerId",
      "name type",
    );

    if (!request) {
      return NextResponse.json(
        { success: false, message: "Request not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("GET Collaboration Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    if (!(await requireAdmin())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const { status } = await req.json();

    const allowedStatus = ["New", "Contacted", "In Progress", "Closed"];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status." },
        { status: 400 },
      );
    }

    const request = await CollaborationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!request) {
      return NextResponse.json(
        { success: false, message: "Request not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully.",
      request,
    });
  } catch (error) {
    console.error("PATCH Collaboration Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update status." },
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

    const request = await CollaborationRequest.findByIdAndDelete(id);

    if (!request) {
      return NextResponse.json(
        { success: false, message: "Request not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Collaboration Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete request." },
      { status: 500 },
    );
  }
}