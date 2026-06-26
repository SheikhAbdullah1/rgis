import Filters from "@/components/funding/Filters";
import SearchBar from "@/components/funding/SearchBar";
import GrantGrid from "@/components/funding/GrantGrid";

export default function FundingPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Funding Opportunities
      </h1>

      <SearchBar />
      <Filters />
      <GrantGrid />
    </main>
  );
}