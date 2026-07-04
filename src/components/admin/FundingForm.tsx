"use client";

import { useEffect, useState } from "react";

interface Props {
  funding?: any;
  onClose: () => void;
  refresh: () => void;
}

export default function FundingForm({ funding, onClose, refresh }: Props) {
  const [agencies, setAgencies] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: funding?.title || "",

    agency: funding?.agency?._id || funding?.agency || "",

    category: funding?.category || "",

    amount: funding?.amount || "",

    country: funding?.country || "",

    deadline: funding?.deadline?.substring(0, 10) || "",

    eligibility: funding?.eligibility || "",

    description: funding?.description || "",

    website: funding?.website || "",

    status: funding?.status || "Open",
  });

  useEffect(() => {
    fetch("/api/agencies")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAgencies(data.agencies);
        }
      });
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const url = funding ? `/api/funding/${funding._id}` : "/api/funding";

    const method = funding ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      refresh();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {" "}
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {funding ? "Edit Funding" : "Add Funding"}
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded p-3"
          />

          <select
            name="agency"
            value={form.agency}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="">Select Agency</option>

            {agencies.map((agency) => (
              <option key={agency._id} value={agency._id}>
                {agency.name}
              </option>
            ))}
          </select>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded p-3"
          />

          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border rounded p-3"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full border rounded p-3"
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <textarea
            name="eligibility"
            value={form.eligibility}
            onChange={handleChange}
            placeholder="Eligibility"
            className="w-full border rounded p-3"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded p-3"
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full border rounded p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option>Open</option>

            <option>Closed</option>
          </select>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-5 py-3 rounded"
            >
              Save
            </button>

            <button onClick={onClose} className="border px-5 py-3 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
