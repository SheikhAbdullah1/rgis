import AgencyCard from "./AgencyCard";

const agencies = [
  {
    _id: "1",
    name: "Higher Education Commission Pakistan",
    country: "Pakistan",
    description: "HEC is the apex regulatory body for higher education in Pakistan.",
    website: "https://www.hec.gov.pk",
    fundingTypes: ["Research Grants", "Scholarships"],
  },
  {
    _id: "2",
    name: "UNESCO",
    country: "International",
    description: "UNESCO promotes international cooperation in education, sciences and culture.",
    website: "https://www.unesco.org",
    fundingTypes: ["Education Grants", "Research Grants"],
  },
  {
    _id: "3",
    name: "World Bank",
    country: "International",
    description: "World Bank provides financial and technical assistance to developing countries.",
    website: "https://www.worldbank.org",
    fundingTypes: ["Development Grants", "Research Grants"],
  },
];

export default function AgencySection() {
  return (
    <section className="py-16">
      <h2 className="mb-8 text-3xl font-bold">Funding Agencies</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agencies.map((agency) => (
          <AgencyCard key={agency._id} agency={agency} />
        ))}
      </div>
    </section>
  );
}