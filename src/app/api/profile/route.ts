import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";


export async function GET() {
  try {
    await connectDB();

    const cookieStore =
      await cookies();

    const userId =
      cookieStore.get("userId")
        ?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user =
      await User.findById(
        userId
      ).select("-password");

    return NextResponse.json({
      success: true,
      user,
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
export async function GET() {
  try {
    await connectDB();

    // abhi temporary
    const user = await User.findOne();

    return NextResponse.json({
      success: true,
      user,
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
  req: NextRequest
) {
  try {
    await connectDB();

    const cookieStore =
      await cookies();

    const userId =
      cookieStore.get("userId")
        ?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    const user =
      await User.findByIdAndUpdate(
        userId,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      user,
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
// export async function PATCH(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const body =
//       await req.json();

//     const user =
//       await User.findOneAndUpdate(
//         {},
//         body,
//         {
//           new: true,
//         }
//       );

//     return NextResponse.json({
//       success: true,
//       user,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }