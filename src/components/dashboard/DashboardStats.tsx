// Target path in project: src/components/dashboard/DashboardStats.tsx
"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  totalAgencies: number;
  totalGrants: number;
  totalProposals: number;
  pending: number;
  approved: number;
  rejected: number;
  successRate: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorDetail, setErrorDetail] = useState<string>("");

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/dashboard");
        const text = await res.text();

        if (!res.ok) {
          // Surface the real status + body instead of swallowing it —
          // makes the actual server error visible in the UI.
          setErrorDetail(`HTTP ${res.status}: ${text.slice(0, 500)}`);
          setLoading(false);
          return;
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          setErrorDetail(
            `Response was not valid JSON: ${text.slice(0, 500)}`,
          );
          setLoading(false);
          return;
        }

        if (!data.success) {
          setErrorDetail(
            data.message || "API returned success: false with no message.",
          );
          setLoading(false);
          return;
        }

        setStats(data.stats);
      } catch (err) {
        setErrorDetail(
          err instanceof Error ? err.message : "Unknown fetch error.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl border bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-xl border bg-red-50 p-6 text-red-600">
        <p className="font-semibold">Failed to load dashboard statistics.</p>
        {errorDetail && (
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded bg-red-100 p-3 text-xs text-red-800">
            {errorDetail}
          </pre>
        )}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Proposals",
      value: stats.totalProposals,
      color: "bg-blue-50",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "bg-yellow-50",
    },
    {
      title: "Approved",
      value: stats.approved,
      color: "bg-green-50",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "bg-red-50",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      color: "bg-indigo-50",
    },
    {
      title: "Grants",
      value: stats.totalGrants,
      color: "bg-purple-50",
    },
    {
      title: "Agencies",
      value: stats.totalAgencies,
      color: "bg-cyan-50",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      color: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl border p-6 shadow-sm ${card.color}`}
        >
          <p className="text-sm text-gray-600">{card.title}</p>

          <h2 className="mt-3 text-3xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}