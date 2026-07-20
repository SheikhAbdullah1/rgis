// Target path in project: src/app/api/success-stories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import SuccessStory from "@/models/SuccessStory";

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

    const story = mongoose.Types.ObjectId.isValid(id)
      ? await SuccessStory.findById(id)
      : await SuccessStory.findOne({ slug: id });

    if (!story) {
      return NextResponse.json(
        { success: false, message: "Success story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, story });
  } catch (error) {
    console.error("GET Success Story Error:", error);

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

    const story = await SuccessStory.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!story) {
      return NextResponse.json(
        { success: false, message: "Success story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Success story updated successfully.",
      story,
    });
  } catch (error) {
    console.error("PUT Success Story Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update success story." },
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
    const story = await SuccessStory.findByIdAndDelete(id);

    if (!story) {
      return NextResponse.json(
        { success: false, message: "Success story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Success story deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Success Story Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete success story." },
      { status: 500 },
    );
  }
}