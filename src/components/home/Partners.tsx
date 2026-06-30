import { Building2 } from "lucide-react";
import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            International Funding Partners
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Collaborating with leading national and
            international organizations to promote research,
            innovation, and funding opportunities.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="
                rounded-2xl
                border
                bg-white
                p-8
                text-center
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-lg
              "
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Building2 size={36} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
