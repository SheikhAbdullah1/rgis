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

//   // Client side Search and Status matching
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

//   // const filteredProposals: any[] = [];

//   return (
//     <div className="rounded-xl border p-6">
//       {/* <DashboardStats proposals={proposals} /> */}
//       <DashboardStats />

//       {/* Search + Filter Inputs */}
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

//       {/* Main Records Table */}
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
//                   <Link
//                     href={`/admin/proposals/${proposal._id}`}
//                     className="rounded bg-blue-600 px-3 py-2 text-white inline-block text-center text-sm font-medium"
//                   >
//                     View
//                   </Link>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => deleteProposal(proposal._id.toString())}
//                     className="rounded bg-red-600 px-3 py-2 text-white text-sm font-medium"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Export Controls */}
//       <div className="mt-6 flex gap-4">
//         {/* <ExportExcel proposals={filteredProposals} />
//         <ExportPDF proposals={filteredProposals} /> */}
//         {/* <ExportExcel />
//         <ExportPDF /> */}
//         <ExportExcel data={filteredProposals} />
//         <ExportPDF data={filteredProposals} />
//       </div>
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
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const fetchProposals = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/proposals");

      const data = await res.json();

      if (data.success) {
        setProposals(data.proposals);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch("/api/admin/proposals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      fetchProposals();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProposal = async (
    id: string
  ) => {
    if (
      !window.confirm(
        "Delete this proposal permanently?"
      )
    )
      return;

    try {
      await fetch("/api/admin/proposals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      fetchProposals();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProposals =
    proposals.filter((proposal) => {
      const matchesSearch =
        proposal.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        proposal.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        proposal.trackingId
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        proposal.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });

  const statusColors: Record<
    string,
    string
  > = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Approved:
      "bg-green-100 text-green-700",

    Rejected:
      "bg-red-100 text-red-700",

    "Under Review":
      "bg-blue-100 text-blue-700",
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading proposals...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <DashboardStats />

      {/* Search + Filter */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="Search proposals..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 rounded-lg border p-3"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        >
          <option>All</option>
          <option>Pending</option>
          <option>
            Under Review
          </option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={fetchProposals}
          className="rounded-lg bg-gray-800 px-5 text-white hover:bg-black"
        >
          Refresh
        </button>
      </div>

      <div className="mb-5 flex items-center justify-between">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <strong>
            {
              filteredProposals.length
            }
          </strong>{" "}
          proposal(s)
        </p>

        <div className="flex gap-3">
          <ExportExcel
            data={
              filteredProposals
            }
          />

          <ExportPDF
            data={
              filteredProposals
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Tracking ID
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Applicant
              </th>

              <th className="p-4 text-left">
                Submitted
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Change Status
              </th>

              <th className="p-4 text-left">
                Review
              </th>

              <th className="p-4 text-left">
                Delete
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProposals.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-10 text-center text-gray-500"
                >
                  No proposals
                  match your search.
                </td>
              </tr>
            )}

            {filteredProposals.map(
              (proposal) => (
                <tr
                  key={proposal._id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {
                      proposal.trackingId
                    }
                  </td>

                  <td className="p-4">
                    {proposal.title}
                  </td>

                  <td className="p-4">
                    {
                      proposal.fullName
                    }
                  </td>

                  <td className="p-4">
                    {new Date(
                      proposal.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[
                          proposal
                            .status
                        ]
                      }`}
                    >
                      {
                        proposal.status
                      }
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={
                        proposal.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          proposal._id,
                          e.target.value
                        )
                      }
                      className="rounded border p-2"
                    >
                      <option>
                        Pending
                      </option>

                      <option>
                        Under Review
                      </option>

                      <option>
                        Approved
                      </option>

                      <option>
                        Rejected
                      </option>
                    </select>
                  </td>

                  <td className="p-4">

                    <Link
                      href={`/admin/proposals/${proposal._id}`}
                      className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Review
                    </Link>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        deleteProposal(
                          proposal._id
                        )
                      }
                      className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}