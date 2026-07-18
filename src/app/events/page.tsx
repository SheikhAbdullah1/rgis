// Target path in project: src/app/events/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const EVENT_TYPES = [
  "Workshop",
  "Conference",
  "Webinar",
  "Grant Clinic",
  "Proposal Boot Camp",
] as const;

interface EventItem {
  _id: string;
  slug: string;
  title: string;
  type: string;
  mode: string;
  organizer: string;
  location?: string;
  startDate: string;
  imageUrl?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("");
  const [search, setSearch] = useState("");

  const fetchEvents = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (search) params.set("search", search);
      params.set("upcoming", "true");

      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  }, [type, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timeout);
  }, [fetchEvents]);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A]`}>
      {/* Hero */}
      <section className="border-b border-[#0F172A]/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            Events
          </p>
          <h1
            className="max-w-2xl text-4xl font-bold leading-[1.1] sm:text-5xl"
          >
            Workshops, clinics, and conferences for researchers.
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
            placeholder="Search events..."
            className="w-full max-w-sm rounded-md border border-[#0F172A]/20 bg-white/70 px-4 py-2 text-sm outline-none focus:border-[#2563EB]"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setType("")}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                type === ""
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-[#0F172A]/20 text-[#0F172A]/70 hover:border-[#0F172A]/40"
              }`}
            >
              All
            </button>
            {EVENT_TYPES.map((t) => (
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
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        {loading ? (
          <p className="text-sm text-[#0F172A]/50">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#0F172A]/20 py-20 text-center">
            <p className="text-sm text-[#0F172A]/60">
              No upcoming events match your filters right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event._id} href={`/events/${event.slug}`}>
                <Card className="h-full border-[#0F172A]/10 bg-white/60 transition hover:border-[#2563EB]/60 hover:shadow-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    <Badge
                      variant="outline"
                      className="mb-3 w-fit border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
                    >
                      {event.type}
                    </Badge>
                    <h3
                      className="mb-2 text-lg leading-snug"
                    >
                      {event.title}
                    </h3>
                    <p className="mb-4 text-xs text-[#0F172A]/60">
                      {event.organizer}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-[#0F172A]/50">
                      <span>
                        {new Date(event.startDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span>{event.mode}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}