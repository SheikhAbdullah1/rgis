// // import AdminProposalTable from "@/components/AdminProposalTable";

// // export default function AdminProposalsPage() {
// //   return (
// //     <main className="mx-auto max-w-7xl p-6">
// //       <h1 className="mb-8 text-3xl font-bold">Manage Proposals</h1>

// //       <AdminProposalTable />
// //       <ExportExcel data={proposals} />

// //       <ExportPDF data={proposals} />
// //     </main>
// //   );
// // }

// import AdminProposalTable from "@/components/AdminProposalTable";

// export default function AdminProposalsPage() {
//   return (
//     <main className="mx-auto max-w-7xl p-6">
//       <h1 className="mb-8 text-3xl font-bold">Manage Proposals</h1>

//       <AdminProposalTable />
//       {/* <ExportExcel data={proposals} />
//  */}
//       {/* <ExportPDF data={proposals} /> */}
//     </main>
//   );
// }


import AdminProposalTable from "@/components/AdminProposalTable";

export default function AdminProposalsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Proposal Management
        </h1>

        <p className="mt-2 text-gray-600">
          Review, approve, reject and manage submitted proposals.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">
            Total Proposals
          </h3>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-yellow-50 p-6 shadow-sm">
          <h3 className="text-sm text-gray-600">
            Pending Review
          </h3>

          <p className="mt-3 text-3xl font-bold text-yellow-700">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-green-50 p-6 shadow-sm">
          <h3 className="text-sm text-gray-600">
            Approved
          </h3>

          <p className="mt-3 text-3xl font-bold text-green-700">
            --
          </p>
        </div>

        <div className="rounded-xl border bg-red-50 p-6 shadow-sm">
          <h3 className="text-sm text-gray-600">
            Rejected
          </h3>

          <p className="mt-3 text-3xl font-bold text-red-700">
            --
          </p>
        </div>

      </div>

      {/* Proposal Table */}

      <AdminProposalTable />

    </main>
  );
}