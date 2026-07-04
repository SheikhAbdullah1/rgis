// import {
//     NextRequest,
//     NextResponse,
//   } from "next/server";
//   import { useState } from "react";
//   import crypto from "crypto";
  
  
//   import { connectDB } from "@/lib/mongodb";
//   import User from "@/models/User";
//   import { sendEmail } from "@/lib/sendEmail";
  
//   export async function POST(
//     req: NextRequest
//   ) {
//     try {
//       await connectDB();
  
//       const { email } =
//         await req.json();
  
//       const user =
//         await User.findOne({
//           email,
//         });
  
//       if (!user) {
//         return NextResponse.json({
//           success: false,
//           message:
//             "No account found.",
//         });
//       }
  
//       const token =
//         crypto.randomBytes(32)
//           .toString("hex");
  
//       user.resetToken =
//         token;
  
//       user.resetTokenExpiry =
//         Date.now() +
//         1000 * 60 * 30;
  
//       await user.save();
  
//       const resetUrl =
//         `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
//       await sendEmail(
//         user.email,
//         "Reset Password",
//         `
//         <h2>Password Reset</h2>
//         <p>Click below:</p>
//         <a href="${resetUrl}">
//           Reset Password
//         </a>
//         `
//       );
  
//       return NextResponse.json({
//         success: true,
//         message:
//           "Reset link sent to email.",
//       });
//     } catch (error) {
//       console.error(error);
  
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             "Something went wrong.",
//         },
//         {
//           status: 500,
//         }
//       );
//     }
//   }


import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    // Normalized email to match database structure
    const targetEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: targetEmail });

    // 🔒 Security Best Practice: Don't explicitly say "No account found" to prevent email harvesting.
    // But since this is a private dashboard app, we can provide feedback safely or use generic message.
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    // 1. Generate a raw token for the email link
    const rawResetToken = crypto.randomBytes(32).toString("hex");

    // 2. Hash the token before saving to the database (Crucial Security Step)
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawResetToken)
      .digest("hex");

    // 3. Update User Document fields
    user.resetToken = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 Minutes from now

    await user.save();

    // 4. Create Reset URL using the RAW token (Client will send this back, and we will hash & compare)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${rawResetToken}`;

    // 5. Send the transactional email
    await sendEmail(
      user.email,
      "Reset Password - RGIS",
      `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your RGIS account. Click the button below to set a new password. This link expires in 30 minutes.</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
      </div>
      `
    );

    return NextResponse.json({
      success: true,
      message: "Reset link sent to email safely.",
    });
  } catch (error: any) {
    console.error("FORGOT_PASSWORD_API_ERROR:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing request.",
      },
      { status: 500 }
    );
  }
}