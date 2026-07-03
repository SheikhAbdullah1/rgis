// "use client";

// import { useEffect, useState } from "react";

// export default function ProposalHistory() {
//   const [proposals, setProposals] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetch("/api/proposals")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProposals(data.proposals);
//         }
//       })
//       .finally(() =>
//         setLoading(false)
//       );
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-20">
//         Loading proposals...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {proposals.length === 0 ? (
//         <div className="rounded-xl border p-10 text-center text-gray-500">
//           No proposals found.
//         </div>
//       ) : (
//         proposals.map((proposal) => (
//           <div
//             key={proposal._id}
//             className="rounded-xl border p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   {proposal.title}
//                 </h2>

//                 <p className="text-gray-500">
//                   Tracking ID:
//                   {" "}
//                   {proposal.trackingId}
//                 </p>
//               </div>

//               <span
//                 className={`rounded-full px-4 py-2 text-sm font-medium
//                 ${
//                   proposal.status ===
//                   "Approved"
//                     ? "bg-green-100 text-green-700"
//                     : proposal.status ===
//                       "Rejected"
//                     ? "bg-red-100 text-red-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {proposal.status}
//               </span>
//             </div>

//             <div className="mt-4 grid gap-3 md:grid-cols-2">
//               <p>
//                 <strong>
//                   Applicant:
//                 </strong>{" "}
//                 {proposal.fullName}
//               </p>

//               <p>
//                 <strong>
//                   Email:
//                 </strong>{" "}
//                 {proposal.email}
//               </p>

//               <p>
//                 <strong>
//                   Organization:
//                 </strong>{" "}
//                 {proposal.organization}
//               </p>

//               <p>
//                 <strong>
//                   Funding:
//                 </strong>{" "}
//                 {proposal.funding}
//               </p>

//               <p>
//                 <strong>
//                   Submitted:
//                 </strong>{" "}
//                 {new Date(
//                   proposal.createdAt
//                 ).toLocaleDateString()}
//               </p>
//             </div>

//             <div className="mt-5">
//               <h3 className="font-semibold">
//                 Description
//               </h3>

//               <p className="mt-2 text-gray-700">
//                 {proposal.description}
//               </p>
//             </div>

//             {proposal.proposalFile && (
//               <div className="mt-5">
//                 <a
//                   href={proposal.proposalFile}
//                   target="_blank"
//                   className="text-blue-600 underline"
//                 >
//                   View Proposal File
//                 </a>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

export default function ProposalHistory() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposals")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProposals(data.proposals);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading proposals...</p>;
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Tracking ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">File</th>
            </tr>
          </thead>

          <tbody>
            {proposals.map((proposal) => (
              <tr
                key={proposal._id}
                className="border-t"
              >
                <td className="p-4 font-medium">
                  {proposal.trackingId}
                </td>

                <td className="p-4">
                  {proposal.title}
                </td>

                <td className="p-4">
                  {proposal.fullName}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm
                    ${
                      proposal.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : proposal.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    proposal.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {proposal.proposalFile ? (
                    <a
                      href={proposal.proposalFile}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}

            {proposals.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No proposals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}