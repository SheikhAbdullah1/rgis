import AdminFundingTable from "@/components/admin/AdminFundingTable";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Funding Opportunities </h1>
      <AdminFundingTable />
    </main>
  );
}
