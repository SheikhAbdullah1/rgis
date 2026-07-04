import Link from "next/link";
import {
  Calendar,
  Globe,
  Building2,
  Wallet,
} from "lucide-react";

import { grants } from "@/data/grants";

export default function FeaturedGrants() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h2 className="text-4xl font-bold">
              Featured Funding Opportunities
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Discover some of the latest grants and
              funding opportunities available through
              RGIS.
            </p>
          </div>

          <Link
            href="/funding-opportunities"
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
            View All Opportunities
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {grants.map((grant) => (
            <div
              key={grant.id}
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
              <h3 className="text-2xl font-bold">
                {grant.title}
              </h3>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 size={18} />
                  {grant.agency}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Globe size={18} />
                  {grant.country}
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Wallet size={18} />
                  {grant.amount}
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} />
                  {grant.deadline}
                </div>
              </div>

              <Link
                href="/funding-opportunities"
                className="
                  mt-8
                  inline-block
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
