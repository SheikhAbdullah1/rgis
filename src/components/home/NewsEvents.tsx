import Link from "next/link";
import { Calendar, Newspaper } from "lucide-react";
import { news } from "@/data/news";

export default function NewsEvents() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h2 className="text-4xl font-bold">
              Latest News & Events
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Stay updated with the latest funding
              announcements, training programs, and
              opportunities.
            </p>
          </div>

          <Link
            href="/news"
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            View All News
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="
                rounded-2xl
                border
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-lg
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Newspaper size={30} />
              </div>

              <span className="mt-6 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                {item.category}
              </span>

              <h3 className="mt-4 text-2xl font-bold">
                {item.title}
              </h3>

              <div className="mt-6 flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                {item.date}
              </div>

              <Link
                // href="/news"
                href={`/news/${item.id}`}
                className="mt-8 inline-block font-semibold text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
