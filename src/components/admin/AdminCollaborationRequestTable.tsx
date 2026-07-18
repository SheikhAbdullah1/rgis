// Target path in project: src/components/admin/AdminCollaborationRequestTable.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

const STATUSES = ["New", "Contacted", "In Progress", "Closed"] as const;

const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-purple-50 text-purple-700 border-purple-200",
  Closed: "bg-slate-100 text-slate-600 border-slate-200",
};

interface CollaborationRequestRow {
  _id: string;
  requesterName: string;
  requesterEmail: string;
  organization?: string;
  partnerId?: { name: string; type: string } | null;
  category: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminCollaborationRequestTable() {
  const [requests, setRequests] = useState<CollaborationRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/collaboration-requests?${params.toString()}`);
      const data = await res.json();

      if (data.success) setRequests(data.requests);
    } catch (error) {
      console.error("Failed to load collaboration requests:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  async function updateStatus(id: string, status: string) {
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r)),
    );

    try {
      const res = await fetch(`/api/collaboration-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!data.success) fetchRequests(); // revert on failure
    } catch {
      fetchRequests();
    }
  }

  async function deleteRequest(id: string) {
    if (!confirm("Delete this collaboration request?")) return;

    try {
      const res = await fetch(`/api/collaboration-requests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("")}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            statusFilter === ""
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              statusFilter === s
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-8 text-sm text-slate-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="py-8 text-sm text-slate-500">No collaboration requests found.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Requester</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <>
                  <tr key={r._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{r.requesterName}</p>
                      <p className="text-xs text-slate-500">{r.requesterEmail}</p>
                      {r.organization && (
                        <p className="text-xs text-slate-400">{r.organization}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.category}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.partnerId?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
                        className={`rounded-full border px-2 py-1 text-xs font-medium outline-none ${STATUS_STYLES[r.status] ?? ""}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === r._id ? null : r._id)
                        }
                        className="mr-3 text-xs font-medium text-blue-600 hover:underline"
                      >
                        {expandedId === r._id ? "Hide" : "View"}
                      </button>
                      <button
                        onClick={() => deleteRequest(r._id)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedId === r._id && (
                    <tr key={`${r._id}-detail`} className="bg-slate-50/60">
                      <td colSpan={6} className="px-4 py-3 text-sm text-slate-700">
                        <span className="font-medium text-slate-500">Message: </span>
                        {r.message}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}