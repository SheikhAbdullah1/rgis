import PageHero from "@/components/ui/PageHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import OfficeHours from "@/components/contact/OfficeHours";
import FAQ from "@/components/contact/FAQ";
import Map from "@/components/contact/Map";
import CTA from "@/components/contact/CTA";
export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Have questions about grants, memberships, training programs, or partnerships? We'd love to hear from you."
      />

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <ContactInfo />
        <ContactForm />
      </section>
      <OfficeHours />
      <FAQ />
      <Map />
      <CTA />
    </main>
  );
}
