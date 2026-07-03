import AdminAgencyTable
from "@/components/admin/AdminAgencyTable";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Agencies
      </h1>

      <AdminAgencyTable />
    </main>
  );
}