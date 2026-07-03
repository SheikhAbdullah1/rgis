"use client";

import { useEffect, useState } from "react";

export default function RecentProposals() {
  const [proposals, setProposals] =
    useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/proposals")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProposals(
            data.proposals.slice(0, 5)
          );
        }
      });
  }, []);

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-bold">
        Recent Proposals
      </h2>

      <div className="space-y-4">
        {proposals.length === 0 ? (
            <p className="text-gray-500 text-sm">
            No proposals yet.
            </p>
        ) : (
            proposals.map((p) => (
            <div key={p._id} className="border-b pb-4">
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-500">{p.fullName}</p>
            </div>
            ))
        )}
        </div>
      {/* <div className="space-y-4">
        {proposals.map((p) => (
          <div
            key={p._id}
            className="border-b pb-4"
          >
            <p className="font-semibold">
              {p.title}
            </p>

            <p className="text-sm text-gray-500">
              {p.fullName}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}