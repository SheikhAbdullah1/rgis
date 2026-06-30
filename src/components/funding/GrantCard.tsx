interface GrantCardProps {
  title: string;
  agency: string;
  amount: string;
  deadline: string;
}

export default function GrantCard({
  title,
  agency,
  amount,
  deadline,
}: GrantCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-gray-600">
        Agency: {agency}
      </p>

      <p className="text-gray-600">
        Amount: {amount}
      </p>

      <p className="text-gray-600">
        Deadline: {deadline}
      </p>

      <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white">
        Apply Now
      </button>
    </div>
  );
}