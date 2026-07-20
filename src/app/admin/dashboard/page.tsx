// Target path in project: src/app/admin/dashboard/page.tsx

import DashboardStats from "@/components/dashboard/DashboardStats";
import ProposalChart from "@/components/dashboard/ProposalChart";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentProposals from "@/components/dashboard/RecentProposals";
import Recommendations from "@/components/dashboard/Recommendations";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <DashboardStats />

      <ProposalChart />

      <DashboardCharts />

      <Recommendations />

      <RecentProposals />
    </main>
  );
}