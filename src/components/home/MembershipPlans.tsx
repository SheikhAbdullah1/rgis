import { memberships } from "@/src/data/memberships";

export default function MembershipPlans() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-4">
        Membership Plans
      </h2>

      <p className="text-center text-gray-600 mb-12">
        Choose the plan that fits your research journey.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border p-8 shadow-sm hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <p className="text-3xl font-bold text-blue-600 my-4">
              {plan.price}
            </p>

            <p className="text-gray-600 mb-6">
              {plan.description}
            </p>

            <ul className="space-y-2 mb-8">
              {plan.features.map((feature) => (
                <li key={feature}>✔ {feature}</li>
              ))}
            </ul>

            <button className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}