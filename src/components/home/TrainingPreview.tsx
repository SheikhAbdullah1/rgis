import Link from "next/link";
import { GraduationCap, Clock } from "lucide-react";
import { trainingPrograms } from "@/data/trainingPrograms";

export default function TrainingPreview() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h2 className="text-4xl font-bold">
              Training Academy
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Enhance your research, proposal writing,
              and innovation skills through our
              professional training programs.
            </p>
          </div>

          <Link
            href="/training-academy"
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Explore Academy
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trainingPrograms.map((program) => (
            <div
              key={program.id}
              className="
                rounded-2xl
                border
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-2
                hover:shadow-lg
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <GraduationCap size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {program.title}
              </h3>

              <div className="mt-6 flex items-center gap-3 text-gray-600">
                <Clock size={18} />
                {program.duration}
              </div>

              <Link
                href="/training-academy"
                className="
                  mt-8
                  inline-block
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
