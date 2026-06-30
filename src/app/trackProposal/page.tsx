import TrackingForm
from "@/components/TrackingForm";
import type { Metadata } from "next"; 

export const metadata: Metadata = { 
  title: "Contact Us", 
  description: "Contact the Research Grant Intelligence System team.", 
};

export default function TrackProposalPage() {
  return (
    <div className="container mx-auto py-10">
      <TrackingForm />
    </div>
  );
}