export default function OfficeHours() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Office Hours
        </h2>

        <div className="rounded-2xl bg-white border p-10 shadow-sm">
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 2:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
