"use client";

import { useMemo, useState } from "react";

import Hero from "@/components/funding/Hero";
import SearchBar from "@/components/funding/SearchBar";
import Filters from "@/components/funding/Filters";
import Categories from "@/components/funding/Categories";
import Statistics from "@/components/funding/Statistics";
import GrantGrid from "@/components/funding/GrantGrid";
import AgencySection from "@/components/funding/AgencySection";
import CTA from "@/components/funding/CTA";

import { grants } from "@/data/grants";

export default function FundingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [amount, setAmount] = useState("Any Amount");
  const [deadline, setDeadline] = useState("Any Deadline");

  const filteredGrants = useMemo(() => {
    return grants.filter((grant) => {
      const matchesSearch =
        grant.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        grant.agency
          .toLowerCase()
          .includes(search.toLowerCase());
  
      const matchesCountry =
        country === "All Countries" ||
        grant.country === country;
  
      const matchesCategory =
        category === "All Categories" ||
        grant.category === category;
  
      return (
        matchesSearch &&
        matchesCountry &&
        matchesCategory
      );
    });
  }, [search, country, category]);


  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filters
          category={category}
          setCategory={setCategory}
          country={country}
          setCountry={setCountry}
          amount={amount}
          setAmount={setAmount}
          deadline={deadline}
          setDeadline={setDeadline}
        />

        <Categories />
        <Statistics />
        <GrantGrid grants={filteredGrants} />
        <AgencySection />
        <CTA />
        console.log({
  search,
  category,
  country,
  filteredGrants,
});
      </section>
    </main>
  );
}