import {
  FaUsers,
  FaChalkboardTeacher,
  FaGlobe,
  FaBook,
} from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    number: "1000+",
    title: "Students Trained",
  },
  {
    icon: FaBook,
    number: "100+",
    title: "Research Workshops",
  },
  {
    icon: FaChalkboardTeacher,
    number: "50+",
    title: "Expert Trainers",
  },
  {
    icon: FaGlobe,
    number: "20+",
    title: "Countries Reached",
  },
];

export default function Stats() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="text-center"
              >
                <Icon className="mx-auto text-5xl mb-4" />

                <h3 className="text-5xl font-bold">
                  {stat.number}
                </h3>

                <p className="mt-3 text-lg">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
