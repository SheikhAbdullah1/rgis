// Target path in project: src/app/admin/proposals/page.tsx

import AdminProposalTable from "@/components/AdminProposalTable";

export default function AdminProposalsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Proposal Management
        </h1>

        <p className="mt-2 text-gray-600">
          Review, approve, reject and manage submitted proposals.
        </p>
      </div>

      {/*
        Note: live stats (Total/Pending/Approved/Rejected + Users/Grants/
        Agencies/Success Rate) are rendered inside AdminProposalTable via
        the <DashboardStats /> component, which fetches real data from
        /api/dashboard. A separate hardcoded stats block used to sit here
        showing permanent "--" placeholders — removed to avoid two
        conflicting stat displays on the same page.
      */}

      <AdminProposalTable />

    </main>
  );
}