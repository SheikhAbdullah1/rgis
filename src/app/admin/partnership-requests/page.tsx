// Target path in project: src/app/admin/partnership-requests/page.tsx

import AdminPartnershipRequestTable from "@/components/admin/AdminPartnershipRequestTable";

export default function AdminPartnershipRequestsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Partnership Requests
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Requests submitted through the Partnership page.
        </p>
      </div>

      <AdminPartnershipRequestTable />
    </div>
  );
}