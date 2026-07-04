import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/FundingOpportunity";

export default async function GrantDetails({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  await connectDB();

  const grant =
    await FundingOpportunity.findById(
      id
    )
      .populate("agency")
      .lean() as any;

  if (!grant)
    notFound();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        {grant.title}
      </h1>

      <p className="mt-3 text-gray-500">
        {grant.agency?.name}
      </p>

      <div className="mt-8 rounded-xl border p-6 space-y-3">
        <p>
          <strong>
            Country:
          </strong>{" "}
          {grant.country}
        </p>

        <p>
          <strong>
            Amount:
          </strong>{" "}
          {grant.amount}
        </p>

        <p>
          <strong>
            Deadline:
          </strong>{" "}
          {grant.deadline}
        </p>

        {grant.category && (
          <p>
            <strong>
              Category:
            </strong>{" "}
            {grant.category}
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          Description
        </h2>

        <p className="leading-relaxed text-gray-700">
          {
            grant.description
          }
        </p>
      </div>

      <div className="mt-10">
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white">
          Apply Now
        </button>
      </div>
    </main>
  );
}