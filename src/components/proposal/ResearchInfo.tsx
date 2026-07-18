"use client";

import { ProposalData } from "./types";

interface Props {
  data: ProposalData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;
}

export default function ResearchInfo({
  data,
  onChange,
}: Props) {

  return (

    <section className="rounded-xl border p-6 space-y-5">

      <h2 className="text-2xl font-bold">
        Research Information
      </h2>

      <input
        name="researchArea"
        value={data.researchArea}
        onChange={onChange}
        placeholder="Research Area"
        className="w-full rounded-lg border p-3"
      />

      <input
        name="keywords"
        value={data.keywords}
        onChange={onChange}
        placeholder="Keywords (comma separated)"
        className="w-full rounded-lg border p-3"
      />

      <input
        name="duration"
        value={data.duration}
        onChange={onChange}
        placeholder="Project Duration"
        className="w-full rounded-lg border p-3"
      />

      <textarea
        rows={5}
        name="expectedOutcomes"
        value={data.expectedOutcomes}
        onChange={onChange}
        placeholder="Expected Outcomes"
        className="w-full rounded-lg border p-3"
      />

    </section>

  );
}