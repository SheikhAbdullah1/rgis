"use client";

import { useEffect, useState } from "react";

import AnalyticsCards from "./AnalyticsCards";

import ProposalChart from "./ProposalChart";

import UserChart from "./UserChart";

import RecentActivity from "./RecentActivity";

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<any>();

  const [chart, setChart] = useState<any>();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats));

    fetch("/api/admin/chart")
      .then((res) => res.json())
      .then((data) => setChart(data));
  }, []);

  if (!stats || !chart) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <AnalyticsCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ProposalChart data={chart.proposalStats} />

        <UserChart data={chart.userGrowth} />
      </div>

      <RecentActivity stats={stats} />
    </div>
  );
}
