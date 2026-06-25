export default function Stats() {
    const stats = [
      { label: "Funding Opportunities", value: "10,000+" },
      { label: "Funding Agencies", value: "500+" },
      { label: "Researchers", value: "50,000+" },
      { label: "Countries", value: "120+" },
    ];
  
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="border rounded-xl p-6 text-center"
              >
                <h3 className="text-3xl font-bold">
                  {item.value}
                </h3>
  
                <p className="text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }