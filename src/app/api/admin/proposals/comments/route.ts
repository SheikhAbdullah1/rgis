// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Proposal from "@/models/Proposal";

// export async function POST(
//   req: Request
// ) {
//   try {
//     await connectDB();

//     const {
//       proposalId,
//       user,
//       message,
//     } = await req.json();

//     // const proposal =
//     //   await Proposal.findById(
//     //     proposalId
//     //   );
//     const proposal =
//       await Proposal.findByIdAndUpdate(
//         proposalId,
//         {
//           $push: {
//             comments: {
//               user,
//               message,
//               createdAt: new Date(),
//             },
//           },
//         },
//         {
//           new: true,
//         }
//       );

//     // if (!proposal) {
//     //   return NextResponse.json(
//     //     {
//     //       success: false,
//     //     },
//     //     {
//     //       status: 404,
//     //     }
//     //   );
//     // }

//     proposal.comments.push({
//       user,
//       message,
//     });

//     await proposal.save();

//     return NextResponse.json({
//       success: true,
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

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { proposalId, user, message } = await req.json();

    // 1. Basic payload validation
    if (!proposalId || !user || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Update the document atomically in DB
    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      {
        $push: {
          comments: {
            user,
            message,
            createdAt: new Date(),
          },
        },
      },
      { new: true } // returns the updated document
    );

    // 3. Gracefully handle if the ID doesn't exist (Fixes your 404/500 confusion)
    if (!updatedProposal) {
      return NextResponse.json(
        { success: false, error: "Proposal not found" },
        { status: 404 }
      );
    }

    // REMOVED: manual .push() and .save() to avoid duplicate insertions and crashes

    return NextResponse.json({
      success: true,
      data: updatedProposal.comments, // Good practice to return the updated comments list
    });

  } catch (error) {
    console.error("Error adding comment:", error); // ALWAYS log your errors so you aren't flying blind!
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}