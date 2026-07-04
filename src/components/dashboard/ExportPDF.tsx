// "use client";

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// interface Props {
//   proposals: any[];
// }

// export default function ExportPDF({ proposals }: Props) {
//   const exportPDF = () => {
//     const doc = new jsPDF();

//     autoTable(doc, {
//       head: [["Tracking ID", "Title", "Applicant", "Status"]],
//       body: proposals.map((p) => [p.trackingId, p.title, p.fullName, p.status]),
//     });

//     doc.save("proposals.pdf");
//   };

//   return (
//     <button
//       onClick={exportPDF}
//       className="rounded bg-red-600 px-4 py-2 text-white"
//     >
//       Export PDF
//     </button>
//   );
// }

"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF({ data }: { data: any[] }) {
  const handleExport = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Tracking ID", "Title", "Applicant", "Status"]],

      body: data.map((item) => [
        item.trackingId,
        item.title,
        item.fullName,
        item.status,
      ]),
    });

    doc.save("proposals.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Export PDF
    </button>
  );
}
