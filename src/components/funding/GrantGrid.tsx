"use client";

import GrantCard from "./GrantCard";

interface GrantGridProps {
  grants: typeof import("@/data/grants").grants;
}

export default function GrantGrid({
  grants,
}: GrantGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant) => (
        <GrantCard
          key={grant.id}
          title={grant.title}
          agency={grant.agency}
          amount={grant.amount}
          deadline={grant.deadline}
        />
      ))}
    </div>
  );
}