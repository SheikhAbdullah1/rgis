import {
    trainingPrograms,
  } from "@/data/trainingPrograms";
  
  import {
    notFound,
  } from "next/navigation";
  
  interface Props {
    params: {
      id: string;
    };
  }
  
  export default function Page({
    params,
  }: Props) {
    const course =
      trainingPrograms.find(
        (p) =>
          p.id.toString() ===
          params.id
      );
  
    if (!course)
      return notFound();
  
    return (
      <main className="mx-auto max-w-7xl p-6">
        <div className="rounded-xl border p-8">
  
          <h1 className="mb-4 text-4xl font-bold">
            {course.title}
          </h1>
  
          <p className="mb-6 text-gray-600">
            {course.description}
          </p>
  
          <div className="grid gap-6 md:grid-cols-2">
  
            <div>
              <h2 className="mb-3 text-2xl font-bold">
                Course Details
              </h2>
  
              <p>
                <strong>
                  Category:
                </strong>{" "}
                {course.category}
              </p>
  
              <p>
                <strong>
                  Duration:
                </strong>{" "}
                {course.duration}
              </p>
  
              <p>
                <strong>
                  Level:
                </strong>{" "}
                {course.level}
              </p>
  
              <p>
                <strong>
                  Instructor:
                </strong>{" "}
                {
                  course.instructor
                }
              </p>
            </div>
  
            <div>
              <h2 className="mb-3 text-2xl font-bold">
                What You Will Learn
              </h2>
  
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Research Proposal Writing
                </li>
                <li>
                  Grant Management
                </li>
                <li>
                  Budget Planning
                </li>
                <li>
                  Donor Communication
                </li>
                <li>
                  Project Monitoring
                </li>
              </ul>
            </div>
  
          </div>
  
          <button className="mt-8 rounded bg-blue-600 px-6 py-3 text-white">
            Enroll Now
          </button>
        </div>
      </main>
    );
  }