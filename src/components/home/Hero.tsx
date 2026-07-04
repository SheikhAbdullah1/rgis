import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-700 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              Research Grant Intelligence System (RGIS)
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight lg:text-6xl">
              Discover Funding.
              <br />
              Develop Proposals.
              <br />
              Transform Research.
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-blue-100">
              RGIS is a comprehensive funding intelligence
              platform connecting researchers, startups,
              universities, NGOs, and innovators with grants,
              scholarships, fellowships, and funding
              opportunities worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/funding-opportunities"
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
                Explore Funding
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
                href="/membership"
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
                Become a Member
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <h3 className="text-4xl font-bold">
                500+
              </h3>

              <p className="mt-2 text-blue-100">
                Funding Opportunities
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <h3 className="text-4xl font-bold">
                100+
              </h3>

              <p className="mt-2 text-blue-100">
                Funding Agencies
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <h3 className="text-4xl font-bold">
                1000+
              </h3>

              <p className="mt-2 text-blue-100">
                Researchers Connected
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <h3 className="text-4xl font-bold">
                50+
              </h3>

              <p className="mt-2 text-blue-100">
                Training Programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}