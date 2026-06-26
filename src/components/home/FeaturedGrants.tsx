const grants = [
  {
    id: 1,
    title: "AI Research Grant 2026",
    agency: "HEC Pakistan",
    amount: "$50,000",
    country: "Pakistan",
    deadline: "31 Dec 2026",
  },
  {
    id: 2,
    title: "Climate Innovation Fund",
    agency: "World Bank",
    amount: "$150,000",
    country: "Global",
    deadline: "15 Nov 2026",
  },
  {
    id: 3,
    title: "Women in STEM Fellowship",
    agency: "UNESCO",
    amount: "$25,000",
    country: "International",
    deadline: "10 Oct 2026",
  },
];

export default function FeaturedGrants() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Funding Opportunities
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {grants.map((grant) => (
          <div
            key={grant.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {grant.title}
            </h3>

            <p>
              <strong>Agency:</strong> {grant.agency}
            </p>

            <p>
              <strong>Funding:</strong> {grant.amount}
            </p>

            <p>
              <strong>Country:</strong> {grant.country}
            </p>

            <p>
              <strong>Deadline:</strong> {grant.deadline}
            </p>

            <button className="mt-5 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}