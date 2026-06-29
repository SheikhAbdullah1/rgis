export default function WhyChoose() {
  const features = [
    "Industry Expert Trainers",
    "Research & Grant Writing Focus",
    "Hands-on Workshops",
    "International Learning Standards",
    "Professional Certifications",
    "AI-Powered Research Training",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          Why Choose RGIS Training Academy?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <p className="text-lg font-semibold">
                ✓ {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
