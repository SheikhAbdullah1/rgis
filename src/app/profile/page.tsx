"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ProfilePage() {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      organization: "",
      country: "",
    });

  const fetchProfile =
    async () => {
      const res =
        await fetch(
          "/api/profile"
        );

      const data =
        await res.json();

      if (data.success) {
        setForm({
          name:
            data.user?.name ||
            "",
          email:
            data.user?.email ||
            "",
          phone:
            data.user?.phone ||
            "",
          organization:
            data.user
              ?.organization ||
            "",
          country:
            data.user
              ?.country ||
            "",
        });
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      const res =
        await fetch(
          "/api/profile",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify(
                form
              ),
          }
        );

      const data =
        await res.json();

      if (data.success) {
        alert(
          "Profile updated."
        );
      }
    };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border p-8">
        <h1 className="mb-8 text-3xl font-bold">
          My Profile
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <input
            placeholder="Organization"
            value={
              form.organization
            }
            onChange={(e) =>
              setForm({
                ...form,
                organization:
                  e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <input
            placeholder="Country"
            value={
              form.country
            }
            onChange={(e) =>
              setForm({
                ...form,
                country:
                  e.target.value,
              })
            }
            className="w-full rounded border p-3"
          />

          <button className="rounded bg-blue-600 px-6 py-3 text-white">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}