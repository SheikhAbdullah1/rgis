"use client";

import Link from "next/link";
import ProposalStatus from "./ProposalStatus";

interface Props {
  proposal: any;
}

export default function ProposalCard({
  proposal,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {proposal.title}
          </h2>

          <p className="text-gray-600">
            {proposal.description?.slice(0, 150)}
            {proposal.description?.length > 150 && "..."}
          </p>

          <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
            <p>
              <span className="font-semibold">
                Tracking ID:
              </span>{" "}
              {proposal.trackingId}
            </p>

            <p>
              <span className="font-semibold">
                Funding:
              </span>{" "}
              {proposal.funding || "N/A"}
            </p>

            <p>
              <span className="font-semibold">
                Applicant:
              </span>{" "}
              {proposal.fullName}
            </p>

            <p>
              <span className="font-semibold">
                Organization:
              </span>{" "}
              {proposal.organization || "N/A"}
            </p>

            <p>
              <span className="font-semibold">
                Submitted:
              </span>{" "}
              {new Date(
                proposal.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <ProposalStatus
            status={proposal.status}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/proposal-center/view/${proposal._id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View
            </Link>

            {proposal.status === "Pending" && (
              <Link
                href={`/proposal-center/edit/${proposal._id}`}
                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
              >
                Edit
              </Link>
            )}

            {proposal.proposalFile && (
              <a
                href={proposal.proposalFile}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}