import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import crypto from "crypto";
  
  import { connectDB } from "@/lib/mongodb";
  import User from "@/models/User";
  import { sendEmail } from "@/lib/sendEmail";
  
  export async function POST(
    req: NextRequest
  ) {
    try {
      await connectDB();
  
      const { email } =
        await req.json();
  
      const user =
        await User.findOne({
          email,
        });
  
      if (!user) {
        return NextResponse.json({
          success: false,
          message:
            "No account found.",
        });
      }
  
      const token =
        crypto.randomBytes(32)
          .toString("hex");
  
      user.resetToken =
        token;
  
      user.resetTokenExpiry =
        Date.now() +
        1000 * 60 * 30;
  
      await user.save();
  
      const resetUrl =
        `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
      await sendEmail(
        user.email,
        "Reset Password",
        `
        <h2>Password Reset</h2>
        <p>Click below:</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
        `
      );
  
      return NextResponse.json({
        success: true,
        message:
          "Reset link sent to email.",
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        {
          success: false,
          message:
            "Something went wrong.",
        },
        {
          status: 500,
        }
      );
    }
  }