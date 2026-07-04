import SearchBar from "@/components/training/SearchBar";
import Categories from "@/components/training/Categories";
import Courses from "@/components/training/Courses";
import WhyChoose from "@/components/training/WhyChoose";
import Stats from "@/components/training/Stats";
import Instructors from "@/components/training/Instructors";
import CTA from "@/components/training/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Academy",
  description: "Learn grant writing, research methodology, and proposal development from expert instructors.",
};

export default function TrainingAcademyPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Training Academy</h1>
        <p className="text-gray-500 text-lg">
          Learn grant writing, research methodology, and proposal development.
        </p>
      </div>

      <SearchBar />
      <Categories />
      <Courses />
      <WhyChoose />
      <Stats />
      <Instructors />
      <CTA />
    </main>
  );
}