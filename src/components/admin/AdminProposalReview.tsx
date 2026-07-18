"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Proposal {
  _id: string;
  trackingId: string;
  title: string;
  funding: string;
  submissionType: string;
  description: string;

  fullName: string;
  email: string;
  phone: string;
  cnic: string;
  country: string;
  organization: string;

  proposalFile?: string;

  status: string;
  adminComment?: string;

  reviewedBy?: string;
  reviewedAt?: string;
}

interface Props {
  proposalId: string;
}

export default function AdminProposalReview({
  proposalId,
}: Props) {
  const router = useRouter();

  const [proposal, setProposal] =
    useState<Proposal | null>(null);

  const [status, setStatus] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /* ------------------------------
      Load Proposal
  ------------------------------ */

  useEffect(() => {
    fetchProposal();
  }, []);

  async function fetchProposal() {
    try {
      const res = await fetch(
        `/api/admin/proposals/${proposalId}`
      );

      const data = await res.json();

      if (data.success) {
        setProposal(data.proposal);
        setStatus(data.proposal.status);
        setComment(
          data.proposal.adminComment || ""
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* ------------------------------
      Save Review
  ------------------------------ */

  async function saveReview() {
    try {
      setSaving(true);

      const res = await fetch(
        `/api/admin/proposals/${proposalId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
            adminComment: comment,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Review updated successfully");

      router.refresh();

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <p>Loading...</p>;

  if (!proposal)
    return <p>Proposal not found.</p>;

  return (
    <div className="space-y-8">

      {/* Proposal */}

      <div className="rounded-lg border p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-4">
          Proposal Information
        </h2>

        <div className="space-y-2">

          <p>
            <strong>Tracking ID:</strong>{" "}
            {proposal.trackingId}
          </p>

          <p>
            <strong>Title:</strong>{" "}
            {proposal.title}
          </p>

          <p>
            <strong>Funding:</strong>{" "}
            {proposal.funding}
          </p>

          <p>
            <strong>Submission:</strong>{" "}
            {proposal.submissionType}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p className="text-gray-600 whitespace-pre-wrap">
            {proposal.description}
          </p>

        </div>

      </div>

      {/* Applicant */}

      <div className="rounded-lg border p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-4">
          Applicant Information
        </h2>

        <div className="space-y-2">

          <p>
            <strong>Name:</strong>{" "}
            {proposal.fullName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {proposal.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {proposal.phone}
          </p>

          <p>
            <strong>CNIC:</strong>{" "}
            {proposal.cnic}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {proposal.country}
          </p>

          <p>
            <strong>Organization:</strong>{" "}
            {proposal.organization}
          </p>

        </div>

      </div>

      {/* Proposal File */}

      <div className="rounded-lg border p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-4">
          Proposal Document
        </h2>

        {proposal.proposalFile ? (
          <a
            href={proposal.proposalFile}
            target="_blank"
            className="text-blue-600 underline"
          >
            Download Proposal
          </a>
        ) : (
          <p>No document uploaded.</p>
        )}

      </div>

      {/* Review */}

      <div className="rounded-lg border p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">
          Admin Review
        </h2>

        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full rounded border p-3 mb-5"
        >
          <option>Pending</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Revision Requested</option>
        </select>

        <label className="block mb-2 font-medium">
          Admin Comment
        </label>

        <textarea
          rows={6}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => setStatus("Approved")}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Approve
          </button>

          <button
            onClick={() => setStatus("Rejected")}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Reject
          </button>

          <button
            onClick={() =>
              setStatus("Revision Requested")
            }
            className="rounded bg-yellow-600 px-4 py-2 text-white"
          >
            Request Revision
          </button>

        </div>

        <button
          onClick={saveReview}
          disabled={saving}
          className="mt-8 rounded bg-blue-600 px-6 py-3 text-white"
        >
          {saving
            ? "Saving..."
            : "Save Review"}
        </button>

      </div>

    </div>
  );
}