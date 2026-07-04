import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const body = await req.json();

  const { id } = await params;

  const course = await Course.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json({
    success: true,
    course,
  });
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const { id } = await params;

  await Course.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}
