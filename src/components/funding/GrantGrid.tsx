"use client";

import GrantCard from "./GrantCard";

interface Grant {
  _id?: string;
  id?: number;
  title: string;
  agency: string | { name: string; _id?: string };
  amount: string;
  deadline: string;
  category?: string;
  country?: string;
  description?: string;
}

interface GrantGridProps {
  grants: Grant[];
}

export default function GrantGrid({ grants }: GrantGridProps) {
  if (grants.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        No grants found matching your filters.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant, index) => (
        // <GrantCard
        //   key={grant._id ?? grant.id ?? index}
        //   title={grant.title}
        //   // agency={grant.agency}
        //   // agency={grant.agency?.name || ""}
        //   agency={typeof grant.agency === "string" ? grant.agency : grant.agency?.name || "N/A"}
        //   amount={grant.amount}
        //   deadline={grant.deadline}
        //   category={grant.category}
        //   country={grant.country}
        // />
        <GrantCard
  key={grant._id ?? grant.id ?? index}
  _id={grant._id}
  id={grant.id}
  title={grant.title}
  agency={
    typeof grant.agency === "string"
      ? grant.agency
      : grant.agency?.name || "N/A"
  }
  amount={grant.amount}
  deadline={grant.deadline}
  category={grant.category}
  country={grant.country}
/>
      ))}
    </div>
  );
}