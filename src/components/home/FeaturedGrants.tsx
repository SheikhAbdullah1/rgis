const grants = [
    {
      title: "AI Research Grant",
      agency: "HEC",
      amount: "$50,000",
    },
    {
      title: "Startup Innovation Fund",
      agency: "World Bank",
      amount: "$100,000",
    },
    {
      title: "Health Research Grant",
      agency: "WHO",
      amount: "$75,000",
    },
  ];
  
  export default function FeaturedGrants() {
    return (
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Opportunities
        </h2>
  
        <div className="grid md:grid-cols-3 gap-6">
          {grants.map((grant) => (
            <div
              key={grant.title}
              className="border rounded-xl p-6"
            >
              <h3 className="font-bold">{grant.title}</h3>
  
              <p>{grant.agency}</p>
  
              <p className="mt-3 font-semibold">
                {grant.amount}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }