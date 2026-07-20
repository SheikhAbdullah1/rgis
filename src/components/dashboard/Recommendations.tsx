"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Recommendations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.recommendations);
        }
      });
  }, []);

  return (
    <div className="rounded-xl border p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Recommended Funding</h2>

      <div className="space-y-4">
        {items.map((item: any) => (
          <Link
            key={item._id}
            href={`/funding-opportunities/${item._id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50"
          >
            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-sm text-gray-500">
              {item.description?.slice(0, 120)}
              ...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// export default function Recommendations() {
//   const [items, setItems] = useState<string[]>([]);

//   useEffect(() => {
//     async function load() {
//       const res = await fetch("/api/dashboard");
//       const data = await res.json();

//       if (data.success) {
//         setItems(data.recommendations || []);
//       }
//     }

//     load();
//   }, []);

//   return (
//     <div className="rounded-xl border bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-2xl font-bold">
//         System Recommendations
//       </h2>

//       <div className="space-y-4">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4"
//           >
//             <p>{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }