// Target path in project: src/app/admin/consultancy-requests/page.tsx

import AdminConsultancyRequestTable from "@/components/admin/AdminConsultancyRequestTable";

export default function AdminConsultancyRequestsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Consultancy Requests
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Paid service inquiries submitted through Consultancy Services.
        </p>
      </div>

      <AdminConsultancyRequestTable />
    </div>
  );
}