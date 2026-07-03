"use client";

import { useState } from "react";

interface Props {
  agency?: any;
  onClose: () => void;
  refresh: () => void;
}

export default function AgencyForm({
  agency,
  onClose,
  refresh,
}: Props) {
  // const [form, setForm] = useState({
  //   name: agency?.name || "",
  //   country: agency?.country || "",
  //   website: agency?.website || "",
  //   email: agency?.email || "",
  //   description: agency?.description || "",
  //   logo: agency?.logo || "",
  //   fundingTypes:
  //     agency?.fundingTypes?.join(", ") || "",
  //   focusAreas:
  //     agency?.focusAreas?.join(", ") || "",
  //   status: agency?.status || "Active",
  // });
  const [form, setForm] = useState({
    name: agency?.name || "",
    country: agency?.country || "",
    website: agency?.website || "",
    email: agency?.email || "",
    description: agency?.description || "",
    logo: agency?.logo || "",
    fundingTypes:
      agency?.fundingTypes?.join(", ") || "",
    focusAreas:
      agency?.focusAreas?.join(", ") || "",
    status:
      agency?.status || "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async () => {
  //   const payload = {
  //     ...form,
  //     fundingTypes: form.fundingTypes
  //       .split(",")
  //       .map((x) => x.trim())
  //       .filter(Boolean),

  //     focusAreas: form.focusAreas
  //       .split(",")
  //       .map((x) => x.trim())
  //       .filter(Boolean),
  //   };

  //   const url = agency
  //     ? `/api/agencies/${agency._id}`
  //     : "/api/agencies";

  //   const method = agency
  //     ? "PATCH"
  //     : "POST";

  //   const res = await fetch(url, {
  //     method,
  //     headers: {
  //       "Content-Type":
  //         "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   const data = await res.json();

  //   console.log(data);

  //   if (data.success) {
  //     refresh();
  //     onClose();
  //   }
  // };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      fundingTypes:
        form.fundingTypes
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
  
      focusAreas:
        form.focusAreas
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
    };
  
    const url = agency
      ? `/api/agencies/${agency._id}`
      : "/api/agencies";
  
    const method = agency
      ? "PATCH"
      : "POST";
  
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
  
    console.log(data);
  
    if (data.success) {
      refresh();
      onClose();
    } else {
      alert("Failed to save agency");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-xl bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {agency
            ? "Edit Agency"
            : "Add Agency"}
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Agency Name"
            className="w-full rounded border p-3"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full rounded border p-3"
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full rounded border p-3"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded border p-3"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded border p-3"
          />

          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="w-full rounded border p-3"
          />

          <input
            name="fundingTypes"
            value={form.fundingTypes}
            onChange={handleChange}
            placeholder="Research, Innovation"
            className="w-full rounded border p-3"
          />

          <input
            name="focusAreas"
            value={form.focusAreas}
            onChange={handleChange}
            placeholder="AI, Health"
            className="w-full rounded border p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-600 px-5 py-3 text-white"
            >
              Save
            </button>

            <button
              onClick={onClose}
              className="rounded border px-5 py-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}