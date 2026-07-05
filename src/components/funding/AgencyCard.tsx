interface Agency {
  _id: string;
  name: string;
  country?: string;
  description?: string;
  website?: string;
  fundingTypes?: string[];
  focusAreas?: string[];
}

interface AgencyCardProps {
  agency: Agency;
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-bold">{agency.name}</h3>
      {agency.country && (
        <p className="mt-1 text-sm text-gray-500">{agency.country}</p>
      )}
      {agency.description && (
        <p className="mt-4 text-gray-600 line-clamp-3">{agency.description}</p>
      )}

      {agency.fundingTypes && agency.fundingTypes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {agency.fundingTypes.map((type) => (
            <span
              key={type}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {agency.website && (
        
        <a  href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-semibold text-blue-600 hover:underline"
        >
          Visit Website →
        </a>
      )}
    </div>
  );
}