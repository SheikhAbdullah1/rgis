import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const notifications = await Notification.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
