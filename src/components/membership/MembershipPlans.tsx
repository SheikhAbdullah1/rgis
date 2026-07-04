export default function MembershipPlans() {
  const plans = [
    {
      name: "Student",
      price: 5000,
      features: ["Grant Alerts", "Templates", "Training Access"],
    },
    {
      name: "Researcher",
      price: 15000,
      features: ["Everything in Student", "Proposal Reviews", "Mentorship"],
    },
    {
      name: "Institution",
      price: 50000,
      features: ["Unlimited Users", "Dedicated Support", "Custom Training"],
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.name} className="border rounded-xl p-6">
          {" "}
          <h2 className="text-2xl font-bold">{plan.name} </h2>
          <p className="text-3xl mt-4">
            Rs.
            {plan.price}
          </p>
          <ul className="mt-6 space-y-2">
            {plan.features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
