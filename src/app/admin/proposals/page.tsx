import AdminProposalTable from "@/components/AdminProposalTable";
export default function AdminProposalsPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Proposals</h1>
      <AdminProposalTable />
    </main>
    
  );
}