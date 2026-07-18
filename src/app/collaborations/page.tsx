// Target path in project: src/app/collaborations/page.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sectors = [
  {
    name: "Academia",
    detail:
      "Universities and ORICs co-designing research agendas, sharing datasets, and running joint studies.",
  },
  {
    name: "Industry",
    detail:
      "Companies funding applied research, sponsoring innovation challenges, and hosting technology transfer.",
  },
  {
    name: "Government",
    detail:
      "Public bodies aligning national priorities, policy research, and regulatory sandboxes with funded work.",
  },
  {
    name: "Civil Society",
    detail:
      "NGOs and community organizations grounding research in on-the-ground social and development impact.",
  },
];

export default function CollaborationsPage() {
  return (
    <div className={`bg-[#F8FAFC] text-[#0F172A]`}>
      <section className="border-b border-[#0F172A]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Collaborations
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Research doesn&apos;t happen in one sector alone.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            RGIS connects four communities around shared funding and
            knowledge — each with a different stake in the outcome.
          </p>
        </div>
      </section>

      {/* Quadrant layout — no artificial ordering, these are peers */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-px overflow-hidden rounded-lg border border-[#0F172A]/10 bg-[#0F172A]/10 sm:grid-cols-2">
          {sectors.map((s) => (
            <div key={s.name} className="bg-[#F8FAFC] p-10">
              <h2
                className="text-2xl"
              >
                {s.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#0F172A]/70">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#0F172A]/10 bg-white/40">
        <Card className="mx-auto my-16 max-w-3xl border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center gap-5 p-6 text-center">
            <p
              className="text-2xl"
            >
              Want to collaborate through RGIS?
            </p>
            <p className="max-w-md text-sm text-[#0F172A]/70">
              Tell us which sector you represent and what kind of
              partnership you&apos;re looking for.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Become a Collaborator
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}