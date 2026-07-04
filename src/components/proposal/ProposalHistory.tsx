"use client";

import { useEffect, useState } from "react";

export default function ProposalHistory() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-proposals")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProposals(data.proposals);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500 py-4">Loading proposals...</p>;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">Proposal History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Tracking ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">File</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No proposals found.
                </td>
              </tr>
            ) : (
              proposals.map((proposal) => (
                <tr key={proposal._id} className="border-t">
                  <td className="p-4 font-medium">{proposal.trackingId}</td>
                  <td className="p-4">{proposal.title}</td>
                  <td className="p-4">{proposal.fullName}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      proposal.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : proposal.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : proposal.status === "Under Review"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {proposal.proposalFile ? (
                      <a href={proposal.proposalFile} target="_blank"
                        className="text-blue-600 underline">View</a>
                    ) : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}