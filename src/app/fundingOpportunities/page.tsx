// "use client";

// import { useMemo, useState } from "react";

// import Hero from "@/components/funding/Hero";
// import Filters from "@/components/funding/Filters";
// import SearchBar from "@/components/funding/SearchBar";
// import Categories from "@/components/funding/Categories";
// import Statistics from "@/components/funding/Statistics";
// import GrantGrid from "@/components/funding/GrantGrid";
// import AgencySection from "@/components/funding/AgencySection";
// import CTA from "@/components/funding/CTA";

// import { grants } from "@/data/grants";

// export default function FundingPage() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [country, setCountry] = useState("All Countries");
//   const [amount, setAmount] = useState("Any Amount");
//   const [deadline, setDeadline] = useState("Any Deadline");

//   const filteredGrants = useMemo(() => {
//     return grants.filter((grant) => {
//       const matchesSearch =
//         grant.title
//           .toLowerCase()
//           .includes(search.toLowerCase()) ||
//         grant.agency
//           .toLowerCase()
//           .includes(search.toLowerCase());
//           agency: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Agency",
//           },

//       const matchesCountry =
//         country === "All Countries" ||
//         grant.country === country;
  
//       const matchesCategory =
//         category === "All Categories" ||
//         grant.category === category;
  
//       return (
//         matchesSearch &&
//         matchesCountry &&
//         matchesCategory
//       );
//     });
//   }, [search, country, category]);

//   return (
//     <main>
//       <Hero />
      
//       <section className="mx-auto max-w-7xl px-6 py-16">
//         <SearchBar
//           search={search}
//           setSearch={setSearch}
//         />

//         <Filters
//           category={category}
//           setCategory={setCategory}
//           country={country}
//           setCountry={setCountry}
//           amount={amount}
//           setAmount={setAmount}
//           deadline={deadline}
//           setDeadline={setDeadline}
//         />

// <select name="agency">
//   <option>Select Agency</option>
//   {agencies.map((agency) => (
//     <option
//       key={agency._id}
//       value={agency._id}
//     >
//       {agency.name}
//     </option>
//   ))}
// </select>

//         <Categories />
//         <Statistics />
//         <GrantGrid grants={filteredGrants} />
//         <AgencySection />
//         <CTA />
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";

import Hero from "@/components/funding/Hero";
import Filters from "@/components/funding/Filters";
import SearchBar from "@/components/funding/SearchBar";
import Categories from "@/components/funding/Categories";
import Statistics from "@/components/funding/Statistics";
import GrantGrid from "@/components/funding/GrantGrid";
import AgencySection from "@/components/funding/AgencySection";
import CTA from "@/components/funding/CTA";

export default function FundingPage() {
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [country, setCountry] = useState("All Countries");
  const [amount, setAmount] = useState("Any Amount");
  const [deadline, setDeadline] = useState("Any Deadline");

  // Fetch grants from DB
  useEffect(() => {
    fetch("/api/grants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGrants(data.grants);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredGrants = useMemo(() => {
    return grants.filter((grant) => {
      const matchesSearch =
        grant.title?.toLowerCase().includes(search.toLowerCase()) ||
        grant.agency?.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        country === "All Countries" || grant.country === country;

      const matchesCategory =
        category === "All Categories" || grant.category === category;

      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, country, category, grants]);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SearchBar search={search} setSearch={setSearch} />

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

        {loading ? (
          <p className="text-gray-500 py-8">Loading grants...</p>
        ) : (
          <GrantGrid grants={filteredGrants} />
        )}

        <AgencySection />
        <CTA />
      </section>
    </main>
  );
}