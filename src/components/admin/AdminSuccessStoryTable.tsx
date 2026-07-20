// Target path in project: src/components/admin/AdminSuccessStoryTable.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import SuccessStoryForm from "./SuccessStoryForm";

interface StoryRow {
  _id: string;
  projectTitle: string;
  researcherName: string;
  institution?: string;
  fundingAmount: string;
  fundingAgency: string;
  impactSummary: string;
  category: string;
  isFeatured?: boolean;
}

export default function AdminSuccessStoryTable() {
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StoryRow | null>(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/success-stories?limit=100");
      const data = await res.json();
      if (data.success) setStories(data.stories);
    } catch (error) {
      console.error("Failed to load success stories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(s: StoryRow) {
    setEditing(s);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    setEditing(null);
    fetchStories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this success story?")) return;

    try {
      const res = await fetch(`/api/success-stories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStories((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete success story:", error);
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
            + Add Story
          </button>
        )}
      </div>

      {formOpen && (
        <div className="mb-6">
          <SuccessStoryForm
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
        <p className="py-8 text-sm text-slate-500">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="py-8 text-sm text-slate-500">No success stories yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Funding</th>
                <th className="px-4 py-3">Agency</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stories.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">
                      {s.projectTitle}
                      {s.isFeatured && (
                        <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">{s.researcherName}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{s.category}</td>
                  <td className="px-4 py-3 text-slate-700">{s.fundingAmount}</td>
                  <td className="px-4 py-3 text-slate-700">{s.fundingAgency}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(s)}
                      className="mr-3 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
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