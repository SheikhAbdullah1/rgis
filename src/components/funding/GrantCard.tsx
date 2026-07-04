"use client"; // Required since we are using interactive buttons & click handlers

import { useState } from "react";
import Link from "next/link";

interface GrantCardProps {
  _id?: string;
  id?: number;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  category?: string;
  country?: string;
}

export default function GrantCard({
  _id,
  id,
  title,
  agency,
  amount,
  deadline,
  category,
  country,
}: GrantCardProps) {
  const grantId = _id ?? id;
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Fixed: Wrapped the fetch call inside a proper event handler function
  const handleSaveGrant = async () => {
    if (!grantId) return;

    setSaving(true);
    try {
      const res = await fetch("/api/saved-grants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grantId: grantId, // ✅ Fixed using local component prop instead of undefined 'grant._id'
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
      } else {
        alert(data.message || "Failed to save grant.");
      }
    } catch (err) {
      console.error("SAVE_GRANT_ERROR:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const saveGrant = async () => {
    await fetch("/api/saved-grants", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        grantId: grant._id,
      }),
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{title}</h3>

      {category && (
        <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">
          {category}
        </span>
      )}

      <div className="mt-4 space-y-1.5 text-sm text-gray-600">
        <p>
          <strong>Agency:</strong> {agency}
        </p>
        {country && (
          <p>
            <strong>Country:</strong> {country}
          </p>
        )}
        <p>
          <strong>Amount:</strong> {amount}
        </p>
        <p>
          <strong>Deadline:</strong> {deadline}
        </p>
      </div>

      {/* ✅ Fixed: Grouped both actions cleanly inside the same flexbox container */}
      <div className="mt-6 flex gap-3">
        {grantId && (
          <Link
            href={`/funding-opportunities/${grantId}`}
            className="flex-1 rounded-lg border border-blue-600 py-3 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            View Details
          </Link>
        )}

        <button
          onClick={handleSaveGrant}
          disabled={saving || isSaved}
          className={`flex-1 rounded-lg py-3 text-sm font-medium transition-colors ${
            isSaved
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          }`}
        >
          {saving ? "Saving..." : isSaved ? "Saved ✓" : "Save Grant"}
        </button>
        <button
          onClick={saveGrant}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Save Grant
        </button>
      </div>
    </div>
  );
}
