// Target path in project: src/components/admin/AdminPartnerTable.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import PartnerForm from "./PartnerForm";

interface PartnerRow {
  _id: string;
  name: string;
  type: string;
  categories: string[];
  description: string;
  website?: string;
  contactEmail?: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
}

export default function AdminPartnerTable() {
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerRow | null>(null);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners?limit=100");
      const data = await res.json();
      if (data.success) setPartners(data.partners);
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(p: PartnerRow) {
    setEditing(p);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    setEditing(null);
    fetchPartners();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this partner?")) return;

    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPartners((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete partner:", error);
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
            + Add Partner
          </button>
        )}
      </div>

      {formOpen && (
        <div className="mb-6">
          <PartnerForm
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
        <p className="py-8 text-sm text-slate-500">Loading partners...</p>
      ) : partners.length === 0 ? (
        <p className="py-8 text-sm text-slate-500">No partners yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partners.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500">
                      {p.city ? `${p.city}, ` : ""}
                      {p.country}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{p.type}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {p.categories.join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    {p.isVerified ? (
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(p)}
                      className="mr-3 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
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