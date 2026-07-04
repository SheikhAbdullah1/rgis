// import Categories from "@/components/training/Categories";
// import Courses from "@/components/training/Courses";
// import WhyChoose from "@/components/training/WhyChoose";
// import Stats from "@/components/training/Stats";
// import Instructors from "@/components/training/Instructors";
// import CTA from "@/components/training/CTA";
// import type { Metadata } from "next";

// export const metadata: Metadata = { 
//   title: "Contact Us", 
//   description: "Contact the Research Grant Intelligence System team.", 
// };

// export default function TrainingAcademyPage() {
//   return (
//     <main>
//       <Categories />
//       <Courses />
//       <WhyChoose />
//       <Stats />
//       <Instructors />
//       <CTA />
//     </main>
//   );
// }


import SearchBar from "@/components/training/SearchBar";
import Courses from "@/components/training/Courses";
import Categories from "@/components/training/Categories";

export default function TrainingPage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <SearchBar />
      <Categories />
      <Courses />
    </main>
  );
}