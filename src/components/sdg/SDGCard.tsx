import Link from "next/link";

export default function SDGCard({
  sdg,
}: {
  sdg: any;
}) {
  return (
    <Link
      href={`/sdgs/${sdg.slug}`}
      className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md"
    >
      <div
        className="mb-4 h-4 w-16 rounded"
        style={{
          background: sdg.color,
        }}
      />

      <h3 className="text-xl font-bold">
        Goal {sdg.number}
      </h3>

      <p className="mt-2 font-semibold">
        {sdg.name}
      </p>

      <p className="mt-3 text-gray-600 line-clamp-3">
        {sdg.description}
      </p>
    </Link>
  );
}