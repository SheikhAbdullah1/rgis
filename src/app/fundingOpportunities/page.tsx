import Filters from "@/components/funding/Filters";
import SearchBar from "@/components/funding/SearchBar";
import GrantGrid from "@/components/funding/GrantGrid";
import type { Metadata } from "next"; 
export const metadata: Metadata = { 
  title: "Contact Us", 
  description: "Contact the Research Grant Intelligence System team.", 
};

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