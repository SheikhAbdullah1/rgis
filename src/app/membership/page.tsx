import PricingCard from "@/components/membership/PricingCard";
import FeatureTable from "@/components/membership/FeatureTable";
import FAQ from "@/components/membership/FAQ";
import CTA from "@/components/membership/CTA";
// import Hero from "@/components/ui/PageHero"
import type { Metadata } from "next"; 

export const metadata: Metadata = { 
  title: "Contact Us", 
  description: "Contact the Research Grant Intelligence System team.", 
};

export default function MembershipPage() {
  return (
    
    <div className="container mx-auto px-6 py-16">

      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Membership Plans
        </h1>

        <p className="mt-4 text-gray-600">
          Choose the perfect plan for your research journey.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">

        <PricingCard
          title="Free"
          price="$0"
          description="For individuals getting started."
          features={[
            "Funding Opportunities",
            "Proposal Templates",
            "Training Resources",
          ]}
          buttonText="Get Started"
        />

        <PricingCard
          title="Premium"
          price="$19/mo"
          description="For active researchers."
          features={[
            "Everything in Free",
            "Proposal Tracking",
            "AI Recommendations",
            "Priority Support",
          ]}
          buttonText="Upgrade"
          highlighted
        />

        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For institutions and organizations."
          features={[
            "Everything in Premium",
            "Analytics Dashboard",
            "Team Management",
            "Dedicated Support",
          ]}
          buttonText="Contact Sales"
        />
      </div>

      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">
          Compare Features
        </h2>

        <FeatureTable />
      </section>

      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <FAQ />
      </section>

      <section className="mt-24">
        <CTA />
      </section>
    </div>
  );
}