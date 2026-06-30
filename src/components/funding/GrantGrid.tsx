import GrantCard from "./GrantCard";

interface Grant {
  id: number;
  title: string;
  agency: string;
  country: string;
  amount: string;
  deadline: string;
}

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

// interface GrantGridProps {
//   grants: Grant[];
// }

// export default function GrantGrid({
//   grants,
// }: GrantGridProps) {
//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {grants.map((grant) => (
//         <GrantCard
//           key={grant.id}
//           title={grant.title}
//           agency={grant.agency}
//           amount={grant.amount}
//           deadline={grant.deadline}
//         />
//       ))}
//     </div>
//   );
// }