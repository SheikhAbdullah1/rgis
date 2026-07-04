"use client";

import { useState } from "react";

export default function TemplateForm({ refresh }: any) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    const form = new FormData();

    form.append("title", title);

    form.append("description", description);

    form.append("category", category);

    if (file) {
      form.append("file", file);
    }

    const res = await fetch("/api/templates", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      refresh();
    }
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Title"
        className="w-full border p-3 rounded"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Category"
        className="w-full border p-3 rounded"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Upload Template
      </button>
    </div>
  );
}
