import Link from "next/link";
import {
  UserPlus,
  Users,
  FileText,
  Search,
} from "lucide-react";

const actions = [
  {
    title: "Register Free",
    description:
      "Create your free RGIS account and access funding opportunities.",
    href: "/membership",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Become a Member",
    description:
      "Join our research community and unlock premium benefits.",
    href: "/membership",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Submit Proposal",
    description:
      "Submit your research proposal for funding and expert review.",
    href: "/proposal-center",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Track Proposal",
    description:
      "Monitor the status of your submitted proposal online.",
    href: "/track-proposal",
    icon: Search,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function QuickActions() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Get started with RGIS in just a few clicks.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 h-full flex flex-col     justify-between">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
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
                <div
                  className={`inline-flex rounded-xl p-4 ${action.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {action.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
