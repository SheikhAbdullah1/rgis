import PricingCard from "@/components/membership/PricingCard";
import FeatureTable from "@/components/membership/FeatureTable";
import MembershipPlans from "@/components/membership/MembershipPlans";
import MembershipForm from "@/components/membership/MembershipForm";
import FAQ from "@/components/membership/FAQ";
import CTA from "@/components/membership/CTA";

export default function MembershipPage() {
  return (
    <div className="container mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold">Membership Plans</h1>
        <p className="mt-4 text-gray-600">
          Choose the perfect plan for your research journey.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <PricingCard
          title="Student"
          price="PKR 1,000/yr"
          description="For students getting started with research."
          features={[
            "Funding Opportunities",
            "Proposal Templates",
            "Training Resources",
          ]}
          buttonText="Get Started"
          href="/signup?plan=student"
        />

        <PricingCard
          title="Premium Researcher"
          price="PKR 15,000/yr"
          description="For active researchers and professionals."
          features={[
            "Everything in Student",
            "Proposal Tracking",
            "AI Recommendations",
            "Priority Support",
            "Funding Alerts",
          ]}
          buttonText="Upgrade Now"
          highlighted
          href="/signup?plan=premium"
        />

        <PricingCard
          title="Institution"
          price="PKR 100,000/yr"
          description="For universities and organizations."
          features={[
            "Everything in Premium",
            "Analytics Dashboard",
            "Team Management",
            "Dedicated Support",
            "Custom Reports",
          ]}
          buttonText="Contact Sales"
          href="/contact"
        />
      </div>

      {/* Membership Plans detail */}
      <div className="mt-16">
        <MembershipPlans />
      </div>

      {/* Membership Form */}
      <div className="mt-16">
        <MembershipForm />
      </div>

      {/* Compare Features */}
      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">Compare Features</h2>
        <FeatureTable />
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <h2 className="mb-8 text-3xl font-bold">Frequently Asked Questions</h2>
        <FAQ />
      </section>

      {/* CTA */}
      <section className="mt-24">
        <CTA />
      </section>

    </div>
  );
}