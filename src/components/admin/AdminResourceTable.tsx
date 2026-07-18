// Target path in project: src/components/admin/AdminResourceTable.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import ResourceForm from "./ResourceForm";

interface ResourceRow {
  _id: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  fileType: string;
  downloadCount?: number;
  isFeatured?: boolean;
}

export default function AdminResourceTable() {
  const [resources, setResources] = useState<ResourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceRow | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources?limit=100");
      const data = await res.json();
      if (data.success) setResources(data.resources);
    } catch (error) {
      console.error("Failed to load resources:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(r: ResourceRow) {
    setEditing(r);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    setEditing(null);
    fetchResources();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resource?")) return;

    try {
      const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setResources((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete resource:", error);
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        {!formOpen && (
          <button
            onClick={openCreate}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Resource
          </button>
        )}
      </div>

      {formOpen && (
        <div className="mb-6">
          <ResourceForm
            initialData={editing ?? undefined}
            onSaved={handleSaved}
            onCancel={() => {
              setFormOpen(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <p className="py-8 text-sm text-slate-500">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="py-8 text-sm text-slate-500">No resources yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Downloads</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resources.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">
                      {r.title}
                      {r.isFeatured && (
                        <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">{r.fileUrl}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{r.category}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {r.fileType.toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {r.downloadCount ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(r)}
                      className="mr-3 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}