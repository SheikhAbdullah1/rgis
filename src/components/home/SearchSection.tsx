import Link from "next/link";

export default function SearchSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Search Funding Opportunities
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Explore grants, scholarships, fellowships,
              startup funding, and international research
              opportunities.
            </p>
          </div>

          <form className="mt-10">
            <div className="grid gap-4 lg:grid-cols-4">
              <input
                type="text"
                placeholder="Keyword or Grant Title"
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-4
                  text-base
                  outline-none
                  focus:border-blue-600
                "
              />

              <select
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-4
                  text-base
                  outline-none
                  focus:border-blue-600
                "
              >
                <option>All Categories</option>
                <option>Research Grants</option>
                <option>Scholarships</option>
                <option>Fellowships</option>
                <option>Startup Funding</option>
              </select>

              <select
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-4
                  text-base
                  outline-none
                  focus:border-blue-600
                "
              >
                <option>All Countries</option>
                <option>Pakistan</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
              </select>

              <button
                type="submit"
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-4
                  text-base
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Search Opportunities
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/fundingOpportunities"
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              Research Grants
            </Link>

            <Link
              href="/fundingOpportunities"
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              Scholarships
            </Link>

            <Link
              href="/fundingOpportunities"
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              Fellowships
            </Link>

            <Link
              href="/fundingOpportunities"
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              Startup Funding
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
