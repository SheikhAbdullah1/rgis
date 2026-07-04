"use client";

import { useEffect, useState } from "react";

export default function AdminMembershipTable() {
  const [memberships, setMemberships] = useState<any[]>([]);

  const fetchMemberships = async () => {
    const res = await fetch("/api/memberships");

    const data = await res.json();

    if (data.success) {
      setMemberships(data.memberships);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/memberships/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    fetchMemberships();
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Type</th>
            <th className="p-4">Payment</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {memberships.map((membership) => (
            <tr key={membership._id} className="border-t">
              <td className="p-4">{membership.fullName}</td>

              <td className="p-4">{membership.email}</td>

              <td className="p-4">{membership.membershipType}</td>

              <td className="p-4">{membership.paymentStatus}</td>

              <td className="p-4">{membership.status}</td>

              <td className="space-x-2 p-4">
                <button
                  onClick={() => updateStatus(membership._id, "Approved")}
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(membership._id, "Rejected")}
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
