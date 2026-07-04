"use client";

import {
  useEffect,
  useState,
} from "react";

export default function SavedGrantsPage() {
  const [grants, setGrants] =
    useState<any[]>([]);

  const fetchGrants =
    async () => {
      const res =
        await fetch(
          "/api/saved-grants"
        );

      const data =
        await res.json();

      if (data.success) {
        setGrants(data.grants);
      }
    };

  useEffect(() => {
    fetchGrants();
  }, []);

  const removeGrant =
    async (id: string) => {
      await fetch(
        "/api/saved-grants",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify({
              grantId: id,
            }),
        }
      );

      fetchGrants();
    };

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Saved Grants
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {grants.map(
          (grant) => (
            <div
              key={grant._id}
              className="rounded-xl border p-6"
            >
              <h2 className="text-xl font-bold">
                {grant.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {
                  grant.country
                }
              </p>

              <button
                onClick={() =>
                  removeGrant(
                    grant._id
                  )
                }
                className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
              >
                Remove
              </button>
            </div>
          )
        )}

        {grants.length ===
          0 && (
          <p>
            No saved grants.
          </p>
        )}
      </div>
    </main>
  );
}