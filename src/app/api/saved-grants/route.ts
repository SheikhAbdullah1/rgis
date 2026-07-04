import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { connectDB } from "@/lib/mongodb";
  import User from "@/models/User";
  
  export async function GET() {
    try {
      await connectDB();
  
      // temporary
      const user =
        await User.findOne()
          .populate(
            "savedGrants"
          );
  
      return NextResponse.json({
        success: true,
        grants:
          user?.savedGrants ||
          [],
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
  
  export async function POST(
    req: NextRequest
  ) {
    try {
      await connectDB();
  
      const { grantId } =
        await req.json();
  
      const user =
        await User.findOne();
  
      if (!user) {
        return NextResponse.json(
          {
            success: false,
          }
        );
      }
  
      if (
        !user.savedGrants.includes(
          grantId
        )
      ) {
        user.savedGrants.push(
          grantId
        );
        await user.save();
      }
  
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
  
  export async function DELETE(
    req: NextRequest
  ) {
    try {
      await connectDB();
  
      const { grantId } =
        await req.json();
  
      const user =
        await User.findOne();
  
      user.savedGrants =
        user.savedGrants.filter(
          (g: any) =>
            g.toString() !==
            grantId
        );
  
      await user.save();
  
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