// Target path in project: src/app/api/partnership-requests/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import PartnershipRequest from "@/models/PartnershipRequest";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { organizationName, contactName, email, phone, partnerType, message } =
      body;

    if (!organizationName || !contactName || !email || !partnerType || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const request = await PartnershipRequest.create({
      organizationName,
      contactName,
      email,
      phone,
      partnerType,
      message,
    });

    try {
      await sendEmail(
        email,
        "Partnership Request Received",
        `
        <h2>Thanks for reaching out</h2>
        <p>Hello ${contactName},</p>
        <p>We've received your ${partnerType.toLowerCase()} request on behalf of ${organizationName}. Our partnerships team will follow up shortly.</p>
        <br>
        <p>Regards,<br>RGIS Team</p>
        `,
      );
    } catch (error) {
      console.error("Partnership Request Email Error:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partnership request submitted successfully.",
        request,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Partnership Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit partnership request." },
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

    const requests = await PartnershipRequest.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("GET Partnership Requests Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch requests." },
      { status: 500 },
    );
  }
}