// Target path in project: src/app/admin/partners/page.tsx

import AdminPartnerTable from "@/components/admin/AdminPartnerTable";

export default function AdminPartnersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Collaboration Hub Partners</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage the partner directory shown on the Collaboration Hub.
        </p>
      </div>

      <AdminPartnerTable />
    </div>
  );
}