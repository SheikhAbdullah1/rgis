import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users =
      await User.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: Request
) {
  try {
    await connectDB();

    const {
      id,
      role,
    } = await req.json();

    await User.findByIdAndUpdate(
      id,
      {
        role,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}