"use client";

import {
  useEffect,
  useState,
} from "react";

export default function UserTable() {
  const [users, setUsers] =
    useState<any[]>([]);

  const fetchUsers =
    async () => {
      const res = await fetch(
        "/api/admin/users"
      );

      const data =
        await res.json();

      if (data.success) {
        setUsers(data.users);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole =
    async (
      id: string,
      role: string
    ) => {
      await fetch(
        "/api/admin/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            role,
          }),
        }
      );

      fetchUsers();
    };

  return (
    <div className="rounded-xl border">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Role
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-t"
            >
              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(
                      user._id,
                      e.target.value
                    )
                  }
                  className="rounded border p-2"
                >
                  <option>
                    Admin
                  </option>

                  <option>
                    Reviewer
                  </option>

                  <option>
                    Member
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}