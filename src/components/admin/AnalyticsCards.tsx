// Target path in project: src/components/admin/AnalyticsCards.tsx
"use client";

import { useEffect, useState } from "react";

interface AnalyticsStats {
  totalUsers: number;
  totalProposals: number;
  totalAgencies: number;
  totalGrants: number;
  totalMemberships: number;
  pendingProposals: number;
  approvedProposals: number;
}

export default function AnalyticsCards() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-xl border bg-red-50 p-6 text-sm text-red-600">
        Failed to load analytics.
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Proposals", value: stats.totalProposals },
    { label: "Memberships", value: stats.totalMemberships },
    { label: "Funding Opportunities", value: stats.totalGrants },
    { label: "Agencies", value: stats.totalAgencies },
    { label: "Pending Proposals", value: stats.pendingProposals },
    { label: "Approved Proposals", value: stats.approvedProposals },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">{card.label}</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}