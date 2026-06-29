import CourseCard from "./CourseCard";
const courses = [
    {
      title: "Grant Writing Masterclass",
      duration: "6 Weeks",
      level: "Intermediate",
      instructor: "Dr. Ahmed Khan",
    },
    {
      title: "Research Methodology",
      duration: "8 Weeks",
      level: "Beginner",
      instructor: "Dr. Sarah Ali",
    },
    {
      title: "AI Tools for Researchers",
      duration: "4 Weeks",
      level: "Advanced",
      instructor: "Prof. Bilal Hassan",
    },
  ];

export default function Courses() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Featured Courses
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.title}
              title={course.title}
              duration={course.duration}
              level={course.level}
              instructor={course.instructor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
