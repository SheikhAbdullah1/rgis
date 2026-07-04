"use client";

import { useSearchParams } from "next/navigation";
import { memberships } from "@/data/memberships";

export default function CheckoutPage() {
  const params =
    useSearchParams();

  const id =
    params.get("id");

  const plan =
    memberships.find(
      (m) =>
        m.id.toString() === id
    );

  if (!plan)
    return (
      <main className="p-6">
        Plan not found.
      </main>
    );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Checkout
        </h1>

        <div className="mb-8 rounded-lg bg-gray-50 p-6">
          <h2 className="text-2xl font-bold">
            {plan.name}
          </h2>

          <p className="mt-3">
            {plan.description}
          </p>

          <div className="mt-4 text-4xl font-bold text-blue-600">
            ${plan.price}
          </div>
        </div>

        <button className="w-full rounded bg-green-600 py-4 text-white">
          Pay Now
        </button>

        <p className="mt-4 text-center text-gray-500">
          Payment integration
          will be added in
          Phase 2.
        </p>
      </div>
    </main>
  );
}