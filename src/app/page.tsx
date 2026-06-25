import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import FeaturedGrants from "@/components/home/FeaturedGrants";
import MembershipPlans from "@/components/home/MembershipPlans";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedGrants />
      <MembershipPlans />
    </>
  );
}