"use client";

interface Props {
  data: any[];
}

export default function UserChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">User Growth</h2>

      {data.map((item) => (
        <div key={item._id.month} className="flex justify-between py-2">
          <span>Month {item._id.month}</span>

          <span>{item.count}</span>
        </div>
      ))}
    </div>
  );
}
