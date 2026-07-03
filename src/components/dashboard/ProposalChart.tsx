"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function ProposalChart() {
  const [data, setData] =
    useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/chart")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      });
  }, []);

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-bold">
        Proposal Submissions
      </h2>

      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}