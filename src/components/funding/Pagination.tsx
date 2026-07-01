"use client";

import { useState } from "react";

interface Grant {
  id: number;
  title: string;
  agency: string;
  country: string;
  amount: string;
  deadline: string;
}

interface PaginationProps {
  filteredGrants: Grant[];
  itemsPerPage?: number;
}

export default function Pagination({
  filteredGrants,
  itemsPerPage = 6,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredGrants.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedGrants = filteredGrants.slice(start, start + itemsPerPage);

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`rounded-lg px-4 py-2 ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "border border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}