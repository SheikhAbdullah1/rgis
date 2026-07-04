import AdminMembershipTable
from "@/components/admin/AdminMembershipTable";

export default function Page() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Membership Management
      </h1>

      <AdminMembershipTable />
    </div>
  );
}