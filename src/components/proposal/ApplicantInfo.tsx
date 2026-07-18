"use client";

import { ProposalData } from "./types";

interface Props {
  data: ProposalData;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;
}

export default function ApplicantInfo({
  data,
  errors,
  onChange,
}: Props) {
  return (
    <section className="rounded-xl border p-6 space-y-5">

      <h2 className="text-2xl font-bold">
        Applicant Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            name="fullName"
            value={data.fullName}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.fullName && (
            <p className="text-sm text-red-500">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="+92xxxxxxxxxx"
            className="w-full rounded-lg border p-3"
          />

          {errors.phone && (
            <p className="text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            CNIC / Passport
          </label>

          <input
            name="cnic"
            value={data.cnic}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.cnic && (
            <p className="text-sm text-red-500">
              {errors.cnic}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Country
          </label>

          <input
            name="country"
            value={data.country}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />

          {errors.country && (
            <p className="text-sm text-red-500">
              {errors.country}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Website
          </label>

          <input
            name="website"
            value={data.website}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Organization
        </label>

        <input
          name="organization"
          value={data.organization}
          onChange={onChange}
          className="w-full rounded-lg border p-3"
        />

        {errors.organization && (
          <p className="text-sm text-red-500">
            {errors.organization}
          </p>
        )}

      </div>

    </section>
  );
}