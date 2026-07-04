"use client";

import { useSearchParams }
from "next/navigation";

export default function Checkout() {
  const params =
    useSearchParams();

  const amount =
    params.get("amount");

  const type =
    params.get("type");

  const handlePayment =
    async () => {
      const res =
        await fetch(
          "/api/payments",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              amount,
              membershipType:
                type,
            }),
          }
        );

      const data =
        await res.json();

      if (data.url) {
        window.location.href =
          data.url;
      }
    };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Membership Checkout
      </h1>

      <p>Plan: {type}</p>

      <p>Amount: ${amount}</p>

      <button
        onClick={handlePayment}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}