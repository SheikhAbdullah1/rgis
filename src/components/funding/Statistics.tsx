const stats = [
  {
    label: "Funding Opportunities",
    value: "500+",
  },
  {
    label: "Funding Agencies",
    value: "100+",
  },
  {
    label: "Countries",
    value: "50+",
  },
  {
    label: "Researchers Supported",
    value: "2,000+",
  },
];

export default function Statistics() {
  return (
    <section className="py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border bg-white p-8 text-center shadow-sm"
          >
            <h3 className="text-4xl font-bold text-blue-600">
              {stat.value}
            </h3>

            <p className="mt-3 text-gray-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
