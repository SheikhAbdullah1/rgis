"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  proposals: any[];
}

export default function ExportExcel({
  proposals,
}: Props) {
  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(
        proposals
      );

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

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      data,
      "proposals.xlsx"
    );
  };

  return (
    <button
      onClick={exportExcel}
      className="rounded bg-green-600 px-4 py-2 text-white"
    >
      Export Excel
    </button>
  );
}