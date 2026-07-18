// Target path in project: src/app/api/events/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const mode = searchParams.get("mode");
    const search = searchParams.get("search");
    const upcoming = searchParams.get("upcoming");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const query: Record<string, unknown> = {};

    if (type) query.type = type;
    if (mode) query.mode = mode;

    if (upcoming === "true") {
      query.startDate = { $gte: new Date() };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { organizer: { $regex: search, $options: "i" } },
      ];
    }

    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ startDate: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Event.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET Events Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch events." },
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
      type,
      mode,
      description,
      organizer,
      location,
      startDate,
      endDate,
      registrationLink,
      capacity,
      imageUrl,
      tags,
      isFeatured,
    } = body;

    if (!title || !type || !description || !organizer || !startDate) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const event = await Event.create({
      title,
      slug: `${slug}-${Date.now().toString(36)}`,
      type,
      mode,
      description,
      organizer,
      location,
      startDate,
      endDate,
      registrationLink,
      capacity,
      imageUrl,
      tags,
      isFeatured,
    });

    return NextResponse.json(
      { success: true, message: "Event created successfully.", event },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Event Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create event." },
      { status: 500 },
    );
  }
}