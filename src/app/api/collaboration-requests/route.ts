// Target path in project: src/app/api/collaboration-requests/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import CollaborationRequest from "@/models/CollaborationRequest";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      requesterName,
      requesterEmail,
      organization,
      partnerId,
      category,
      message,
    } = body;

    if (!requesterName || !requesterEmail || !category || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const request = await CollaborationRequest.create({
      requesterName,
      requesterEmail,
      organization,
      partnerId: partnerId || undefined,
      category,
      message,
    });

    try {
      await sendEmail(
        requesterEmail,
        "Collaboration Request Received",
        `
        <h2>Thanks for reaching out</h2>
        <p>Hello ${requesterName},</p>
        <p>We've received your ${category.toLowerCase()} collaboration request. Our team will follow up shortly.</p>
        <br>
        <p>Regards,<br>RGIS Team</p>
        `,
      );
    } catch (error) {
      console.error("Collaboration Request Email Error:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Collaboration request submitted successfully.",
        request,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Collaboration Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit collaboration request." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const requests = await CollaborationRequest.find(query)
      .populate("partnerId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("GET Collaboration Requests Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch requests." },
      { status: 500 },
    );
  }
}