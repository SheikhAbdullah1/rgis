// Target path in project: src/app/admin/resources/page.tsx

import AdminResourceTable from "@/components/admin/AdminResourceTable";

export default function AdminResourcesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Resources Library</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage downloadable guides, templates, and toolkits.
        </p>
      </div>

      <AdminResourceTable />
    </div>
  );
}