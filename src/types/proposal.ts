export interface Proposal {
    title: string;
    fullName: string;
    status: string;
    createdAt: string;
    trackingId: string;
  }


  const [proposal, setProposal] =
  useState<Proposal | null>(null);