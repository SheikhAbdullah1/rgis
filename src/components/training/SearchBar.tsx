"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/training-academy/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex gap-3 mb-10">
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 border rounded-lg p-3"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
