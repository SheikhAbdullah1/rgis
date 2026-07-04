import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Notification from "@/models/Notification";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  const count = await Notification.countDocuments({
    userId,
    read: false,
  });

  return NextResponse.json({
    success: true,
    count,
  });
}
