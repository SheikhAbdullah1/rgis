import ProposalForm from "@/components/proposal/ProposalForm";
import ProposalGuidelines from "@/components/proposal/ProposalGuidelines";
import BudgetPlanner from "@/components/proposal/BudgetPlanner";

export default function CreateProposalPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold">
          Create Research Proposal
        </h1>

        <p className="mt-3 max-w-3xl text-gray-600">
          Complete the proposal form carefully before submitting.
          You can attach supporting documents, estimate your
          project budget, and review everything before submission.
        </p>
      </section>

      {/* Progress */}
      <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Proposal Progress
        </h2>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[20%] rounded-full bg-blue-600 transition-all" />
        </div>

        <div className="mt-3 flex justify-between text-sm text-gray-500">
          <span>Information</span>
          <span>Budget</span>
          <span>Review</span>
          <span>Submit</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Proposal Form */}
        <div className="lg:col-span-2">
          <ProposalForm />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <ProposalGuidelines />

          <BudgetPlanner />
        </div>
      </div>
    </main>
  );
}