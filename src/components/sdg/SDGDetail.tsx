// "use client";

// import { useEffect, useState } from "react";

// export default function SDGDetail({
//   slug,
// }: {
//   slug: string;
// }) {
//   const [sdg, setSdg] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/sdgs/${slug}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setSdg(data.sdg);
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [slug]);

//   if (loading) {
//     return <p>Loading SDG...</p>;
//   }

//   if (!sdg) {
//     return <p>SDG not found.</p>;
//   }

//   return (
//     <div>
//       <div
//         className="mb-6 h-6 w-24 rounded"
//         style={{
//           background: sdg.color,
//         }}
//       />

//       <h1 className="mb-4 text-4xl font-bold">
//         Goal {sdg.number}: {sdg.name}
//       </h1>

//       <p className="text-lg text-gray-700 leading-8">
//         {sdg.description}
//       </p>

//       <section className="mt-12">
//         <h2 className="mb-4 text-2xl font-bold">
//           Related Funding Opportunities
//         </h2>

//         <p className="text-gray-500">
//           Integration with grants coming next.
//         </p>
//       </section>

//       <section className="mt-12">
//         <h2 className="mb-4 text-2xl font-bold">
//           Related Agencies
//         </h2>

//         <p className="text-gray-500">
//           Integration with agencies coming next.
//         </p>
//       </section>
//     </div>
//   );
// }
import Link from "next/link";

interface Props {
    sdg: any;
  }
  
  export default function SDGDetail({ sdg }: Props) {
    return (
      <div className="space-y-12">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{ color: sdg.color }}
          >
            SDG {sdg.number}: {sdg.name}
          </h1>
  
          <p className="mt-4 text-gray-600">
            {sdg.description}
          </p>
        </div>
  
        {/* <div>
          <h2 className="text-2xl font-bold mb-4">
            Targets
          </h2>
  
          <div className="space-y-4">
            {sdg.targets?.map((t: any, i: number) => (
              <div
                key={i}
                className="border rounded-xl p-4"
              >
                <h3 className="font-semibold">
                  {t.title}
                </h3>
  
                <p>{t.description}</p>
              </div>
            ))}
          </div>
        </div> */}
        <div>
  <h2 className="text-2xl font-bold mb-4">
    Targets
  </h2>

  {sdg.targets?.length ? (
    <div className="space-y-4">
      {sdg.targets.map((t: any, i: number) => (
        <div
          key={i}
          className="border rounded-xl p-4"
        >
          <h3 className="font-semibold">
            {t.title}
          </h3>

          <p>{t.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No targets available.
    </p>
  )}
</div>

        {/* <div>
          <h2 className="text-2xl font-bold mb-4">
            Indicators
          </h2>
  
          <div className="space-y-4">
            {sdg.indicators?.map(
              (i: any, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-4"
                >
                  <h3 className="font-semibold">
                    {i.title}
                  </h3>
  
                  <p>{i.description}</p>
                </div>
              )
            )}
          </div>
        </div> */}

<div>
  <h2 className="text-2xl font-bold mb-4">
    Indicators
  </h2>

  {sdg.indicators?.length ? (
    <div className="space-y-4">
      {sdg.indicators.map(
        (i: any, index: number) => (
          <div
            key={index}
            className="border rounded-xl p-4"
          >
            <h3 className="font-semibold">
              {i.title}
            </h3>

            <p>{i.description}</p>
          </div>
        )
      )}
    </div>
  ) : (
    <p className="text-gray-500">
      No indicators available.
    </p>
  )}
</div>

<div>
{sdg.relatedFunding.map((grant: any) => (
  <div
    key={grant._id}
    className="border rounded-xl p-5"
  >
    <Link
      href={`/funding-opportunities/${grant._id}`}
      className="text-blue-600 hover:underline font-semibold"
    >
      {grant.title}
    </Link>

    <p className="text-gray-500 mt-2">
      {grant.country}
    </p>
  </div>
))}
</div>
{/* <div>
  <h2 className="text-2xl font-bold mb-6">
    Related Funding Opportunities
  </h2>

  {sdg.relatedFunding?.length ? (
    <div className="grid md:grid-cols-2 gap-6">
      {sdg.relatedFunding.map((grant: any) => (
        <div
          key={grant._id}
          className="border rounded-xl p-5"
        >
          <h3 className="font-semibold">
            {grant.title}
          </h3>

          <p>{grant.country}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No funding opportunities linked yet.
    </p>
  )}
</div> */}
        {/* <div>
  <h2 className="text-2xl font-bold mb-6">
    Related Funding Opportunities
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    {sdg.relatedFunding?.map((grant: any) => (
      <div
        key={grant._id}
        className="border rounded-xl p-5"
      >
        <h3 className="font-semibold">
          {grant.title}
        </h3>

        <p>{grant.country}</p>
      </div>
    ))}
  </div>
</div> */}


<div>
  <h2 className="text-2xl font-bold mb-6">
    Related Agencies
  </h2>

  {sdg.relatedAgencies?.length ? (
    <div className="grid md:grid-cols-2 gap-6">
      {sdg.relatedAgencies.map((agency: any) => (
        <div
          key={agency._id}
          className="border rounded-xl p-5"
        >
          <h3 className="font-semibold">
            {agency.name}
          </h3>

          <p>{agency.country}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No agencies linked yet.
    </p>
  )}
</div>
      </div>
    );
  }