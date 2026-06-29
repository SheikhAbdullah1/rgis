import InstructorCard from "./InstructorCard";

const instructors = [
  {
    name: "Dr. Ahmed Khan",
    designation: "Research Consultant",
    expertise:
      "Grant Writing & Research Methodology",
  },
  {
    name: "Dr. Sarah Ali",
    designation: "Academic Researcher",
    expertise:
      "Academic Writing & Publications",
  },
  {
    name: "Prof. Bilal Hassan",
    designation: "AI Specialist",
    expertise:
      "Artificial Intelligence for Researchers",
  },
];

export default function Instructors() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Meet Our Instructors
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor.name}
              name={instructor.name}
              designation={instructor.designation}
              expertise={instructor.expertise}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

