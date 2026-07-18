// src/components/proposal/types.ts

export interface BudgetItem {
    id: string;
    category: string;
    item: string;
    quantity: number;
    unitCost: number;
    total: number;
  }
  
  export interface Milestone {
    id: string;
    title: string;
    duration: string;
    deliverable: string;
  }
  
  export interface ProposalData {
    _id?: string;
  
    userId?: string;
  
    trackingId?: string;
  
    status?: string;
  
    role: string;
  
    submissionType: string;
  
    agency: string;
  
    grant: string;
  
    title: string;
  
    funding: string;
  
    description: string;
  
    researchArea: string;
  
    keywords: string;
  
    duration: string;
  
    expectedOutcomes: string;
  
    fullName: string;
  
    email: string;
  
    phone: string;
  
    cnic: string;
  
    country: string;
  
    website: string;
  
    organization: string;
  
    proposalFile?: string;
  
    budgetFile?: string;
  
    cvFile?: string;
  
    budgetItems: BudgetItem[];
  
    milestones: Milestone[];
  
    createdAt?: string;
  
    updatedAt?: string;
  }