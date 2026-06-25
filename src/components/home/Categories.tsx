const categories = [
    "Research Grants",
    "Innovation Grants",
    "Scholarships",
    "Fellowships",
    "Startup Funding",
    "International Development Grants",
  ];
  
  export default function Categories() {
    return (
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Funding Categories
        </h2>
  
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div
              key={item}
              className="border rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{item}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  }