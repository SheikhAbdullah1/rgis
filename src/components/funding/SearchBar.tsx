"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search grants, agencies, or keywords..."
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
        Search
      </button>
    </div>
  );
}