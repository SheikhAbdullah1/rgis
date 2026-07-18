// Target path in project: src/app/collaboration-hub/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PARTNER_TYPES = [
  "University",
  "Industry",
  "NGO",
  "Hospital",
  "Government Department",
  "International Institution",
] as const;

const CATEGORIES = [
  "Joint Research",
  "Consultancy",
  "Technology Transfer",
  "Startup Development",
  "Community Projects",
] as const;

interface Partner {
  _id: string;
  name: string;
  type: string;
  categories: string[];
  description: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
}

export default function CollaborationHubPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const [form, setForm] = useState({
    requesterName: "",
    requesterEmail: "",
    organization: "",
    category: CATEGORIES[0] as string,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (category) params.set("category", category);

      const res = await fetch(`/api/partners?${params.toString()}`);
      const data = await res.json();

      if (data.success) setPartners(data.partners);
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setLoading(false);
    }
  }, [type, category]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  function openRequestForm(partner?: Partner) {
    setSelectedPartner(partner ?? null);
    setSubmitted(false);
    setFormError("");
    setForm((f) => ({ ...f, category: partner?.categories[0] ?? f.category }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.requesterName || !form.requesterEmail || !form.message) {
      setFormError("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/collaboration-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          partnerId: selectedPartner?._id,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm({
          requesterName: "",
          requesterEmail: "",
          organization: "",
          category: CATEGORIES[0],
          message: "",
        });
      } else {
        setFormError(data.message || "Something went wrong.");
      }
    } catch {
      setFormError("Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A]`}>
      {/* Hero */}
      <section className="border-b border-[#0F172A]/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Collaboration Hub
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Find the right partner for what you&apos;re building.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            Universities, industry, NGOs, hospitals, government departments,
            and international institutions — matched by collaboration type.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-5xl px-6 pt-10">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setType("")}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                type === ""
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-[#0F172A]/20 text-[#0F172A]/70 hover:border-[#0F172A]/40"
              }`}
            >
              All Partners
            </button>
            {PARTNER_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  type === t
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-[#0F172A]/20 text-[#0F172A]/70 hover:border-[#0F172A]/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                category === ""
                  ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                  : "border-[#0F172A]/15 text-[#0F172A]/50 hover:border-[#0F172A]/30"
              }`}
            >
              Any category
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                  category === c
                    ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                    : "border-[#0F172A]/15 text-[#0F172A]/50 hover:border-[#0F172A]/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        {loading ? (
          <p className="text-sm text-[#0F172A]/50">Loading partners...</p>
        ) : partners.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#0F172A]/20 py-20 text-center">
            <p className="text-sm text-[#0F172A]/60">
              No partners match these filters yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <Card key={p._id} className="flex h-full flex-col border-[#0F172A]/10 bg-white/60">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
                    >
                      {p.type}
                    </Badge>
                    {p.isVerified && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#2563EB]">
                        Verified
                      </span>
                    )}
                  </div>
                  <h3
                    className="mb-2 text-lg leading-snug"
                  >
                    {p.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#0F172A]/70">
                    {p.description}
                  </p>
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {p.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-[#0F172A]/5 px-2.5 py-0.5 text-[10px] text-[#0F172A]/60"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => openRequestForm(p)}
                    className="mt-auto w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Request Collaboration
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Request form */}
      <section className="border-t border-[#0F172A]/10 bg-white/40">
        <div className="mx-auto max-w-xl px-6 py-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            {selectedPartner ? `Request — ${selectedPartner.name}` : "General Request"}
          </p>
          <h2 className="mb-8 text-2xl">
            Tell us what you&apos;re looking for.
          </h2>

          {submitted ? (
            <div className="rounded-md border border-[#2563EB]/30 bg-[#2563EB]/5 p-6 text-sm text-[#0F172A]/80">
              Thanks — your request has been submitted. We&apos;ll be in touch by email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.requesterName}
                  onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={form.requesterEmail}
                  onChange={(e) => setForm({ ...form, requesterEmail: e.target.value })}
                  className="rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
                />
              </div>
              <input
                type="text"
                placeholder="Organization (optional)"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="What would you like to collaborate on?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
              />

              {formError && <p className="text-sm text-red-600">{formError}</p>}

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