"use client";

import { useState } from "react";
import ProposalForm from "@/components/proposal/ProposalForm";
import ProposalGuidelines from "@/components/proposal/ProposalGuidelines";
import ProposalHistory from "@/components/proposal/ProposalHistory";
import ProposalTemplates from "@/components/proposal/ProposalTemplates";

export default function ProposalCenterPage() {
  const [formCompleted, setFormCompleted] = useState(false);
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Proposal Center</h1>

      {/* Form + Guidelines — side by side */}
      <div className="grid lg:grid-cols-2 gap-10 mb-10">
        <ProposalForm setFormCompleted={setFormCompleted} />
        <ProposalGuidelines />
      </div>

      {/* Templates — full width */}
      <div className="mb-10">
        <ProposalTemplates />
      </div>

      {/* History — full width */}
      <div>
        <ProposalHistory />
      </div>
    </main>
  );
}