import Link from "next/link";
import { Users } from "lucide-react";
import { memberships } from "@/data/memberships";

export default function MembershipPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h2 className="text-4xl font-bold">
              Become an RGIS Member
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Join our growing community of researchers,
              innovators, institutions, and funding experts.
            </p>
          </div>

          <Link
            href="/membership"
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
            View Membership
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {memberships.map((membership) => (
            <div
              key={membership.id}
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
                <Users size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {/* {membership.title} */}
                {membership.name}
              </h3>

              <p className="mt-3 text-blue-600 font-semibold">
                {membership.price}
              </p>

              <p className="mt-4 text-gray-600">
                {membership.description}
              </p>

              <Link
                href="/membership"
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
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
