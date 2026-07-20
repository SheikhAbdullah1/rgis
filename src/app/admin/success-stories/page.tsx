// Target path in project: src/app/admin/success-stories/page.tsx

import AdminSuccessStoryTable from "@/components/admin/AdminSuccessStoryTable";

export default function AdminSuccessStoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Success Stories</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage the funded projects, researchers, and startups featured on
          the Success Stories page.
        </p>
      </div>

      <AdminSuccessStoryTable />
    </div>
  );
}