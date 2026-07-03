import AgencyList from "@/components/funding/AgencyList";

export default function FundingAgenciesPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-4xl font-bold">
        Funding Agencies
      </h1>

      <AgencyList />
    </main>
  );
}