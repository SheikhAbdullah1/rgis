// Target path in project: src/components/admin/PartnerForm.tsx
"use client";

import { useState } from "react";

const TYPES = [
  "University",
  "Industry",
  "NGO",
  "Hospital",
  "Government Department",
  "International Institution",
];

const CATEGORIES = [
  "Joint Research",
  "Consultancy",
  "Technology Transfer",
  "Startup Development",
  "Community Projects",
];

interface PartnerFormValues {
  _id?: string;
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

interface Props {
  initialData?: PartnerFormValues;
  onSaved: () => void;
  onCancel: () => void;
}

const EMPTY: PartnerFormValues = {
  name: "",
  type: TYPES[0],
  categories: [],
  description: "",
  website: "",
  contactEmail: "",
  city: "",
  country: "Pakistan",
  isVerified: false,
};

export default function PartnerForm({ initialData, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<PartnerFormValues>(initialData ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(initialData?._id);

  function toggleCategory(cat: string) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.description || form.categories.length === 0) {
      setError("Name, description, and at least one category are required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        isEdit ? `/api/partners/${initialData!._id}` : "/api/partners",
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
      setError("Failed to save partner.");
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
          placeholder="Organization name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
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

      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">
          Collaboration categories
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCategory(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                form.categories.includes(c)
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 text-slate-600 hover:border-slate-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Website (optional)"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <input
          type="email"
          placeholder="Contact email (optional)"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="City (optional)"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={form.isVerified ?? false}
          onChange={(e) => setForm({ ...form, isVerified: e.target.checked })}
        />
        Verified partner
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Partner"}
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