import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import bcrypt from "bcryptjs";
  
  import { connectDB }
  from "@/lib/mongodb";
  
  import User
  from "@/models/User";
  
  export async function POST(
    req: NextRequest
  ) {
    try {
      await connectDB();
  
      const {
        token,
        password,
      } = await req.json();
  
      const user =
        await User.findOne({
          resetToken: token,
          resetTokenExpiry: {
            $gt: new Date(),
          },
        });
  
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid or expired link.",
          },
          {
            status: 400,
          }
        );
      }
  
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );
  
      user.password =
        hashedPassword;
  
      user.resetToken =
        undefined;
  
      user.resetTokenExpiry =
        undefined;
  
      await user.save();
  
      return NextResponse.json({
        success: true,
        message:
          "Password updated successfully.",
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