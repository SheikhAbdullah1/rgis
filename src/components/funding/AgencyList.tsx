"use client";

import { useEffect, useState } from "react";
import AgencyCard from "./AgencyCard";

export default function AgencyList() {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agencies")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAgencies(data.agencies.filter(Boolean));
      })
      .finally(() => setLoading(false));
  }, []);

  const countries = [
    "All",
    ...new Set(agencies.map((a) => a.country).filter(Boolean)),
  ];

  const filteredAgencies = agencies.filter((agency) => {
    const matchesSearch = agency.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCountry =
      country === "All" || agency.country === country;
    return matchesSearch && matchesCountry;
  });

  if (loading) {
    return <p className="text-gray-500">Loading agencies...</p>;
  }

  if (!loading && agencies.length === 0) {
    return <p className="text-gray-500">No agencies found.</p>;
  }

  return (
    <>
      {/* Search + Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search agencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border p-3"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-lg border p-3"
        >
          {countries.map((c) => (
            <option key={c as string}>{c}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-500">
        {filteredAgencies.length} agenc
        {filteredAgencies.length === 1 ? "y" : "ies"} found
      </p>

      {/* Grid */}
      {filteredAgencies.length === 0 ? (
        <p className="text-gray-500">No agencies match your search.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgencies.map((agency) => (
            <AgencyCard key={agency._id} agency={agency} />
          ))}
        </div>
      )}
    </>
  );
}