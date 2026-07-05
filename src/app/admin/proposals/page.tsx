// import AdminProposalTable from "@/components/AdminProposalTable";

// export default function AdminProposalsPage() {
//   return (
//     <main className="mx-auto max-w-7xl p-6">
//       <h1 className="mb-8 text-3xl font-bold">Manage Proposals</h1>

//       <AdminProposalTable />
//       <ExportExcel data={proposals} />

//       <ExportPDF data={proposals} />
//     </main>
//   );
// }

import AdminProposalTable from "@/components/AdminProposalTable";

export default function AdminProposalsPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Manage Proposals</h1>

      <AdminProposalTable />
      {/* <ExportExcel data={proposals} />
 */}
      {/* <ExportPDF data={proposals} /> */}
    </main>
  );
}
