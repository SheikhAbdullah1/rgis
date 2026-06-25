export default function MembershipPlans() {
    const plans = [
      "Student",
      "Researcher",
      "Institution",
    ];
  
    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
  
          <h2 className="text-3xl font-bold text-center mb-10">
            Membership Plans
          </h2>
  
          <div className="grid md:grid-cols-3 gap-6">
  
            {plans.map((plan) => (
              <div
                key={plan}
                className="border rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold">
                  {plan}
                </h3>
  
                <button className="mt-6 border px-4 py-2 rounded">
                  Get Started
                </button>
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }