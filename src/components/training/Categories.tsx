import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Research Methodology",
    description:
      "Learn qualitative and quantitative research methods.",
  },
  {
    title: "Grant Writing",
    description:
      "Master proposal writing and funding applications.",
  },
  {
    title: "Academic Writing",
    description:
      "Publish research papers in high-impact journals.",
  },
  {
    title: "AI for Research",
    description:
      "Use AI tools to accelerate research productivity.",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-10 text-center">
        Training Categories
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((item) => (
          <CategoryCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}