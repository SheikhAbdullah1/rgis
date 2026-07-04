"use client";

import { useEffect, useState } from "react";

export default function AdminUsersTable() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");

    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  const changeRole = async (id: string, role: string) => {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    });

    fetchUsers();
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>

            <th className="p-4">Email</th>

            <th className="p-4">Role</th>

            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-4">{user.name}</td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">{user.role}</td>

              <td className="space-x-2 p-4">
                <button
                  onClick={() => changeRole(user._id, "Admin")}
                  className="rounded bg-blue-600 px-3 py-2 text-white"
                >
                  Make Admin
                </button>

                <button
                  onClick={() => changeRole(user._id, "User")}
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Make User
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
