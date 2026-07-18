import SDGDetail from "@/components/sdg/SDGDetail";

async function getSDG(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sdgs/${slug}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.sdg;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sdg = await getSDG(slug);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <SDGDetail sdg={sdg} />
    </main>
  );
}