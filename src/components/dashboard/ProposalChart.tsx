"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface ProposalStatus {
  name: string;
  value: number;
}

const COLORS = [
  "#FACC15", // Pending
  "#22C55E", // Approved
  "#EF4444", // Rejected
];

export default function ProposalChart() {
  const [data, setData] = useState<ProposalStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChart() {
      try {
        const res = await fetch("/api/dashboard");

        if (!res.ok) {
          throw new Error("Failed to load dashboard");
        }

        const json = await res.json();

        setData(json.proposalStatus ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadChart();
  }, []);

  if (loading) {
    return (
      <div className="h-96 animate-pulse rounded-xl border bg-gray-100" />
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Proposal Status
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          No proposal data available.
        </p>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}