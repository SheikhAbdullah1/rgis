// import { notFound } from "next/navigation";
// import Link from "next/link";

// interface Props {
//   params: Promise<{
//     id: string;
//   }>;
// }

// async function getProposal(id: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/proposals/${id}`,
//     {
//       cache: "no-store",
//     }
//   );

//   const data = await res.json();

//   if (!data.success) {
//     return null;
//   }

//   return data.proposal;
// }

// export default async function ProposalViewPage({
//   params,
// }: Props) {
//   const { id } = await params;

//   const proposal = await getProposal(id);

//   if (!proposal) {
//     notFound();
//   }

//   return (
//     <main className="mx-auto max-w-5xl px-6 py-10">
//       <div className="rounded-2xl border bg-white p-8 shadow-sm">

//         <div className="flex items-center justify-between">
//           <h1 className="text-4xl font-bold">
//             {proposal.title}
//           </h1>

//           <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
//             {proposal.status}
//           </span>
//         </div>

//         <div className="mt-8 grid gap-5 md:grid-cols-2">

//           <Info
//             label="Tracking ID"
//             value={proposal.trackingId}
//           />

//           <Info
//             label="Funding"
//             value={proposal.funding || "N/A"}
//           />

//           <Info
//             label="Applicant"
//             value={proposal.fullName}
//           />

//           <Info
//             label="Email"
//             value={proposal.email}
//           />

//           <Info
//             label="Phone"
//             value={proposal.phone}
//           />

//           <Info
//             label="CNIC"
//             value={proposal.cnic}
//           />

//           <Info
//             label="Organization"
//             value={
//               proposal.organization || "N/A"
//             }
//           />

//           <Info
//             label="Country"
//             value={proposal.country || "N/A"}
//           />

//           <Info
//             label="Website"
//             value={proposal.website || "N/A"}
//           />

//           <Info
//             label="Submission Type"
//             value={proposal.submissionType}
//           />

//           <Info
//             label="Role"
//             value={proposal.role}
//           />

//           <Info
//             label="Submitted"
//             value={new Date(
//               proposal.createdAt
//             ).toLocaleString()}
//           />

//         </div>

//         <div className="mt-10">

//           <h2 className="text-2xl font-bold">
//             Description
//           </h2>

//           <p className="mt-4 whitespace-pre-line text-gray-700 leading-8">
//             {proposal.description}
//           </p>

//         </div>

//         {proposal.proposalFile && (

//           <div className="mt-10">

//             <Link
//               href={proposal.proposalFile}
//               target="_blank"
//               className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
//             >
//               Download Proposal
//             </Link>

//           </div>

//         )}
//       </div>
//     </main>
//   );
// }

// function Info({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-xl border p-4">
//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="mt-1 font-semibold">
//         {value}
//       </p>
//     </div>
//   );
// }

import ProposalPreview from "@/components/proposal/ProposalPreview";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProposalViewPage({
  params,
}: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/proposals/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!data.success) {
    return (
      <div className="p-10">
        Proposal not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <ProposalPreview proposal={data.proposal} />
    </main>
  );
}