// Target path in project: src/app/admin/collaboration-requests/page.tsx

import AdminCollaborationRequestTable from "@/components/admin/AdminCollaborationRequestTable";

export default function AdminCollaborationRequestsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Collaboration Requests
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Requests submitted through the Collaboration Hub.
        </p>
      </div>

      <AdminCollaborationRequestTable />
    </div>
  );
}