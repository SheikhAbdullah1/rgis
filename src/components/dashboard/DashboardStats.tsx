// interface DashboardStatsProps {
//   proposals: any[];
// }
// // export default function DashboardStats({ proposals }: DashboardStatsProps) {
//   export default function DashboardStats({ proposals }: DashboardStatsProps) {
//   // Real-time — proposals prop se calculate hota hai
//   // Jab bhi AdminProposalTable fetchProposals() kare, ye auto-update hoga
//   const total    = proposals.length;
//   const pending  = proposals.filter((p) => p.status === "Pending").length;
//   const approved = proposals.filter((p) => p.status === "Approved").length;
//   const rejected = proposals.filter((p) => p.status === "Rejected").length;
//   const review   = proposals.filter((p) => p.status === "Under Review").length;

//   const cards = [
//     { title: "Total",        value: total    },
//     { title: "Pending",      value: pending  },
//     { title: "Under Review", value: review   },
//     { title: "Approved",     value: approved },
//     { title: "Rejected",     value: rejected },
//   ];

//   return (
//     <div className="mb-8 grid gap-6 md:grid-cols-5">
//       {cards.map((card) => (
//         <div
//           key={card.title}
//           className="rounded-xl border bg-white p-6 shadow-sm"
//         >
//           <p className="text-gray-500">{card.title}</p>
//           <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.stats);
      });
  }, []);

  if (!stats) return <p className="py-8 text-center text-gray-500">Loading stats...</p>;

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Proposals", value: stats.totalProposals },
    { title: "Approved", value: stats.approvedProposals },
    { title: "Pending", value: stats.pendingProposals },
    { title: "Memberships", value: stats.totalMemberships },
    { title: "Funding Listings", value: stats.totalFunding },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">{card.title}</p>
          <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}