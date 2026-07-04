// "use client";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// export default function ExportExcel({
//   data,
// }: {
//   data: any[];
// }) {
//   const handleExport = () => {
//     const worksheet =
//       XLSX.utils.json_to_sheet(data);

//     const workbook =
//       XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Proposals"
//     );

//     const excelBuffer =
//       XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//     const blob = new Blob(
//       [excelBuffer],
//       {
//         type:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//       }
//     );

//     saveAs(
//       blob,
//       "proposals.xlsx"
//     );
//   };

//   return (
//     <button
//       onClick={handleExport}
//       className="bg-green-600 text-white px-4 py-2 rounded"
//     >
//       Export Excel
//     </button>
//   );
// }

"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportExcel({
  data,
}: {
  data: any[];
}) {
  const handleExport = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Proposals"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      blob,
      "proposals.xlsx"
    );
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Export Excel
    </button>
  );
}