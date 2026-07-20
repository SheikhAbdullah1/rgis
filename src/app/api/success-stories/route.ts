// Target path in project: src/app/api/success-stories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import SuccessStory from "@/models/SuccessStory";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const query: Record<string, unknown> = {};
    if (category) query.category = category;

    if (search) {
      query.$or = [
        { projectTitle: { $regex: search, $options: "i" } },
        { researcherName: { $regex: search, $options: "i" } },
        { fundingAgency: { $regex: search, $options: "i" } },
      ];
    }

    const [stories, total] = await Promise.all([
      SuccessStory.find(query)
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      SuccessStory.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      stories,
      pagination: { total, page, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET Success Stories Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch success stories." },
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
      projectTitle,
      researcherName,
      institution,
      fundingAmount,
      fundingAgency,
      impactSummary,
      category,
      imageUrl,
      isFeatured,
    } = body;

    if (
      !projectTitle ||
      !researcherName ||
      !fundingAmount ||
      !fundingAgency ||
      !impactSummary
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const slug = projectTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const story = await SuccessStory.create({
      projectTitle,
      slug: `${slug}-${Date.now().toString(36)}`,
      researcherName,
      institution,
      fundingAmount,
      fundingAgency,
      impactSummary,
      category,
      imageUrl,
      isFeatured,
    });

    return NextResponse.json(
      { success: true, message: "Success story created successfully.", story },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Success Story Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create success story." },
      { status: 500 },
    );
  }
}