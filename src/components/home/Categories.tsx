import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Lightbulb,
  Globe,
  Landmark,
  Award,
} from "lucide-react";

const categories = [
  {
    title: "Research Grants",
    description:
      "Funding opportunities for research projects and scientific innovation.",
    icon: Briefcase,
  },
  {
    title: "Scholarships",
    description:
      "Scholarships for undergraduate, postgraduate, and doctoral studies.",
    icon: GraduationCap,
  },
  {
    title: "Fellowships",
    description:
      "National and international fellowship programs for researchers.",
    icon: Award,
  },
  {
    title: "Startup Funding",
    description:
      "Seed funding, incubation, and entrepreneurship opportunities.",
    icon: Lightbulb,
  },
  {
    title: "Government Grants",
    description:
      "Funding programs offered by government organizations and agencies.",
    icon: Landmark,
  },
  {
    title: "International Funding",
    description:
      "Global funding opportunities from international organizations.",
    icon: Globe,
  },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Funding Categories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Explore different categories of funding opportunities
            available through RGIS.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href="/fundingOpportunities"
                className="
                  rounded-2xl
                  border
                  bg-white
                  p-8
                  shadow-sm
                  transition
                  hover:-translate-y-2
                  hover:shadow-lg
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {category.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
