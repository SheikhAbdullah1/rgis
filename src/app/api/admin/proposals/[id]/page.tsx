import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export default async function ProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const proposal =
    await Proposal.findById(id)
      .populate("agency")
      .populate("grant")
      .lean() as any;

  if (!proposal) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl p-6">

      <h1 className="mb-8 text-3xl font-bold">
        Proposal Details
      </h1>

      <div className="space-y-4 rounded-xl border p-6">

        <p>
          <strong>
            Tracking ID:
          </strong>{" "}
          {proposal.trackingId}
        </p>

        <p>
          <strong>
            Title:
          </strong>{" "}
          {proposal.title}
        </p>

        <p>
          <strong>
            Applicant:
          </strong>{" "}
          {proposal.fullName}
        </p>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {proposal.email}
        </p>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {proposal.phone}
        </p>

        <p>
          <strong>
            Country:
          </strong>{" "}
          {proposal.country}
        </p>

        <p>
          <strong>
            Organization:
          </strong>{" "}
          {proposal.organization}
        </p>

        <p>
          <strong>
            Funding:
          </strong>{" "}
          {proposal.funding}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {proposal.status}
        </p>

        <div>
          <strong>
            Description:
          </strong>

          <div className="mt-2 rounded bg-gray-50 p-4">
            {proposal.description}
          </div>
        </div>

        {proposal.proposalFile && (
          <a
            href={proposal.proposalFile}
            target="_blank"
            className="inline-block rounded bg-blue-600 px-5 py-3 text-white"
          >
            Download Proposal
          </a>
        )}
      </div>

      {/* Comments */}

      <div className="mt-10 rounded-xl border p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Comments
        </h2>

        {proposal.comments?.length >
        0 ? (
          proposal.comments.map(
            (
              comment: any,
              index: number
            ) => (
              <div
                key={index}
                className="mb-4 rounded border p-4"
              >
                <p className="font-semibold">
                  {comment.user}
                </p>

                <p>
                  {comment.message}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {new Date(
                    comment.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-gray-500">
            No comments yet.
          </p>
        )}
      </div>
    </main>
  );
}