"use client";

import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function DashboardCharts() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      });
  }, []);

  if (!stats) {
    return <p>Loading charts...</p>;
  }

  const pieData = {
    labels: [
      "Pending",
      "Under Review",
      "Approved",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          stats.pending,
          stats.review,
          stats.approved,
          stats.rejected,
        ],
        backgroundColor: [
          "#facc15",
          "#3b82f6",
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Pending",
      "Under Review",
      "Approved",
      "Rejected",
    ],
    datasets: [
      {
        label: "Proposals",
        data: [
          stats.pending,
          stats.review,
          stats.approved,
          stats.rejected,
        ],
        backgroundColor: "#2563eb",
      },
    ],
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-bold">
          Proposal Status Distribution
        </h2>

        <Pie data={pieData} />
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-bold">
          Proposal Statistics
        </h2>

        <Bar data={barData} />
      </div>
    </div>
  );
}
