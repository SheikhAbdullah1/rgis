// Target path in project: src/app/success-stories/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = ["Funded Project", "Researcher", "University", "Startup"] as const;

interface StoryItem {
  _id: string;
  projectTitle: string;
  researcherName: string;
  institution?: string;
  fundingAmount: string;
  fundingAgency: string;
  impactSummary: string;
  category: string;
  isFeatured?: boolean;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (search) params.set("search", search);

      const res = await fetch(`/api/success-stories?${params.toString()}`);
      const data = await res.json();

      if (data.success) setStories(data.stories);
    } catch (error) {
      console.error("Failed to load success stories:", error);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchStories, 300);
    return () => clearTimeout(timeout);
  }, [fetchStories]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Hero */}
      <section className="border-b border-[#0F172A]/10 px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
            Success Stories
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl">
            Funding that turned into results.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0F172A]/70">
            Real projects, researchers, universities, and startups that found
            funding through RGIS — and what they did with it.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-5xl px-6 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories..."
            className="w-full max-w-sm rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-blue-600"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                category === ""
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-[#0F172A]/20 text-[#0F172A]/70 hover:border-[#0F172A]/40"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  category === c
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-[#0F172A]/20 text-[#0F172A]/70 hover:border-[#0F172A]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        {loading ? (
          <p className="text-sm text-[#0F172A]/50">Loading stories...</p>
        ) : stories.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#0F172A]/20 py-20 text-center">
            <p className="text-sm text-[#0F172A]/60">
              No stories match this filter yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {stories.map((s) => (
              <Card
                key={s._id}
                className="flex h-full flex-col border-[#0F172A]/10 bg-white/60"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
                    >
                      {s.category}
                    </Badge>
                    {s.isFeatured && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="mb-1 text-lg font-semibold leading-snug">
                    {s.projectTitle}
                  </h2>
                  <p className="mb-4 text-xs text-[#0F172A]/60">
                    {s.researcherName}
                    {s.institution ? ` · ${s.institution}` : ""}
                  </p>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-[#0F172A]/70">
                    {s.impactSummary}
                  </p>
                  <div className="flex items-center justify-between border-t border-[#0F172A]/10 pt-4 text-xs">
                    <span className="font-semibold text-blue-600">
                      {s.fundingAmount}
                    </span>
                    <span className="text-[#0F172A]/60">{s.fundingAgency}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}