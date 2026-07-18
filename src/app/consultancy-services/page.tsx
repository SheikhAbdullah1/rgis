// Target path in project: src/app/consultancy-services/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    name: "Grant Proposal Writing",
    detail:
      "End-to-end drafting of a competitive proposal, from concept note to full narrative.",
  },
  {
    name: "Research Design",
    detail: "Methodology, sampling, and study design built to withstand reviewer scrutiny.",
  },
  {
    name: "Statistical Analysis",
    detail: "Data analysis and interpretation for research findings and grant reporting.",
  },
  {
    name: "Impact Assessment",
    detail: "Measuring and documenting the outcomes of a funded project or program.",
  },
  {
    name: "Feasibility Studies",
    detail: "Assessing whether a proposed project is viable before you commit resources.",
  },
  {
    name: "Startup Funding Support",
    detail: "Positioning a startup's pitch and financials for seed or grant-based funding.",
  },
] as const;

export default function ConsultancyServicesPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: SERVICES[0].name as string,
    budgetRange: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function selectService(name: string) {
    setForm((f) => ({ ...f, service: name }));
    document.getElementById("consultancy-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.details) {
      setError("Please fill in your name, email, and a description of what you need.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/consultancy-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          service: SERVICES[0].name,
          budgetRange: "",
          details: "",
        });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A]`}>
      {/* Hero */}
      <section className="border-b border-[#0F172A]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Consultancy Services
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Paid expertise, when the stakes are too high to guess.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            Six services covering the full arc from idea to funded, evaluated
            project — delivered by RGIS's consultancy team.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.name} className="flex h-full flex-col border-[#0F172A]/10 bg-white/60">
              <CardContent className="flex h-full flex-col p-6">
                <h2
                  className="mb-2 text-lg leading-snug"
                >
                  {s.name}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-[#0F172A]/70">
                  {s.detail}
                </p>
                <button
                  onClick={() => selectService(s.name)}
                  className="mt-auto text-left text-sm font-medium text-[#2563EB] hover:underline"
                >
                  Request this service →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Request form */}
      <section id="consultancy-form" className="border-t border-[#0F172A]/10 bg-white/40">
        <div className="mx-auto max-w-xl px-6 py-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Request a Consultation
          </p>
          <h2 className="mb-8 text-2xl">
            {form.service}
          </h2>

          {submitted ? (
            <div className="rounded-md border border-[#2563EB]/30 bg-[#2563EB]/5 p-6 text-sm text-[#0F172A]/80">
              Thanks — your request has been submitted. Our consultancy team
              will follow up by email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
                <input
                  type="text"
                  placeholder="Organization (optional)"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
              </div>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              >
                {SERVICES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Budget range (optional)"
                value={form.budgetRange}
                onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              />
              <textarea
                placeholder="Tell us what you need help with"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              />

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}