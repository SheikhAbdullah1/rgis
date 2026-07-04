import Link from "next/link";

interface Props {
  agency: any;
}

export default function AgencyCard({ agency }: Props) {
  if (!agency) return null;

  return (
    <div className="rounded-xl border p-6 shadow-sm">

      {agency.logo && (
        <img
          src={agency.logo}
          alt={agency.name}
          className="mb-4 h-16 w-16 rounded-full object-cover"
        />
      )}

      <h2 className="text-2xl font-bold">{agency.name}</h2>
      <p className="mt-2 text-gray-500">{agency.country}</p>
      <p className="mt-4 line-clamp-3">{agency.description}</p>

      <div className="mt-6 flex gap-3">
        {agency.website && (
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Website
          </a>
        )}
        <Link
          href={`/funding-agencies/${agency._id}`}
          className="rounded border px-4 py-2"
        >
          Details
        </Link>
      </div>

      {agency.fundingTypes?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {agency.fundingTypes.map((type: string) => (
            <span key={type} className="rounded-full bg-blue-100 px-3 py-1 text-sm">
              {type}
            </span>
          ))}
        </div>
      )}

      {agency.focusAreas?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {agency.focusAreas.map((area: string) => (
            <span key={area} className="rounded-full bg-green-100 px-3 py-1 text-sm">
              {area}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}