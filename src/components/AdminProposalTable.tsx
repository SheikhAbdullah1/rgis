// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import DashboardStats from "@/components/dashboard/DashboardStats";
// import ExportExcel from "@/components/dashboard/ExportExcel";
// import ExportPDF from "@/components/dashboard/ExportPDF";

// export default function AdminProposalTable() {
//   const [proposals, setProposals] = useState<any[]>([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedProposal, setSelectedProposal] = useState<any>(null);
//   const [comment, setComment] = useState("");

//   const fetchProposals = async () => {
//     const res = await fetch("/api/admin/proposals");
//     const data = await res.json();
//     if (data.success) setProposals(data.proposals);
//   };

//   useEffect(() => {
//     fetchProposals();
//   }, []);

//   const updateStatus = async (id: string, status: string) => {
//     await fetch("/api/admin/proposals", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, status }),
//     });
//     fetchProposals();
//   };

//   const deleteProposal = async (id: string) => {
//     if (!window.confirm("Delete this proposal?")) return;
//     await fetch("/api/admin/proposals", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchProposals();
//   };

//   const addComment = async (proposalId: string) => {
//     await fetch("/api/admin/proposals/comments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ proposalId, user: "Admin", message: comment }),
//     });
//     fetchProposals();
//     setComment("");
//   };

//   const filteredProposals = proposals.filter((p) => {
//     const matchesSearch =
//       p.title?.toLowerCase().includes(search.toLowerCase()) ||
//       p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//       p.trackingId?.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = statusFilter === "All" || p.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const statusColors: Record<string, string> = {
//     Pending: "bg-yellow-100 text-yellow-800",
//     Approved: "bg-green-100 text-green-800",
//     Rejected: "bg-red-100 text-red-800",
//     "Under Review": "bg-blue-100 text-blue-800",
//   };

//   return (
//     <div className="rounded-xl border p-6">
//       <DashboardStats proposals={proposals} />

//       {/* Search + Filter */}
//       <div className="mb-6 flex flex-col gap-4 md:flex-row">
//         <input
//           type="text"
//           placeholder="Search proposals..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 rounded-lg border p-3"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="rounded-lg border p-3"
//         >
//           <option>All</option>
//           <option>Pending</option>
//           <option>Under Review</option>
//           <option>Approved</option>
//           <option>Rejected</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4">Tracking ID</th>
//               <th className="p-4">Title</th>
//               <th className="p-4">Applicant</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Actions</th>
//               <th className="p-4">View</th>
//               <th className="p-4">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProposals.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="p-8 text-center text-gray-500">
//                   No proposals found.
//                 </td>
//               </tr>
//             )}
//             {filteredProposals.map((proposal) => (
//               <tr key={proposal._id} className="border-t">
//                 <td className="p-4">{proposal.trackingId}</td>
//                 <td className="p-4">{proposal.title}</td>
//                 <td className="p-4">{proposal.fullName}</td>
//                 <td className="p-4">
//                   <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[proposal.status] ?? ""}`}>
//                     {proposal.status}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <select
//                     value={proposal.status}
//                     onChange={(e) => updateStatus(proposal._id, e.target.value)}
//                     className="rounded border p-2"
//                   >
//                     <option>Pending</option>
//                     <option>Under Review</option>
//                     <option>Approved</option>
//                     <option>Rejected</option>
//                   </select>
//                 </td>
//                 <td className="p-4">
//                   {/* <button
//                     onClick={() => setSelectedProposal(proposal)}
//                     className="rounded bg-blue-600 px-3 py-2 text-white"
//                   >
//                     View
//                   </button> */}
//                   <Link
//   href={`/admin/proposals/${proposal._id}`}
//   className="rounded bg-blue-600 px-3 py-2 text-white"
// >
//   View
// </Link>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => deleteProposal(proposal._id.toString())}
//                     className="rounded bg-red-600 px-3 py-2 text-white"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Export buttons */}
//       <div className="mt-6 flex gap-4">
//         <ExportExcel proposals={filteredProposals} />
//         <ExportPDF proposals={filteredProposals} />
//       </div>

//       {/* View + Comments Modal */}
//       {selectedProposal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-2xl rounded-xl bg-white p-6 max-h-[90vh] overflow-y-auto">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-2xl font-bold">Proposal Details</h2>
//               <button onClick={() => setSelectedProposal(null)} className="text-2xl">×</button>
//             </div>

//             <div className="space-y-3">
//               <p><strong>Tracking ID:</strong> {selectedProposal.trackingId}</p>
//               <p><strong>Applicant:</strong> {selectedProposal.fullName}</p>
//               <p><strong>Email:</strong> {selectedProposal.email}</p>
//               <p><strong>Phone:</strong> {selectedProposal.phone}</p>
//               <p><strong>Country:</strong> {selectedProposal.country}</p>
//               <p><strong>Organization:</strong> {selectedProposal.organization}</p>
//               <p><strong>Funding:</strong> {selectedProposal.funding}</p>
//               <p><strong>Description:</strong> {selectedProposal.description}</p>
//               <p><strong>Status:</strong> {selectedProposal.status}</p>
//               {selectedProposal.proposalFile && (
//                 <a
//                   href={selectedProposal.proposalFile}
//                   target="_blank"
//                   className="inline-block rounded bg-green-600 px-4 py-2 text-white"
//                 >
//                   Download Proposal
//                 </a>
//               )}
//             </div>

//             {/* Comments — modal ke ANDAR */}
//             <div className="mt-8">
//               <h3 className="mb-4 text-xl font-bold">Comments</h3>
//               {selectedProposal.comments?.map((c: any, index: number) => (
//                 <div key={index} className="mb-3 rounded border p-3">
//                   <p className="font-semibold">{c.user}</p>
//                   <p>{c.message}</p>
//                 </div>
//               ))}
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="mt-4 w-full rounded border p-3"
//                 placeholder="Add comment..."
//               />
//               <button
//                 onClick={() => addComment(selectedProposal._id)}
//                 className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
//               >
//                 Add Comment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ExportExcel from "@/components/dashboard/ExportExcel";
import ExportPDF from "@/components/dashboard/ExportPDF";

export default function AdminProposalTable() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchProposals = async () => {
    const res = await fetch("/api/admin/proposals");
    const data = await res.json();
    if (data.success) setProposals(data.proposals);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/proposals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchProposals();
  };

  const deleteProposal = async (id: string) => {
    if (!window.confirm("Delete this proposal?")) return;
    await fetch("/api/admin/proposals", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProposals();
  };

  // Client side Search and Status matching
  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      p.trackingId?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    "Under Review": "bg-blue-100 text-blue-800",
  };

  return (
    <div className="rounded-xl border p-6">
      <DashboardStats proposals={proposals} />

      {/* Search + Filter Inputs */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search proposals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border p-3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Main Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Tracking ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
              <th className="p-4">View</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No proposals found.
                </td>
              </tr>
            )}
            {filteredProposals.map((proposal) => (
              <tr key={proposal._id} className="border-t">
                <td className="p-4">{proposal.trackingId}</td>
                <td className="p-4">{proposal.title}</td>
                <td className="p-4">{proposal.fullName}</td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[proposal.status] ?? ""}`}>
                    {proposal.status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={proposal.status}
                    onChange={(e) => updateStatus(proposal._id, e.target.value)}
                    className="rounded border p-2"
                  >
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/proposals/${proposal._id}`}
                    className="rounded bg-blue-600 px-3 py-2 text-white inline-block text-center text-sm font-medium"
                  >
                    View
                  </Link>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => deleteProposal(proposal._id.toString())}
                    className="rounded bg-red-600 px-3 py-2 text-white text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Controls */}
      <div className="mt-6 flex gap-4">
        <ExportExcel proposals={filteredProposals} />
        <ExportPDF proposals={filteredProposals} />
      </div>
    </div>
  );
}