// Target path in project: src/app/about/page.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const objectives = [
  {
    label: "Discover",
    text: "Automate grant discovery across local and international funders.",
  },
  {
    label: "Comply",
    text: "Provide compliance-ready templates aligned with HEC, UNDP and SDG standards.",
  },
  {
    label: "Benchmark",
    text: "Benchmark institutional performance against national and global peers.",
  },
];

const stakeholders = [
  "ORICs",
  "Universities",
  "Funding Agencies",
  "Policymakers",
];

export default function AboutPage() {
  return (
    <div className={`bg-[#F8FAFC] text-[#0F172A]`}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#0F172A]/10">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            About RGIS
          </p>
          <h1
            className="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Aligning national research with{" "}
            <em className="not-italic text-[#2563EB]">global funding</em>{" "}
            priorities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            The Research Grant Intelligence System is a digital platform built
            to help researchers, universities, industries, startups, NGOs and
            public organizations find, secure, and manage funding — at home
            and abroad.
          </p>
        </div>
        {/* Seal-like signature motif */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.07] sm:h-80 sm:w-80"
        >
          <circle cx="100" cy="100" r="98" stroke="#0F172A" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="80" stroke="#0F172A" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="4" fill="#2563EB" />
        </svg>
      </section>

      {/* Vision / Mission */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-20 sm:grid-cols-2">
        <Card className="border-[#0F172A]/10 bg-white/60">
          <CardContent className="p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Vision
            </p>
            <p
              className="text-2xl leading-snug"
            >
              To become the leading research funding intelligence platform
              connecting ideas, innovation, and funding.
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#0F172A]/10 bg-white/60">
          <CardContent className="p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
              Mission
            </p>
            <p className="text-lg leading-relaxed text-[#0F172A]/80">
              To empower researchers and institutions through timely access
              to funding opportunities, grant management tools, collaboration
              networks, and proposal development support.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Who We Are */}
      <section className="border-y border-[#0F172A]/10 bg-white/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Who We Are
          </p>
          <p
            className="text-2xl leading-snug sm:text-3xl"
          >
            RGIS supports researchers, universities, industries, startups,
            NGOs and public organizations in identifying, accessing, and
            securing national and international research funding.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-[#0F172A]/60">
          What we do
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {objectives.map((o) => (
            <div key={o.label} className="border-l-2 border-[#2563EB] pl-5">
              <p
                className="mb-2 text-xl"
              >
                {o.label}
              </p>
              <p className="text-sm leading-relaxed text-[#0F172A]/70">
                {o.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#0F172A]/60">
          Who we serve
        </h2>
        <div className="flex flex-wrap gap-3">
          {stakeholders.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="border-[#0F172A]/20 px-4 py-2 text-sm font-normal text-[#0F172A]/80"
            >
              {s}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}