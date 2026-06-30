interface FiltersProps {
  category: string;
  setCategory: (value: string) => void;

  country: string;
  setCountry: (value: string) => void;

  deadline: string;
  setDeadline: (value: string) => void;
}

export default function Filters({
  category,
  setCategory,
  country,
  setCountry,
  deadline,
  setDeadline,
}: FiltersProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <select
        className="rounded-lg border p-3"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option>All Categories</option>
        <option>Research Grants</option>
        <option>Innovation Grants</option>
        <option>Scholarships</option>
        <option>Fellowships</option>
      </select>

      <select
        className="rounded-lg border p-3"
        value={country}
        onChange={(e) =>
          setCountry(e.target.value)
        }
      >
        <option>All Countries</option>
        <option>Pakistan</option>
        <option>France</option>
        <option>International</option>
      </select>

      <select className="rounded-lg border p-3">
        <option>Any Amount</option>
        <option>Under $10,000</option>
        <option>$10,000 - $50,000</option>
        <option>Above $50,000</option>
      </select>

      <select
        className="rounded-lg border p-3"
        value={deadline}
        onChange={(e) =>
          setDeadline(e.target.value)
        }
      >
        <option>Any Deadline</option>
        <option>This Week</option>
        <option>This Month</option>
        <option>Next 3 Months</option>
      </select>
    </div>
  );
}