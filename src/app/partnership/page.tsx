// Target path in project: src/app/partnership/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const partnerTypes = [
  { name: "Industrial Partner", detail: "Manufacturing and technology firms co-funding applied R&D." },
  { name: "Institutional Partner", detail: "Universities and ORICs sharing infrastructure and expertise." },
  { name: "International Partner", detail: "Global agencies and foundations opening funding pipelines to Pakistan." },
  { name: "NGO Partner", detail: "Civil-society organizations translating research into community impact." },
  { name: "Government Organizational Partner", detail: "Federal and provincial bodies aligning policy and public funding." },
];

// Priority partners for Pakistan-focused launch — see internal partner list
const priorityPartners = [
  "Higher Education Commission Pakistan",
  "Pakistan Science Foundation",
  "World Bank",
  "Asian Development Bank",
  "Islamic Development Bank",
  "United Nations Development Programme",
  "World Health Organization",
  "European Research Council",
  "UK Research and Innovation",
  "Bill and Melinda Gates Foundation",
];

export default function PartnershipPage() {
  const [form, setForm] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnerType: partnerTypes[0].name as string,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function selectType(type: string) {
    setForm((f) => ({ ...f, partnerType: type }));
    document.getElementById("partnership-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.organizationName || !form.contactName || !form.email || !form.message) {
      setError("Please fill in organization, contact name, email, and message.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/partnership-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({
          organizationName: "",
          contactName: "",
          email: "",
          phone: "",
          partnerType: partnerTypes[0].name,
          message: "",
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
    <div className={`bg-[#F8FAFC] text-[#0F172A]`}>
      <section className="border-b border-[#0F172A]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Partnership
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Five kinds of partners, one funding network.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            RGIS works with industrial, institutional, international, NGO,
            and government partners to widen access to research funding.
          </p>
        </div>
      </section>

      {/* Partner types — ledger style */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="divide-y divide-[#0F172A]/10 border-y border-[#0F172A]/10">
          {partnerTypes.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <button
                onClick={() => selectType(p.name)}
                className="w-64 shrink-0 text-left text-lg hover:text-blue-600"
              >
                {p.name}
              </button>
              <p className="text-sm leading-relaxed text-[#0F172A]/70">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Priority partners for Pakistan */}
      <section className="border-y border-[#0F172A]/10 bg-white/40">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Priority Partners
          </p>
          <h2
            className="mb-8 text-2xl"
          >
            Ten organizations, most of the map covered.
          </h2>
          <div className="flex flex-wrap gap-3">
            {priorityPartners.map((org) => (
              <Badge
                key={org}
                variant="outline"
                className="border-[#0F172A]/20 px-4 py-2 text-sm font-normal text-[#0F172A]/80"
              >
                {org}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="partnership-form" className="border-t border-[#0F172A]/10 bg-white/40">
        <div className="mx-auto max-w-xl px-6 py-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Request Partnership
          </p>
          <h2 className="mb-8 text-2xl">{form.partnerType}</h2>

          {submitted ? (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-6 text-sm text-[#0F172A]/80">
              Thanks — your partnership request has been submitted. We&apos;ll
              follow up by email with the right agreement track.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Organization name"
                  value={form.organizationName}
                  onChange={(e) =>
                    setForm({ ...form, organizationName: e.target.value })
                  }
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  placeholder="Contact name"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
                />
              </div>
              <select
                value={form.partnerType}
                onChange={(e) => setForm({ ...form, partnerType: e.target.value })}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
              >
                {partnerTypes.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Tell us about your organization and the partnership you have in mind"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
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