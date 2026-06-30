const categories = [
  "Research Grants",
  "Innovation Grants",
  "Scholarships",
  "Fellowships",
  "Seed Funding",
  "International Funding",
];

export default function Categories() {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-bold">
        Funding Categories
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
