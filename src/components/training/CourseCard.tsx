// interface Props {
//   title: string;
//   duration: string;
//   level: string;
//   instructor: string;
// }

// export default function CourseCard({
//   title,
//   duration,
//   level,
//   instructor,
// }: Props) {
//   return (
//     <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
//       <div className="h-48 bg-gray-200"></div>

//       <div className="p-6">
//         <h3 className="text-2xl font-bold">
//           {title}
//         </h3>

//         <p className="mt-4">
//           Duration: {duration}
//         </p>

//         <p>
//           Level: {level}
//         </p>

//         <p>
//           Instructor: {instructor}
//         </p>

//         <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white">
//           Enroll Now
//         </button>
//         <Link
//   href={`/training-academy/${course.id}`}
// ></Link>
//       </div>
//     </div>
//   );
// }

import Link from "next/link"; // ✅ Fixed missing import

interface CourseCardProps {
  _id?: string;             // ✅ Added MongoDB unique ID support
  id?: string | number;     // ✅ Added fallback standard ID
  title: string;
  duration: string;
  level: string;
  instructor: string;
}

export default function CourseCard({
  _id,
  id,
  title,
  duration,
  level,
  instructor,
}: CourseCardProps) {
  // Safe routing ID fallback logic
  const courseId = _id ?? id;

  return (
    <div className="rounded-2xl bg-white border shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Course Banner Placeholder */}
      <div className="h-48 bg-gray-200"></div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <div className="mt-4 space-y-1.5 text-sm text-gray-600">
          <p>
            <strong className="text-gray-700">Duration:</strong> {duration}
          </p>
          <p>
            <strong className="text-gray-700">Level:</strong> {level}
          </p>
          <p>
            <strong className="text-gray-700">Instructor:</strong> {instructor}
          </p>
        </div>

        {/* ✅ Fixed: Proper Next.js Link routing workflow wrapper */}
        {courseId ? (
          <Link href={`/training-academy/${courseId}`} className="block mt-6">
            <button className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Enroll Now
            </button>
          </Link>
        ) : (
          <button className="mt-6 w-full rounded-lg bg-gray-400 py-3 text-sm font-medium text-white cursor-not-allowed" disabled>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
}