// Target path in project: src/components/admin/ResourceForm.tsx
"use client";

import { useState } from "react";

const CATEGORIES = [
  "E-books",
  "Guides",
  "Funding Manuals",
  "Proposal Samples",
  "Policy Documents",
  "Research Toolkits",
];

const FILE_TYPES = ["pdf", "docx", "xlsx", "pptx", "zip"];

interface ResourceFormValues {
  _id?: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  fileType: string;
  isFeatured?: boolean;
}

interface Props {
  initialData?: ResourceFormValues;
  onSaved: () => void;
  onCancel: () => void;
}

const EMPTY: ResourceFormValues = {
  title: "",
  category: CATEGORIES[0],
  description: "",
  fileUrl: "",
  fileType: FILE_TYPES[0],
  isFeatured: false,
};

export default function ResourceForm({ initialData, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<ResourceFormValues>(initialData ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initialData?._id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.fileUrl) {
      setError("Title, description, and file URL are required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        isEdit ? `/api/resources/${initialData!._id}` : "/api/resources",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();

      if (data.success) {
        onSaved();
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Failed to save resource.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="File URL (e.g. /guides/my-file.pdf)"
          value={form.fileUrl}
          onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <select
          value={form.fileType}
          onChange={(e) => setForm({ ...form, fileType: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        >
          {FILE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={form.isFeatured ?? false}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        Featured
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Resource"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}