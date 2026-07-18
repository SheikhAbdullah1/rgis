"use client";

import Link from "next/link";

interface Props {
  proposal: any;
}

export default function ProposalPreview({
  proposal,
}: Props) {
  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            {proposal.title}
          </h1>

          <p className="text-gray-500">
            {proposal.trackingId}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            proposal.status === "Approved"
              ? "bg-green-100 text-green-700"
              : proposal.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {proposal.status}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <Info title="Applicant" value={proposal.fullName} />

        <Info title="Email" value={proposal.email} />

        <Info title="Phone" value={proposal.phone} />

        <Info title="CNIC" value={proposal.cnic} />

        <Info title="Country" value={proposal.country} />

        <Info title="Organization" value={proposal.organization} />

        <Info title="Funding" value={proposal.funding} />

      </div>

      <div>
        <h2 className="font-bold mb-2">
          Description
        </h2>

        <p className="text-gray-700 whitespace-pre-wrap">
          {proposal.description}
        </p>
      </div>

      {proposal.proposalFile && (
        <div>
          <Link
            href={proposal.proposalFile}
            target="_blank"
            className="text-blue-600 underline"
          >
            Download Proposal
          </Link>
        </div>
      )}

      <div className="flex gap-4">

        {proposal.status === "Pending" && (
          <Link
            href={`/proposal-center/edit/${proposal._id}`}
            className="rounded bg-blue-600 px-5 py-3 text-white"
          >
            Edit
          </Link>
        )}

        <Link
          href="/proposal-center/history"
          className="rounded border px-5 py-3"
        >
          Back
        </Link>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}