import ProposalHistory from "@/components/proposal/ProposalHistory";
// import { Proposal } from "@/types/proposal";
// import { useState } from "react";

// const [proposal, setProposal] = useState<Proposal | null>(null);
export default function ProposalHistoryPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Proposal History
      </h1>

      <ProposalHistory />
    </main>
  );
}