// import Link from "next/link";

// interface GrantCardProps {
//   title: string;
//   agency: string;
//   amount: string;
//   deadline: string;
// }

// export default function GrantCard({
//   title,
//   agency,
//   amount,
//   deadline,
// }: GrantCardProps) {
//   return (
//     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//       <h3 className="text-xl font-bold">{title}
//       <Link
//   href={`/fundingOpportunities/${grant._id}`}
// >
//   View Details
// </Link>
//       </h3>

//       <p className="mt-3 text-gray-600">
//         Agency: {agency}
//       </p>

//       <p className="text-gray-600">
//         Amount: {amount}
//       </p>

//       <p className="text-gray-600">
//         Deadline: {deadline}
//       </p>

//       <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white">
//         Apply Now
//         <Link
//   href={`/fundingOpportunities/${grant._id}`}
// >
//   View Details
// </Link>
//       </button>

//     </div>
//   );
// }


import Link from "next/link";

interface GrantCardProps {
  _id?: string;
  id?: number;
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  category?: string;
  country?: string;
}

export default function GrantCard({
  _id,
  id,
  title,
  agency,
  amount,
  deadline,
  category,
  country,
}: GrantCardProps) {
  const grantId = _id ?? id;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>

      {category && (
        <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {category}
        </span>
      )}

      <p className="mt-3 text-gray-600">Agency: {agency}</p>
      {country && <p className="text-gray-600">Country: {country}</p>}
      <p className="text-gray-600">Amount: {amount}</p>
      <p className="text-gray-600">Deadline: {deadline}</p>

      <div className="mt-6 flex gap-3">
        {grantId && (
          <Link
            href={`/fundingOpportunities/${grantId}`}
            className="flex-1 rounded-lg border border-blue-600 py-3 text-center text-blue-600 hover:bg-blue-50"
          >
            View Details
          </Link>
        )}
        <button className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
}