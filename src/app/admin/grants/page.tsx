import GrantForm from "@/components/admin/GrantForm";
import AdminGrantTable from "@/components/admin/AdminGrantTable";

export default function AdminGrantsPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Funding Opportunities
      </h1>

      <GrantForm />

      <div className="mt-10">
        <AdminGrantTable />
      </div>
    </main>
  );
}