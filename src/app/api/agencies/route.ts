import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";

export async function GET() {
  try {
    await connectDB();

    const agencies = await Agency.find()
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      agencies,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load agencies",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      country,
      website,
      description,
      logo,
    } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Agency name is required",
        },
        {
          status: 400,
        }
      );
    }

    const exists =
      await Agency.findOne({
        name,
      });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Agency already exists",
        },
        {
          status: 400,
        }
      );
    }

    const agency =
      await Agency.create({
        name,
        country,
        website,
        description,
        logo,
      });

    return NextResponse.json(
      {
        success: true,
        agency,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create agency",
      },
      {
        status: 500,
      }
    );
  }
}