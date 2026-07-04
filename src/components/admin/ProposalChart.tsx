"use client";

interface Props {
  data: any[];
}

export default function ProposalChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">Proposal Statistics</h2>

      {data.map((item) => (
        <div key={item._id} className="flex justify-between py-2">
          <span>{item._id}</span>

          <span>{item.count}</span>
        </div>
      ))}
    </div>
  );
}
