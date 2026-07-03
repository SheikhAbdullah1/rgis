import UserTable from "@/components/admin/UserTable";

export default function UsersPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Users
      </h1>

      <UserTable />
    </main>
  );
}