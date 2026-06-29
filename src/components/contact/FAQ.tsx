const faqs = [
  {
    question:
      "How can I apply for research funding?",
    answer:
      "You can submit your proposal through our Proposal Center.",
  },
  {
    question:
      "Do you offer research training programs?",
    answer:
      "Yes. RGIS provides workshops, webinars, and certification programs.",
  },
  {
    question:
      "Can organizations partner with RGIS?",
    answer:
      "Absolutely. We welcome academic and industry partnerships.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border p-6"
            >
              <h3 className="text-xl font-semibold">
                {faq.question}
              </h3>

              <p className="mt-4 text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
