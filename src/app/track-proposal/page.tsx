// import TrackingForm from "@/components/TrackingForm";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Track Proposal | RGIS",
//   description:
//     "Track the status of your submitted proposal using your RGIS tracking ID.",
// };

// export default function TrackProposalPage() {
//   return (
//     <main className="container mx-auto py-10">
//       <TrackingForm />
//     </main>
//   );
// }

"use client";

import TrackingForm from "@/components/TrackingForm";

export default function TrackProposalPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Track Your Proposal</h1>
      <TrackingForm />
    </main>
  );
}