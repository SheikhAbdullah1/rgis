type GrantCardProps = {
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
};

export default function GrantCard({
  title,
  organization,
  amount,
  deadline,
  category,
}: GrantCardProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg">
      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
        {category}
      </span>

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {organization}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <p>
          <strong>Funding:</strong> {amount}
        </p>

        <p>
          <strong>Deadline:</strong> {deadline}
        </p>
      </div>

      <button className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}