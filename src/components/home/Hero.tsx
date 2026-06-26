import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              AI Powered Research Funding Platform
            </span>

            <h1 className="text-5xl font-extrabold leading-tight">
              Discover Global
              <span className="text-blue-600">
                {" "}Research Grants
              </span>
              <br />
              and Funding Opportunities
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Search thousands of grants, fellowships,
              scholarships and innovation funding from
              leading agencies across the world.
            </p>

            {/* Search */}

            <div className="mt-10 flex bg-white rounded-xl shadow-lg overflow-hidden">

              <input
                type="text"
                placeholder="Search grants, agencies, keywords..."
                className="flex-1 px-5 py-4 outline-none"
              />

              <button className="bg-blue-600 hover:bg-blue-700 px-8 text-white flex items-center gap-2">
                <Search size={18} />
                Search
              </button>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  10K+
                </h2>
                <p className="text-gray-500">
                  Grants
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  500+
                </h2>
                <p className="text-gray-500">
                  Agencies
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  120+
                </h2>
                <p className="text-gray-500">
                  Countries
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  AI
                </h2>
                <p className="text-gray-500">
                  Matching
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="w-full max-w-md h-[450px] rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center">

              <h2 className="text-white text-3xl font-bold">
                RGIS
              </h2>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}