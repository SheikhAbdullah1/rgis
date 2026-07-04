"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    plan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.plan) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Membership request submitted!");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          plan: "",
        });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-8 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Apply for Membership</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Institution / Organization
          </label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="University or organization name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Select Plan <span className="text-red-500">*</span>
          </label>
          <select
            name="plan"
            value={form.plan}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Choose a plan</option>
            <option value="Student">Student — PKR 1,000/yr</option>
            <option value="Researcher">Researcher — PKR 5,000/yr</option>
            <option value="Premium Researcher">
              Premium Researcher — PKR 15,000/yr
            </option>
            <option value="Institution">Institution — PKR 100,000/yr</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Submitting..." : "Submit Membership Request"}
        </button>
      </form>
    </div>
  );
}
