"use client";

import { useState } from "react";
import SDGSpinner from "@/components/proposal/SDGSpinner";
import ProposalForm from "@/components/proposal/ProposalForm";

export default function ProposalCenterPage() {
  const [selectedSDG, setSelectedSDG] = useState<number | null>(null);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Proposal Center
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <SDGSpinner
          selectedSDG={selectedSDG}
          setSelectedSDG={setSelectedSDG}
        />

        <ProposalForm selectedSDG={selectedSDG} />
      </div>
    </main>
  );
}