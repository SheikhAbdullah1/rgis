// Target path in project: src/app/leadership/page.tsx
// NOTE: Member names/titles below are placeholders — replace with real
// leadership team data (e.g. from a `data/leadership.ts` file or the
// admin panel) before publishing.

import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  {
    tier: "01",
    name: "Strategic Leadership",
    mandate:
      "Sets institutional direction, oversees national partnerships, and holds ultimate accountability for RGIS's mission.",
    seats: ["Chief Executive", "Director of Strategy", "Board Chair"],
  },
  {
    tier: "02",
    name: "Technical Leadership",
    mandate:
      "Owns the platform, data pipelines, and grant-matching intelligence — the engineering backbone of RGIS.",
    seats: ["Head of Engineering", "Head of Data Systems", "Head of Product"],
  },
  {
    tier: "03",
    name: "Advisory Leadership",
    mandate:
      "External domain experts guiding research policy alignment, compliance standards, and sector relationships.",
    seats: ["Academic Advisor", "Funding Policy Advisor", "Industry Advisor"],
  },
];

export default function LeadershipPage() {
  return (
    <div className={`bg-[#F8FAFC] text-[#0F172A]`}>
      <section className="border-b border-[#0F172A]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Leadership
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Three tiers of governance, one mandate.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            RGIS is governed across strategic, technical, and advisory
            levels — each accountable for a distinct part of how the
            platform is run.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="space-y-16">
          {tiers.map((t, i) => (
            <div key={t.tier} className="grid gap-8 sm:grid-cols-[auto_1fr]">
              <div className="flex sm:flex-col sm:items-start">
                <span
                  className="text-6xl text-[#0F172A]/15"
                >
                  {t.tier}
                </span>
              </div>
              <div>
                <h2
                  className="text-2xl"
                >
                  {t.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0F172A]/70">
                  {t.mandate}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {t.seats.map((seat) => (
                    <Card
                      key={seat}
                      className="border-dashed border-[#0F172A]/20 bg-white/50"
                    >
                      <CardContent className="p-5">
                        <p className="text-xs uppercase tracking-wide text-[#2563EB]">
                          {seat}
                        </p>
                        <p className="mt-2 text-sm text-[#0F172A]/50">
                          Name to be added
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              {i < tiers.length - 1 && (
                <div className="col-span-full h-px bg-[#0F172A]/10" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}