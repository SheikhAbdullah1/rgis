"use client";

import { useState } from "react";
import ProposalForm from "@/components/proposal/ProposalForm";
import ProposalGuidelines from "@/components/proposal/ProposalGuidelines";
import ProposalHistory from "@/components/proposal/ProposalHistory"
// import ProposalTemplates from "@/components/proposal/ProposalTemplates";
// import BudgetPlanner from "@/components/proposal/BudgetPlanner";

// import type { Metadata } from "next"; 
// export const metadata: Metadata = { 
//   title: "Contact Us", 
//   description: "Contact the Research Grant Intelligence System team.", 
// };

export default function ProposalCenterPage() {
  
  const [formCompleted, setFormCompleted] =
    useState(false);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Proposal Center
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
      <ProposalForm
        setFormCompleted={setFormCompleted}
      />
      <ProposalGuidelines />
      <ProposalHistory />
      {/* <ProposalTemplates /> */}
      {/* <BudgetPlanner /> */}
      </div>
    </main>
  );
}

