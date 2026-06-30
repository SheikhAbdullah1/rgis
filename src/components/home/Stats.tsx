import {
  Briefcase,
  Building2,
  Users,
  GraduationCap,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Funding Opportunities",
    value: "500+",
    icon: Briefcase,
  },
  {
    title: "Funding Agencies",
    value: "100+",
    icon: Building2,
  },
  {
    title: "Researchers Connected",
    value: "1,000+",
    icon: Users,
  },
  {
    title: "Training Programs",
    value: "50+",
    icon: GraduationCap,
  },
  {
    title: "Proposals Submitted",
    value: "250+",
    icon: FileText,
  },
];

export default function Stats() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Empowering Research & Innovation
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Connecting researchers and organizations with
            funding opportunities worldwide.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  rounded-2xl
                  bg-white
                  p-8
                  text-center
                  shadow-sm
                  border
                  transition
                  hover:-translate-y-2
                  hover:shadow-lg
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-4xl font-bold text-blue-600">
                  {stat.value}
                </h3>

                <p className="mt-3 text-gray-600">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
