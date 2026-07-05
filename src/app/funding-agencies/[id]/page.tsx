import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";
import FundingOpportunity from "@/models/Funding-opportunity";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const agency = await Agency.findById(id).lean() as any;
  if (!agency) notFound();

  const grants =
  await FundingOpportunity.find({
    agency: id,
  }).lean();

  return (
    
    <main className="mx-auto max-w-5xl p-6">

      {/* Header */}
      <div className="flex items-center gap-6">
        {agency.logo && (
          <img
            src={agency.logo}
            alt={agency.name}
            className="h-20 w-20 rounded-full object-cover border"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{agency.name}</h1>
          <p className="mt-1 text-gray-500">{agency.country}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-8 text-gray-700 leading-relaxed">
        {agency.description}
      </p>

      {/* Details */}
      <div className="mt-8 rounded-xl border p-6 space-y-3">
        {agency.website && (
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {agency.website}
            </a>
          </p>
        )}
        {agency.email && (
          <p>
            <strong>Email:</strong> {agency.email}
          </p>
        )}
        {agency.status && (
          <p>
            <strong>Status:</strong>{" "}
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              {agency.status}
            </span>
          </p>
        )}
      </div>

      {/* Funding Types */}
      {agency.fundingTypes?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Funding Types</h2>
          <div className="flex flex-wrap gap-2">
            {agency.fundingTypes.map((type: string) => (
              <span key={type} className="rounded-full bg-blue-100 px-3 py-1 text-sm">
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Focus Areas */}
      {agency.focusAreas?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Focus Areas</h2>
          <div className="flex flex-wrap gap-2">
            {agency.focusAreas.map((area: string) => (
              <span key={area} className="rounded-full bg-green-100 px-3 py-1 text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Grants */}
<div className="mt-12">
  <h2 className="mb-6 text-2xl font-bold">
    Available Grants
  </h2>

  {grants.length === 0 ? (
    <p className="text-gray-500">
      No grants available for this agency.
    </p>
  ) : (
    <div className="grid gap-6 md:grid-cols-2">
      {grants.map((grant: any) => (
        <div
          key={grant._id}
          className="rounded-xl border p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold">
            {grant.title}
          </h3>

          <p className="mt-3 text-gray-600">
            {grant.description}
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              <strong>Country:</strong>{" "}
              {grant.country}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              {grant.amount}
            </p>

            <p>
              <strong>Deadline:</strong>{" "}
              {grant.deadline}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </main>
  );
}