{/* <DashboardStats proposals={proposals} />
<ExportExcel proposals={filteredProposals} />
<ExportPDF proposals={filteredProposals} /> */}
import DashboardStats from "@/components/dashboard/DashboardStats";
import ExportExcel from "@/components/dashboard/ExportExcel";
import ExportPDF from "@/components/dashboard/ExportPDF";

export default function AdminProposalTable() {
  const filteredProposals: any[] = [];

  return (
    <>
      <DashboardStats />
      <ExportExcel data={filteredProposals} />
      <ExportPDF data={filteredProposals} />
    </>
  );
}