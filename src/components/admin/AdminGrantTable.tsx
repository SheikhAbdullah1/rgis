"use client";

import { useEffect, useState } from "react";

export default function AdminGrantTable() {
  const [grants, setGrants] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const fetchGrants =
    async () => {
      const res = await fetch(
        "/api/admin/grants"
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

  const deleteGrant =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Delete this grant?"
        );

      if (!confirmed) return;

      await fetch(
        "/api/admin/grants",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      fetchGrants();
    };

  const filteredGrants =
    grants.filter((grant) =>
      grant.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="rounded-xl border p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search grants..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                Title
              </th>

              <th className="p-4">
                Agency
              </th>

              <th className="p-4">
                Country
              </th>

              <th className="p-4">
                Deadline
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredGrants.map(
              (grant) => (
                <tr
                  key={grant._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {grant.title}
                  </td>

                  <td className="p-4">
                    {grant.agency
                      ?.name ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {grant.country}
                  </td>

                  <td className="p-4">
                    {grant.deadline}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteGrant(
                          grant._id
                        )
                      }
                      className="rounded bg-red-600 px-4 py-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

            {filteredGrants.length ===
              0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  No grants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
