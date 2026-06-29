import Categories from "@/components/training/Categories";
import Courses from "@/components/training/Courses";
import WhyChoose from "@/components/training/WhyChoose";
import Stats from "@/components/training/Stats";
import Instructors from "@/components/training/Instructors";
import CTA from "@/components/training/CTA";

export default function TrainingAcademyPage() {
  return (
    <main>
      <Categories />
      <Courses />
      <WhyChoose />
      <Stats />
      <Instructors />
      <CTA />
    </main>
  );
}
