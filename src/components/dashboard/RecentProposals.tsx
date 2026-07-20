"use client";

import { useEffect, useState } from "react";

interface Proposal {
  _id: string;
  trackingId: string;
  title: string;
  fullName: string;
  status: string;
  createdAt: string;
}

export default function RecentProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecent();
  }, []);

  async function loadRecent() {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      if (data.success) {
        setProposals(data.recentProposals || []);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Loading recent proposals...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Recent Proposals
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Tracking ID
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Applicant
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {proposals.map((proposal) => (

              <tr
                key={proposal._id}
                className="border-t"
              >

                <td className="p-4">
                  {proposal.trackingId}
                </td>

                <td className="p-4">
                  {proposal.title}
                </td>

                <td className="p-4">
                  {proposal.fullName}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
                      ${
                        proposal.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : proposal.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {proposal.status}
                  </span>

                </td>

                <td className="p-4">
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}