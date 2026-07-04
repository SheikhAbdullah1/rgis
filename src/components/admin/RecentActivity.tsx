"use client";

interface Props {
  stats: any;
}

export default function RecentActivity({ stats }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">Recent Activity</h2>

      <p>Approved Proposals: {stats.approvedProposals}</p>

      <p>Pending Proposals: {stats.pendingProposals}</p>
    </div>
  );
}
