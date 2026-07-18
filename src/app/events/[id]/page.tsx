// Target path in project: src/app/events/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventDetail {
  _id: string;
  title: string;
  type: string;
  mode: string;
  description: string;
  organizer: string;
  location?: string;
  startDate: string;
  endDate?: string;
  registrationLink?: string;
  capacity?: number;
  seatsTaken?: number;
  tags?: string[];
}

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();

        if (data.success) {
          setEvent(data.event);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to load event:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-[#0F172A]/50">Loading event...</p>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F8FAFC] px-6 text-center">
        <p
          className="text-2xl text-[#0F172A]"
        >
          Event not found
        </p>
        <p className="text-sm text-[#0F172A]/60">
          This event may have been removed or the link is incorrect.
        </p>
      </div>
    );
  }

  const seatsLeft =
    event.capacity !== undefined && event.seatsTaken !== undefined
      ? event.capacity - event.seatsTaken
      : null;

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A]`}>
      <section className="border-b border-[#0F172A]/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
            >
              {event.type}
            </Badge>
            <Badge
              variant="outline"
              className="border-[#0F172A]/20 text-xs font-normal text-[#0F172A]/70"
            >
              {event.mode}
            </Badge>
          </div>
          <h1
            className="text-3xl font-medium leading-tight sm:text-4xl"
          >
            {event.title}
          </h1>
          <p className="mt-4 text-sm text-[#0F172A]/60">
            Hosted by {event.organizer}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-3xl gap-10 px-6 py-14 sm:grid-cols-[1fr_260px]">
        <div>
          <p className="whitespace-pre-line text-base leading-relaxed text-[#0F172A]/80">
            {event.description}
          </p>

          {event.tags && event.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#0F172A]/5 px-3 py-1 text-xs text-[#0F172A]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-[#0F172A]/10 bg-white/60 p-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-[#2563EB]">
                Starts
              </dt>
              <dd className="mt-1 text-[#0F172A]/80">
                {new Date(event.startDate).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </dd>
            </div>

            {event.endDate && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#2563EB]">
                  Ends
                </dt>
                <dd className="mt-1 text-[#0F172A]/80">
                  {new Date(event.endDate).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </dd>
              </div>
            )}

            {event.location && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#2563EB]">
                  Location
                </dt>
                <dd className="mt-1 text-[#0F172A]/80">{event.location}</dd>
              </div>
            )}

            {seatsLeft !== null && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-[#2563EB]">
                  Seats left
                </dt>
                <dd className="mt-1 text-[#0F172A]/80">
                  {Math.max(seatsLeft, 0)} of {event.capacity}
                </dd>
              </div>
            )}
          </dl>

          {event.registrationLink ? (
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
                Register
              </Button>
            </a>
          ) : (
            <Button disabled className="mt-6 w-full">
              Registration opening soon
            </Button>
          )}
        </aside>
      </section>
    </div>
  );
}