import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      password,
    } = await req.json();

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        fullName,
        email,
        password: hashedPassword,
      });

    return NextResponse.json({
      success: true,
      message:
        "Account created successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}