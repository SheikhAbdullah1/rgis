import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-blue-700 py-24 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold lg:text-5xl">
          Ready to Transform Your Research Journey?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
          Join RGIS today to discover funding opportunities,
          develop successful proposals, connect with experts,
          and accelerate your research and innovation goals.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/membership"
            className="
              rounded-xl
              bg-white
              px-6
              py-3
              font-semibold
              text-blue-700
              transition
              hover:bg-gray-100
            "
          >
            Become a Member
          </Link>

          <Link
            href="/proposal-center"
            className="
              rounded-xl
              border
              border-white
              px-6
              py-3
              font-semibold
              transition
              hover:bg-white
              hover:text-blue-700
            "
          >
            Submit Proposal
          </Link>

          <Link
            href="/funding-opportunities"
            className="
              rounded-xl
              bg-blue-500
              px-6
              py-3
              font-semibold
              transition
              hover:bg-blue-400
            "
          >
            Explore Funding
          </Link>
        </div>
      </div>
    </section>
  );
}
