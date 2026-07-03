"use client";

import { useEffect, useState } from "react";

export default function GrantForm() {
  const [agencies, setAgencies] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      title: "",
      agency: "",
      country: "",
      amount: "",
      deadline: "",
      description: "",
      category: "",
    });

  useEffect(() => {
    fetch("/api/agencies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.success) {
          setAgencies(data.agencies);
        }
      });
  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      const res = await fetch(
        "/api/admin/grants",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            form
          ),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        alert(
          "Grant created successfully"
        );

        setForm({
          title: "",
          agency: "",
          country: "",
          amount: "",
          deadline: "",
          description: "",
          category: "",
        });
      }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border p-6"
    >
      <h2 className="text-2xl font-bold">
        Add Funding Opportunity
      </h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      />

      <select
        value={form.agency}
        onChange={(e) =>
          setForm({
            ...form,
            agency:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      >
        <option value="">
          Select Agency
        </option>

        {agencies.map(
          (agency) => (
            <option
              key={agency._id}
              value={agency._id}
            >
              {agency.name}
            </option>
          )
        )}
      </select>

      <input
        placeholder="Country"
        value={form.country}
        onChange={(e) =>
          setForm({
            ...form,
            country:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      />

      <input
        placeholder="Funding Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      />

      <input
        type="date"
        value={form.deadline}
        onChange={(e) =>
          setForm({
            ...form,
            deadline:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
      />

      <textarea
        placeholder="Description"
        value={
          form.description
        }
        onChange={(e) =>
          setForm({
            ...form,
            description:
              e.target.value,
          })
        }
        className="w-full rounded border p-3"
        rows={5}
      />

      <button
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Save Grant
      </button>
    </form>
  );
}