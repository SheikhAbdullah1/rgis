// Target path in project: src/app/api/resources/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "16", 10);

    const query: Record<string, unknown> = {};

    if (category) query.category = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Resource.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      resources,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET Resources Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch resources." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const role = cookieStore.get("role")?.value;

    if (role !== "Admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    const body = await req.json();

    const {
      title,
      category,
      description,
      fileUrl,
      fileType,
      fileSizeKb,
      isFeatured,
    } = body;

    if (!title || !category || !description || !fileUrl || !fileType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const resource = await Resource.create({
      title,
      category,
      description,
      fileUrl,
      fileType,
      fileSizeKb,
      isFeatured,
    });

    return NextResponse.json(
      { success: true, message: "Resource created successfully.", resource },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Resource Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create resource." },
      { status: 500 },
    );
  }
}