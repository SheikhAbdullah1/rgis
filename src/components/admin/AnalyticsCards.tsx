"use client";

import { useEffect, useState } from "react";

export default function AnalyticsCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="border rounded-xl p-6">
        <h3>Total Users</h3>
        <p className="text-3xl font-bold">{stats.users}</p>
      </div>

      <div className="border rounded-xl p-6">
        <h3>Proposals</h3>
        <p className="text-3xl font-bold">{stats.proposals}</p>
      </div>

      <div className="border rounded-xl p-6">
        <h3>Memberships</h3>
        <p className="text-3xl font-bold">{stats.memberships}</p>
      </div>

      <div className="border rounded-xl p-6">
        <h3>Funding Opportunities</h3>
        <p className="text-3xl font-bold">{stats.funding}</p>
      </div>
    </div>
  );
}
