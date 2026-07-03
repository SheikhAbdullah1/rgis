// // interface DashboardStatsProps {
// //     proposals: any[];
// //   }
  
// //   export default function DashboardStats({
// //     proposals,
// //   }: DashboardStatsProps) {
// //     const total = proposals.length;
  
// //     const pending =
// //       proposals.filter(
// //         (p) => p.status === "Pending"
// //       ).length;
  
// //     const approved =
// //       proposals.filter(
// //         (p) => p.status === "Approved"
// //       ).length;
  
// //     const rejected =
// //       proposals.filter(
// //         (p) => p.status === "Rejected"
// //       ).length;
  
// //     const review =
// //       proposals.filter(
// //         (p) =>
// //           p.status === "Under Review"
// //       ).length;
  
// //     const cards = [
// //       {
// //         title: "Total",
// //         value: total,
// //       },
// //       {
// //         title: "Pending",
// //         value: pending,
// //       },
// //       {
// //         title: "Approved",
// //         value: approved,
// //       },
// //       {
// //         title: "Under Review",
// //         value: review,
// //       },
// //       {
// //         title: "Rejected",
// //         value: rejected,
// //       },
// //     ];
  
// //     return (
// //       <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
// //         {cards.map((card) => (
// //           <div
// //             key={card.title}
// //             className="rounded-xl border bg-white p-6 shadow-sm"
// //           >
// //             <p className="text-gray-500">
// //               {card.title}
// //             </p>
  
// //             <h2 className="mt-2 text-3xl font-bold">
// //               {card.value}
// //             </h2>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }

// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardStats() {
//   const [stats, setStats] =
//     useState<any>(null);

//   useEffect(() => {
//     fetch("/api/admin/stats")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setStats(data.stats);
//         }
//       });
//   }, []);

//   if (!stats)
//     return <p>Loading...</p>;

//   const cards = [
//     {
//       title: "Total",
//       value: stats.total,
//     },
//     {
//       title: "Pending",
//       value: stats.pending,
//     },
//     {
//       title: "Under Review",
//       value: stats.review,
//     },
//     {
//       title: "Approved",
//       value: stats.approved,
//     },
//     {
//       title: "Rejected",
//       value: stats.rejected,
//     },
//   ];

//   return (
//     <div className="grid gap-6 md:grid-cols-5">
//       {cards.map((card) => (
//         <div
//           key={card.title}
//           className="rounded-xl border p-6 shadow-sm"
//         >
//           <h3 className="text-gray-500">
//             {card.title}
//           </h3>

//           <p className="mt-3 text-3xl font-bold">
//             {card.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


interface DashboardStatsProps {
  proposals: any[];
}

export default function DashboardStats({ proposals }: DashboardStatsProps) {
  // Real-time — proposals prop se calculate hota hai
  // Jab bhi AdminProposalTable fetchProposals() kare, ye auto-update hoga
  const total    = proposals.length;
  const pending  = proposals.filter((p) => p.status === "Pending").length;
  const approved = proposals.filter((p) => p.status === "Approved").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;
  const review   = proposals.filter((p) => p.status === "Under Review").length;

  const cards = [
    { title: "Total",        value: total    },
    { title: "Pending",      value: pending  },
    { title: "Under Review", value: review   },
    { title: "Approved",     value: approved },
    { title: "Rejected",     value: rejected },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <p className="text-gray-500">{card.title}</p>
          <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}