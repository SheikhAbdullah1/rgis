import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SDG from "@/models/SDG";

export async function GET() {
  try {
    await connectDB();

    const sdgs = await SDG.find().sort({
      number: 1,
    });

    return NextResponse.json({
      success: true,
      sdgs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load SDGs",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const sdg = await SDG.create(body);

    return NextResponse.json(
      {
        success: true,
        sdg,
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
        message: "Failed to create SDG",
      },
      {
        status: 500,
      }
    );
  }
}