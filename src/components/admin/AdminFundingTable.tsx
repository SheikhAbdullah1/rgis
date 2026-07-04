"use client";

import { useEffect, useState } from "react";
import FundingForm from "./FundingForm";

export default function AdminFundingTable() {
  const [fundings, setFundings] = useState<any[]>([]);

  const [selected, setSelected] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const fetchFunding = async () => {
    const res = await fetch("/api/funding");

    const data = await res.json();

    if (data.success) {
      setFundings(data.opportunities);
    }
  };

  useEffect(() => {
    fetchFunding();
  }, []);

  const deleteFunding = async (id: string) => {
    if (!window.confirm("Delete funding?")) return;

    await fetch(`/api/funding/${id}`, {
      method: "DELETE",
    });

    fetchFunding();
  };

  return (
    <>
      {" "}
      <div className="mb-6">
        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Funding{" "}
        </button>{" "}
      </div>
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Title</th>

              <th className="p-4">Agency</th>

              <th className="p-4">Deadline</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {fundings.map((funding) => (
              <tr key={funding._id} className="border-t">
                <td className="p-4">{funding.title}</td>

                <td className="p-4">{funding.agency?.name}</td>

                <td className="p-4">
                  {new Date(funding.deadline).toLocaleDateString()}
                </td>

                <td className="p-4">{funding.status}</td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelected(funding);
                      setOpen(true);
                    }}
                    className="bg-green-600 text-white px-3 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFunding(funding._id)}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <FundingForm
          funding={selected}
          onClose={() => setOpen(false)}
          refresh={fetchFunding}
        />
      )}
    </>
  );
}
