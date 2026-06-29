// ```tsx id="s20lma"
interface Props {
  title: string;
  duration: string;
  level: string;
  instructor: string;
}

export default function CourseCard({
  title,
  duration,
  level,
  instructor,
}: Props) {
  return (
    <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
      <div className="h-48 bg-gray-200"></div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-4">
          Duration: {duration}
        </p>

        <p>
          Level: {level}
        </p>

        <p>
          Instructor: {instructor}
        </p>

        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white">
          Enroll Now
        </button>
      </div>
    </div>
  );
}