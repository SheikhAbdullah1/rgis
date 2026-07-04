import Link from "next/link";

export default function DashboardMembershipPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Membership</h1>
      <p className="text-gray-500 mb-8">
        Manage your RGIS membership plan and subscription.
      </p>

      <div className="rounded-xl border p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Free Plan</h2>
        <p className="text-gray-500 mb-6">
          You are currently on the Free plan.
        </p>
        <Link
          href="/membership"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Upgrade to Premium
        </Link>
      </div>
    </main>
  );
}