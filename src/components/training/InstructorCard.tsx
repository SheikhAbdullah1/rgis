interface Props {
  name: string;
  designation: string;
  expertise: string;
}

export default function InstructorCard({
  name,
  designation,
  expertise,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm hover:shadow-lg transition">
      <div className="mx-auto h-24 w-24 rounded-full bg-gray-200"></div>

      <h3 className="mt-6 text-2xl font-bold">
        {name}
      </h3>

      <p className="mt-2 font-medium text-blue-600">
        {designation}
      </p>

      <p className="mt-4 text-gray-600">
        {expertise}
      </p>
    </div>
  );
}
