import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentProposals from "@/components/dashboard/RecentProposals";
import ProposalChart from "@/components/dashboard/ProposalChart";

export default function AdminDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
        Welcome to Research Grant Intelligence System Admin Panel.
        </p>
      </div>

      <DashboardStats />

      <ProposalChart />

      <RecentProposals />
    </main>
  );
}