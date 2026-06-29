"use client";

import { useState } from "react";

export default function TrackingForm() {
  const [trackingId, setTrackingId] =
    useState("");

  const [proposal, setProposal] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  const handleSearch = async () => {
    setError("");
    setProposal(null);

    const res = await fetch(
      `/api/trackProposals?trackingId=${trackingId}`
    );

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    setProposal(data.proposal);
  };

  return (
    <div className="space-y-6">

      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) =>
          setTrackingId(e.target.value)
        }
        className="border p-3 rounded-lg w-full"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Track Proposal
      </button>

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {proposal && (
        <div className="border rounded-lg p-6">
          <h2 className="font-bold text-xl">
            {proposal.title}
          </h2>

          <p>
            Status:
            {" "}
            {proposal.status}
          </p>

          <p>
            Applicant:
            {" "}
            {proposal.fullName}
          </p>

          <p>
            Submitted:
            {" "}
            {new Date(
              proposal.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}