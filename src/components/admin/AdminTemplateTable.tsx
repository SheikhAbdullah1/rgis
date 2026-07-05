"use client";

import { useEffect, useState } from "react";

interface Template {
  _id: string;
  title: string;
  type?: string;
  fileUrl?: string;
}

export default function AdminTemplateTable() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTemplates(data.templates);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
    setTemplates((prev) => prev.filter((t) => t._id !== id));
  };

  if (loading) return <p className="py-8 text-center text-gray-500">Loading templates...</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Type</th>
            <th className="p-4">File</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No templates found.
              </td>
            </tr>
          ) : (
            templates.map((template) => (
              <tr key={template._id} className="border-t">
                <td className="p-4">{template.title}</td>
                <td className="p-4">{template.type || "—"}</td>
                <td className="p-4">
                  {template.fileUrl ? (
                    <a href={template.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View File
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(template._id)}
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}