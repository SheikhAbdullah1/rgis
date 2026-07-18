// Target path in project: src/app/api/partners/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "16", 10);

    const query: Record<string, unknown> = {};

    if (type) query.type = type;
    if (category) query.categories = category;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [partners, total] = await Promise.all([
      Partner.find(query)
        .sort({ isVerified: -1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Partner.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      partners,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET Partners Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch partners." },
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
      name,
      type,
      categories,
      description,
      logoUrl,
      website,
      contactEmail,
      city,
      country,
      isVerified,
    } = body;

    if (!name || !type || !description || !categories?.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const partner = await Partner.create({
      name,
      type,
      categories,
      description,
      logoUrl,
      website,
      contactEmail,
      city,
      country,
      isVerified,
    });

    return NextResponse.json(
      { success: true, message: "Partner added successfully.", partner },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Partner Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to add partner." },
      { status: 500 },
    );
  }
}