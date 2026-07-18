// Target path in project: src/app/api/resources/[id]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

interface Params {
  params: Promise<{ id: string }>;
}

// Called right before the client redirects to the file URL, so the
// library can track how often each resource is downloaded.
export async function POST(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const resource = await Resource.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
      { new: true },
    );

    if (!resource) {
      return NextResponse.json(
        { success: false, message: "Resource not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      downloadCount: resource.downloadCount,
    });
  } catch (error) {
    console.error("Resource Download Count Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to record download." },
      { status: 500 },
    );
  }
}