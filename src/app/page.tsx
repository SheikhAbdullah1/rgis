import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import QuickActions from "@/components/home/QuickActions";
import Stats from "@/components/home/Stats";
import Workflow from "@/components/home/Workflow";
import Categories from "@/components/home/Categories";
import FeaturedGrants from "@/components/home/FeaturedGrants";
import TrainingPreview from "@/components/home/TrainingPreview";
import MembershipPreview from "@/components/home/MembershipPreview";
import SuccessStories from "@/components/home/SuccessStories";
import NewsEvents from "@/components/home/NewsEvents";
import Partners from "@/components/home/Partners";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchSection />
      <QuickActions />
      <Stats />
      <Workflow />
      <Categories />
      <FeaturedGrants />
      <TrainingPreview />
      <MembershipPreview />
      <SuccessStories />
      <NewsEvents />
      <Partners />
      <CTA />
    </main>
  );
}
