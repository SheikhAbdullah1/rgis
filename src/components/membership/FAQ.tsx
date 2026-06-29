export default function FAQ() {
    const faqs = [
      {
        q: "Can I upgrade later?",
        a: "Yes, you can upgrade anytime.",
      },
      {
        q: "Do you offer free trials?",
        a: "Yes, Premium includes a trial period.",
      },
      {
        q: "Can organizations buy Enterprise?",
        a: "Yes, Enterprise is designed for organizations.",
      },
    ];
  
    return (
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="rounded-xl border p-6"
          >
            <h3 className="font-semibold">
              {faq.q}
            </h3>
  
            <p className="mt-2 text-gray-600">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    );
  }