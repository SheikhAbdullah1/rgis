const categories = [
  {
    title: "Research Grants",
    description: "Funding for academic and scientific research.",
    icon: "🔬",
  },
  {
    title: "Innovation Grants",
    description: "Support for innovative technologies and ideas.",
    icon: "💡",
  },
  {
    title: "Scholarships",
    description: "Educational funding for students worldwide.",
    icon: "🎓",
  },
  {
    title: "Fellowships",
    description: "Research and professional fellowship programs.",
    icon: "🏅",
  },
  {
    title: "Startup Funding",
    description: "Funding opportunities for startups.",
    icon: "🚀",
  },
  {
    title: "Venture Capital",
    description: "Investment opportunities for growing businesses.",
    icon: "💰",
  },
  {
    title: "Angel Investment",
    description: "Private investment opportunities.",
    icon: "👨‍💼",
  },
  {
    title: "Research Awards",
    description: "Awards recognizing outstanding research.",
    icon: "🏆",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Funding Categories
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.title}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{category.icon}</div>

            <h3 className="text-xl font-semibold mb-2">
              {category.title}
            </h3>

            <p className="text-gray-600">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}