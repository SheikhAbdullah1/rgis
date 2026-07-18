// Target path in project: src/app/api/consultancy-requests/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import ConsultancyRequest from "@/models/ConsultancyRequest";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { fullName, email, phone, organization, service, budgetRange, details } =
      body;

    if (!fullName || !email || !service || !details) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const request = await ConsultancyRequest.create({
      fullName,
      email,
      phone,
      organization,
      service,
      budgetRange,
      details,
    });

    try {
      await sendEmail(
        email,
        "Consultancy Request Received",
        `
        <h2>Thanks for reaching out</h2>
        <p>Hello ${fullName},</p>
        <p>We've received your request for <strong>${service}</strong>. Our consultancy team will get back to you shortly with next steps.</p>
        <br>
        <p>Regards,<br>RGIS Team</p>
        `,
      );
    } catch (error) {
      console.error("Consultancy Request Email Error:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultancy request submitted successfully.",
        request,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Consultancy Request Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit consultancy request." },
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
    const service = searchParams.get("service");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (service) query.service = service;

    const requests = await ConsultancyRequest.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("GET Consultancy Requests Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch requests." },
      { status: 500 },
    );
  }
}