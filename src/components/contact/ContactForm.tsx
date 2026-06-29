"use client";

export default function ContactForm() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold mb-8">
        Send Message
      </h2>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          rows={5}
          placeholder="Message"
          className="w-full rounded-lg border p-3"
        />

        <button
          className="
          w-full
          rounded-lg
          bg-blue-600
          py-3
          text-white
        "
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
