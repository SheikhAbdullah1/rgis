"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  category?: string;
  instructor?: string;
  duration?: string;
}

export default function AdminCourseTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCourses(data.courses);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  if (loading) return <p className="py-8 text-center text-gray-500">Loading courses...</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Instructor</th>
            <th className="p-4">Duration</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                No courses found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="p-4">{course.title}</td>
                <td className="p-4">{course.category || "—"}</td>
                <td className="p-4">{course.instructor || "—"}</td>
                <td className="p-4">{course.duration || "—"}</td>
                <td className="p-4 space-x-3">
                  <Link
                    href={`/admin/courses/${course._id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}