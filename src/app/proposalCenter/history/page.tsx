import ProposalHistory from "@/components/proposal/ProposalHistory";

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