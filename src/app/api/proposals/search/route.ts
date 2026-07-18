import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;

    if (role !== "Admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const agency = searchParams.get("agency") || "";
    const grant = searchParams.get("grant") || "";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const query: any = {};

    if (search) {
      query.$or = [
        {
          trackingId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          organization: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (agency) {
      query.agency = agency;
    }

    if (grant) {
      query.grant = grant;
    }

    if (from || to) {
      query.createdAt = {};

      if (from) {
        query.createdAt.$gte = new Date(from);
      }

      if (to) {
        query.createdAt.$lte = new Date(to);
      }
    }

    const total = await Proposal.countDocuments(query);

    const proposals = await Proposal.find(query)
      .populate("agency", "name")
      .populate("grant", "title")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,

        proposals,

        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Search Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search proposals.",
      },
      {
        status: 500,
      },
    );
  }
}