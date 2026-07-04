import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params;

  const course = await Course.findById(id);

  if (!course) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <img src={course.image} className="w-full h-80 object-cover rounded-xl" />

      <h1 className="text-4xl font-bold mt-6">{course.title}</h1>

      <p className="mt-4 text-gray-600">{course.description}</p>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>

        <p>
          <strong>Category:</strong> {course.category}
        </p>

        <p>
          <strong>Level:</strong> {course.level}
        </p>

        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
      </div>
    </div>
  );
}
