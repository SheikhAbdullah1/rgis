import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  await connectDB();

  const { q } = await searchParams;

  const courses = await Course.find({
    title: {
      $regex: q || "",
      $options: "i",
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <Link key={course._id} href={`/training-academy/${course._id}`}>
            <div className="border rounded-xl p-5">
              <img
                src={course.image}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="mt-4 font-bold">{course.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
