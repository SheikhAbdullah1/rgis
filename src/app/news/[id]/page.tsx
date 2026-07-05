import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { news } from "@/data/news";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = news.find((n) => String(n.id) === id);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to News
      </Link>

      <span className="mt-8 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
        {item.category}
      </span>

      <h1 className="mt-4 text-4xl font-bold">{item.title}</h1>

      <div className="mt-4 flex items-center gap-2 text-gray-600">
        <Calendar size={18} />
        {item.date}
      </div>

      <p className="mt-8 text-lg text-gray-700">
        Full details for this announcement will be updated soon. Please
        check back or contact RGIS support for more information.
      </p>
    </main>
  );
}