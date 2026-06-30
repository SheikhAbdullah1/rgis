import {
  UserPlus,
  Search,
  FileText,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

const steps = [
  {
    title: "Register",
    description:
      "Create your free RGIS account and join our research community.",
    icon: UserPlus,
  },
  {
    title: "Search Funding",
    description:
      "Explore grants, scholarships, fellowships, and funding opportunities.",
    icon: Search,
  },
  {
    title: "Submit Proposal",
    description:
      "Prepare and submit your research proposal through the platform.",
    icon: FileText,
  },
  {
    title: "Review Process",
    description:
      "Track the evaluation and review process of your proposal.",
    icon: ClipboardCheck,
  },
  {
    title: "Funding Success",
    description:
      "Secure funding and transform your ideas into impactful projects.",
    icon: Trophy,
  },
];

export default function Workflow() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How RGIS Works
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Follow these simple steps to discover funding
            opportunities and submit successful proposals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative text-center"
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-blue-600
                  "
                >
                  <Icon size={36} />
                </div>

                <div
                  className="
                    absolute
                    -top-2
                    left-1/2
                    flex
                    h-8
                    w-8
                    -translate-x-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {index + 1}
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
