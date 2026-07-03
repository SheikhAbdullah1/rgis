"use client";

import { useEffect, useState } from "react";
import AgencyForm from "./AgencyForm";

export default function AdminAgencyTable() {
  const [agencies, setAgencies] =
    useState<any[]>([]);

  const [selectedAgency, setSelectedAgency] =
    useState<any>(null);

  const [open, setOpen] =
    useState(false);

  const fetchAgencies = async () => {
    const res = await fetch(
      "/api/agencies"
    );

    const data =
      await res.json();

    if (data.success) {
      setAgencies(data.agencies);
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const deleteAgency = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Delete this agency?"
      );

    if (!confirmed) return;

    await fetch(
      `/api/agencies/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchAgencies();
  };

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => {
            setSelectedAgency(null);
            setOpen(true);
          }}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Agency
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Country
              </th>

              <th className="p-4">
                Website
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {agencies.map(
              (agency) => (
                <tr
                  key={agency._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {agency.name}
                  </td>

                  <td className="p-4">
                    {agency.country}
                  </td>

                  <td className="p-4">
                    {agency.website}
                  </td>

                  <td className="p-4">
                    {agency.status}
                  </td>

                  <td className="space-x-2 p-4">
                    <button
                      onClick={() => {
                        setSelectedAgency(
                          agency
                        );
                        setOpen(true);
                      }}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteAgency(
                          agency._id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <AgencyForm
          agency={selectedAgency}
          onClose={() =>
            setOpen(false)
          }
          refresh={fetchAgencies}
        />
      )}
    </>
  );
}