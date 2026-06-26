import Hero from "@/src/components/home/Hero";
import Stats from "@/src/components/home/Stats";
import Categories from "@/src/components/home/Categories";
import FeaturedGrants from "@/src/components/home/FeaturedGrants";
import MembershipPlans from "@/src/components/home/MembershipPlans";

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