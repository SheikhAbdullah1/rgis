// Target path in project: src/app/resources/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  "E-books",
  "Guides",
  "Funding Manuals",
  "Proposal Samples",
  "Policy Documents",
  "Research Toolkits",
] as const;

const FILE_ICON: Record<string, string> = {
  pdf: "PDF",
  docx: "DOC",
  xlsx: "XLS",
  pptx: "PPT",
  zip: "ZIP",
};

interface ResourceItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  fileType: string;
  downloadCount?: number;
}

export default function ResourcesLibraryPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState("");

  const fetchResources = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (search) params.set("search", search);

      const res = await fetch(`/api/resources?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setResources(data.resources);
      }
    } catch (error) {
      console.error("Failed to load resources:", error);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchResources, 300);
    return () => clearTimeout(timeout);
  }, [fetchResources]);

  async function handleDownload(resource: ResourceItem) {
    try {
      await fetch(`/api/resources/${resource._id}/download`, {
        method: "POST",
      });
    } catch {
      // Non-blocking — the download should proceed even if the counter fails.
    } finally {
      window.open(resource.fileUrl, "_blank");
    }
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A]`}>
      {/* Hero */}
      <section className="border-b border-[#0F172A]/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Resources Library
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Templates, guides, and toolkits — ready to download.
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-5xl px-6 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the library..."
            className="w-full max-w-sm rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
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
          <p className="text-sm text-[#0F172A]/50">Loading library...</p>
        ) : resources.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#0F172A]/20 py-20 text-center">
            <p className="text-sm text-[#0F172A]/60">
              Nothing here yet for this filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Card
                key={r._id}
                className="flex h-full flex-col border-[#0F172A]/10 bg-white/60"
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
                    >
                      {r.category}
                    </Badge>
                    <span className="rounded bg-[#0F172A]/5 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#2563EB]">
                      {FILE_ICON[r.fileType] ?? r.fileType.toUpperCase()}
                    </span>
                  </div>
                  <h3
                    className="mb-2 text-lg leading-snug"
                  >
                    {r.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[#0F172A]/70">
                    {r.description}
                  </p>
                  <button
                    onClick={() => handleDownload(r)}
                    className="mt-auto w-full rounded-md bg-[#0F172A] py-2 text-sm font-medium text-white transition hover:bg-[#0F172A]/90"
                  >
                    Download
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}