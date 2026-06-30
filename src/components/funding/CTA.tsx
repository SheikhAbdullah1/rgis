import Link from "next/link";

export default function CTA() {
  return (
    <section className="rounded-3xl bg-blue-600 px-8 py-20 text-center text-white">
      <h2 className="text-4xl font-bold">
        Need Help Finding Funding?
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-blue-100">
        Explore opportunities and connect with funding partners.
      </p>

      <Link
        href="/contact"
        className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-blue-600"
      >
        Contact Us
      </Link>
    </section>
  );
}
