"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Proposal {
  _id: string;
  trackingId: string;
  title: string;
  funding?: string;
  submissionType: string;
  status: string;
  createdAt: string;
}

export default function ProposalHistory() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProposals();
  }, []);

  async function loadProposals() {
    try {
      const res = await fetch("/api/proposals");

      if (res.status === 401) {
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setProposals(data.proposals);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  if (!proposals.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h2 className="text-xl font-semibold">
          No proposals found.
        </h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Tracking ID</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Funding</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-center">Action</th>
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
                {proposal.funding || "-"}
              </td>

              <td className="p-4">
                {proposal.status}
              </td>

              <td className="p-4">
                {new Date(
                  proposal.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4 text-center">
                <Link
                  href={`/proposal-center/view/${proposal._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}