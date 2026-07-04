import TrackingForm from "@/components/TrackingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Proposal | RGIS",
  description:
    "Track the status of your submitted proposal using your RGIS tracking ID.",
};

export default function TrackProposalPage() {
  return (
    <main className="container mx-auto py-10">
      <TrackingForm />
    </main>
  );
}
