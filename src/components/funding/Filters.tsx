export default function Filters() {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      {/* Category */}
      <select className="rounded-lg border border-gray-300 p-3">
        <option>All Categories</option>
        <option>Research Grants</option>
        <option>Innovation Grants</option>
        <option>Scholarships</option>
        <option>Fellowships</option>
      </select>

      {/* Country */}
      <select className="rounded-lg border border-gray-300 p-3">
        <option>All Countries</option>
        <option>Pakistan</option>
        <option>USA</option>
        <option>UK</option>
        <option>Canada</option>
      </select>

      {/* Funding Amount */}
      <select className="rounded-lg border border-gray-300 p-3">
        <option>Any Amount</option>
        <option>Under $10,000</option>
        <option>$10,000 - $50,000</option>
        <option>Above $50,000</option>
      </select>

      {/* Deadline */}
      <select className="rounded-lg border border-gray-300 p-3">
        <option>Any Deadline</option>
        <option>This Week</option>
        <option>This Month</option>
        <option>Next 3 Months</option>
      </select>
    </div>
  );
}