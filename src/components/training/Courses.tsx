"use client";

import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {courses.map((course: any) => (
        <div key={course._id} className="rounded-xl border p-5">
          <img
            src={course.image}
            className="h-48 w-full rounded object-cover"
          />

          <h2 className="mt-4 font-bold">{course.title}</h2>

          <p>{course.category}</p>
        </div>
      ))}
    </div>
  );
}
