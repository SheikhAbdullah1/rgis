import AgencyCard from "./AgencyCard";

const agencies = [
  {
    name: "Higher Education Commission",
    country: "Pakistan",
  },
  {
    name: "UNESCO",
    country: "International",
  },
  {
    name: "World Bank",
    country: "International",
  },
];

export default function AgencySection() {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-bold">
        Funding Agencies
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agencies.map((agency) => (
          <AgencyCard
            key={agency.name}
            name={agency.name}
            country={agency.country}
          />
        ))}
      </div>
    </section>
  );
}
