import { Award, Building2 } from "lucide-react";
import { successStories } from "@/data/successStories";

export default function SuccessStories() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Success Stories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Discover how researchers, institutions, and
            startups have transformed their ideas into
            successful funded projects.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 ">
          {successStories.map((story) => (
            <div
              key={story.id}
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
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Award size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {story.name}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Building2 size={18} />
                {story.organization}
              </div>

              <p className="mt-4 font-semibold text-blue-600">
                {story.grant}
              </p>

              <p className="mt-4 text-gray-600">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
