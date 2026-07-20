// Target path in project: src/components/admin/SuccessStoryForm.tsx
"use client";

import { useState } from "react";

const CATEGORIES = ["Funded Project", "Researcher", "University", "Startup"];

interface SuccessStoryFormValues {
  _id?: string;
  projectTitle: string;
  researcherName: string;
  institution?: string;
  fundingAmount: string;
  fundingAgency: string;
  impactSummary: string;
  category: string;
  isFeatured?: boolean;
}

interface Props {
  initialData?: SuccessStoryFormValues;
  onSaved: () => void;
  onCancel: () => void;
}

const EMPTY: SuccessStoryFormValues = {
  projectTitle: "",
  researcherName: "",
  institution: "",
  fundingAmount: "",
  fundingAgency: "",
  impactSummary: "",
  category: CATEGORIES[0],
  isFeatured: false,
};

export default function SuccessStoryForm({ initialData, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<SuccessStoryFormValues>(initialData ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initialData?._id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !form.projectTitle ||
      !form.researcherName ||
      !form.fundingAmount ||
      !form.fundingAgency ||
      !form.impactSummary
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        isEdit ? `/api/success-stories/${initialData!._id}` : "/api/success-stories",
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
      setError("Failed to save success story.");
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
          placeholder="Project title"
          value={form.projectTitle}
          onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Researcher / lead name"
          value={form.researcherName}
          onChange={(e) => setForm({ ...form, researcherName: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <input
          type="text"
          placeholder="Institution (optional)"
          value={form.institution}
          onChange={(e) => setForm({ ...form, institution: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Funding amount (e.g. PKR 5,000,000)"
          value={form.fundingAmount}
          onChange={(e) => setForm({ ...form, fundingAmount: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <input
          type="text"
          placeholder="Funding agency"
          value={form.fundingAgency}
          onChange={(e) => setForm({ ...form, fundingAgency: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <textarea
        placeholder="Impact summary"
        value={form.impactSummary}
        onChange={(e) => setForm({ ...form, impactSummary: e.target.value })}
        rows={3}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
      />

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
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Story"}
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