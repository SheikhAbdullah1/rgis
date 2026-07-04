import AdminUsersTable from "@/components/admin/AdminUsersTable";

export default function Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <AdminUsersTable />
    </div>
  );
}
