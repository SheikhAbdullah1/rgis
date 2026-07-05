// import { memberships } from "@/data/memberships";
// import { notFound } from "next/navigation";

// interface Props {
//   params: Promise<{ id: string }>;   // ✅ Promise
// }

// export default async function Page({ params }: Props) {   // ✅ async
//   const { id } = await params;       // ✅ await
//   const plan = memberships.find((m) => m.id.toString() === id);

//   if (!plan) return notFound();
// export default function Page({ params }: Props) {
//   const plan = memberships.find(
//     (m) => m.id.toString() === params.id
//   );

//   if (!plan) return notFound();

//   return (
//     <main className="mx-auto max-w-5xl p-6">
//       <div className="rounded-xl border p-8">
//         <h1 className="mb-4 text-4xl font-bold">
//           {plan.name}
//         </h1>

//         <p className="mb-6 text-gray-600">
//           {plan.description}
//         </p>

//         <div className="mb-8 text-5xl font-bold text-blue-600">
//           ${plan.price}
//           <span className="text-xl text-gray-500">
//             /month
//           </span>
//         </div>

//         <h2 className="mb-4 text-2xl font-bold">
//           Features
//         </h2>

//         <ul className="space-y-3">
//           {plan.features.map(
//             (feature: string) => (
//               <li key={feature}>
//                 ✅ {feature}
//               </li>
//             )
//           )}
//         </ul>

//         <a
//           href={`/membership/checkout?id=${plan.id}`}
//           className="mt-8 inline-block rounded bg-blue-600 px-6 py-3 text-white"
//         >
//           Subscribe
//         </a>
//       </div>
//     </main>
//   );
// }

import { memberships } from "@/data/memberships";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const plan = memberships.find((m) => m.id.toString() === id);

  if (!plan) return notFound();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="rounded-xl border p-8">
        <h1 className="mb-4 text-4xl font-bold">{plan.name}</h1>
        <p className="mb-6 text-gray-600">{plan.description}</p>

        <div className="mb-8 text-5xl font-bold text-blue-600">
          PKR {plan.price}
          <span className="text-xl text-gray-500">/yr</span>
        </div>

        <h2 className="mb-4 text-2xl font-bold">Features</h2>

        <ul className="space-y-3">
          {plan.features.map((feature: string) => (
            <li key={feature}>✅ {feature}</li>
          ))}
        </ul>

        
         <a href={`/membership/checkout?id=${plan.id}`}
          className="mt-8 inline-block rounded bg-blue-600 px-6 py-3 text-white"
        >
          Subscribe
        </a>
      </div>
    </main>
  );
}