interface AgencyCardProps {
  name: string;
  country: string;
}

export default function AgencyCard({
  name,
  country,
}: AgencyCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        {name}
      </h3>

      <p className="mt-3 text-gray-600">
        {country}
      </p>
    </div>
  );
}
