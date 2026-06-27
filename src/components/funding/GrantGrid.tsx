import GrantCard from "./GrantCard";
import { grants } from "@/data/grants";

export default function GrantGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant) => (
        <GrantCard
          key={grant.id}
          title={grant.title}
          organization={grant.organization}
          amount={grant.amount}
          deadline={grant.deadline}
          category={grant.category}
        />
      ))}
    </div>
  );
}