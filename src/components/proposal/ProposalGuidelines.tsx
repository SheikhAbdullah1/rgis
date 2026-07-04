// // // export default function SubmissionGuidelines() {
// // //     return ( <div className="rounded-xl border p-6 bg-blue-50"> <h2 className="text-xl font-semibold mb-4">
// // //     Submission Guidelines </h2>

// // //       <ul className="list-disc ml-5 space-y-2">
// // //         <li>Fill all required fields.</li>
// // //         <li>Upload proposal document in PDF or DOCX.</li>
// // //         <li>Add supporting media if available.</li>
// // //         <li>Review information before submission.</li>
// // //       </ul>
// // //     </div>

// // //     );
// // //     }
    

// // export default function ProposalGuidelines() {
// //   return (
// //     <>
// //       <h1 className="mb-8 text-4xl font-bold">
// //         Proposal Writing Guidelines
// //       </h1>

// //       <div className="space-y-8">

// //         <section className="rounded-xl border p-6">
// //           <h2 className="mb-4 text-2xl font-bold">
// //             1. Proposal Structure
// //           </h2>

// //           <ul className="list-disc space-y-2 pl-6">
// //             <li>Title Page</li>
// //             <li>Abstract / Executive Summary</li>
// //             <li>Problem Statement</li>
// //             <li>Objectives</li>
// //             <li>Methodology</li>
// //             <li>Expected Outcomes</li>
// //             <li>Budget Plan</li>
// //             <li>Timeline</li>
// //             <li>References</li>
// //           </ul>
// //         </section>

// //         <section className="rounded-xl border p-6">
// //           <h2 className="mb-4 text-2xl font-bold">
// //             2. Common Mistakes
// //           </h2>

// //           <ul className="list-disc space-y-2 pl-6">
// //             <li>Unclear objectives</li>
// //             <li>Poor budgeting</li>
// //             <li>Weak methodology</li>
// //             <li>Missing references</li>
// //             <li>Ignoring donor requirements</li>
// //             <li>Late submissions</li>
// //           </ul>
// //         </section>

// //         <section className="rounded-xl border p-6">
// //           <h2 className="mb-4 text-2xl font-bold">
// //             3. Evaluation Criteria
// //           </h2>

// //           <ul className="list-disc space-y-2 pl-6">
// //             <li>Innovation</li>
// //             <li>Impact</li>
// //             <li>Feasibility</li>
// //             <li>Budget Justification</li>
// //             <li>Research Quality</li>
// //             <li>Team Capacity</li>
// //           </ul>
// //         </section>

// //         <section className="rounded-xl border p-6">
// //           <h2 className="mb-4 text-2xl font-bold">
// //             4. Submission Checklist
// //           </h2>

// //           <ul className="list-disc space-y-2 pl-6">
// //             <li>Proposal Document</li>
// //             <li>Budget Sheet</li>
// //             <li>CV of Principal Investigator</li>
// //             <li>Institution Letter</li>
// //             <li>Ethics Approval (if applicable)</li>
// //             <li>Supporting Documents</li>
// //           </ul>
// //         </section>

// //         <section className="rounded-xl border p-6">
// //           <h2 className="mb-4 text-2xl font-bold">
// //             5. Download Guides
// //           </h2>

// //           <div className="flex flex-wrap gap-4">
// //             <a
// //               href="/guides/proposal-writing-guide.pdf"
// //               download
// //               className="rounded bg-blue-600 px-5 py-3 text-white"
// //             >
// //               Proposal Writing Guide
// //             </a>

// //             <a
// //               href="/guides/budget-guide.pdf"
// //               download
// //               className="rounded bg-green-600 px-5 py-3 text-white"
// //             >
// //               Budget Guide
// //             </a>

// //             <a
// //               href="/guides/donor-guidelines.pdf"
// //               download
// //               className="rounded bg-purple-600 px-5 py-3 text-white"
// //             >
// //               Donor Requirements
// //             </a>
// //           </div>
// //         </section>

// //       </div>
// //     </>
// //   );
// // }


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// interface NavbarProps {
//   isLoggedIn?: boolean;
//   logout?: () => void;
// }

// export default function Navbar({ isLoggedIn = false, logout }: NavbarProps) {
//   const [open, setOpen] = useState(false);

//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "Funding", href: "/funding-opportunities" },
//     { label: "Proposal Center", href: "/proposal-center" },
//     { label: "Academy", href: "/training-academy" },
//     { label: "Membership", href: "/membership" },
//     { label: "Contact", href: "/contact" },
//   ];

//   return (
//     <nav className="border-b bg-white sticky top-0 z-50">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-blue-600">
//           RGIS
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden items-center gap-8 lg:flex">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="text-sm font-medium transition hover:text-blue-600"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden items-center gap-3 lg:flex">
//           {isLoggedIn ? (
//             <button
//               onClick={logout}
//               className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               {/* Button 1 — Login */}
//               <Link href="/login">
//                 <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
//                   Login
//                 </button>
//               </Link>

//               {/* Button 2 — Sign Up */}
//               <Link href="/signup">
//                 <button className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
//                   Sign Up
//                 </button>
//               </Link>

//               {/* Button 3 — Join as Member (membership page pe le jata hai) */}
//               <Link href="/membership">
//                 <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//                   Join as Member
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Hamburger */}
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700">
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="border-t bg-white lg:hidden">
//           <div className="flex flex-col px-6 py-4 divide-y divide-gray-100">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className="py-4 text-sm font-medium hover:text-blue-600 transition"
//               >
//                 {item.label}
//               </Link>
//             ))}

//             {/* Mobile Auth Buttons */}
//             <div className="flex flex-col gap-3 pt-4">
//               {isLoggedIn ? (
//                 <button
//                   onClick={() => { logout?.(); setOpen(false); }}
//                   className="w-full px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <Link href="/login" onClick={() => setOpen(false)}>
//                     <button className="w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
//                       Login
//                     </button>
//                   </Link>

//                   <Link href="/signup" onClick={() => setOpen(false)}>
//                     <button className="w-full px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
//                       Sign Up
//                     </button>
//                   </Link>

//                   <Link href="/membership" onClick={() => setOpen(false)}>
//                     <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//                       Join as Member
//                     </button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


export default function ProposalGuidelines() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Proposal Writing Guidelines</h2>

      <section className="rounded-xl border p-6">
        <h3 className="mb-4 text-lg font-semibold">1. Proposal Structure</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Title Page</li>
          <li>Abstract / Executive Summary</li>
          <li>Problem Statement</li>
          <li>Objectives</li>
          <li>Methodology</li>
          <li>Expected Outcomes</li>
          <li>Budget Plan</li>
          <li>Timeline</li>
          <li>References</li>
        </ul>
      </section>

      <section className="rounded-xl border p-6">
        <h3 className="mb-4 text-lg font-semibold">2. Common Mistakes</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Unclear objectives</li>
          <li>Poor budgeting</li>
          <li>Weak methodology</li>
          <li>Missing references</li>
          <li>Ignoring donor requirements</li>
          <li>Late submissions</li>
        </ul>
      </section>

      <section className="rounded-xl border p-6">
        <h3 className="mb-4 text-lg font-semibold">3. Evaluation Criteria</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Innovation</li>
          <li>Impact</li>
          <li>Feasibility</li>
          <li>Budget Justification</li>
          <li>Research Quality</li>
          <li>Team Capacity</li>
        </ul>
      </section>

      <section className="rounded-xl border p-6">
        <h3 className="mb-4 text-lg font-semibold">4. Submission Checklist</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Proposal Document (PDF/DOCX)</li>
          <li>Budget Sheet</li>
          <li>CV of Principal Investigator</li>
          <li>Institution Letter</li>
          <li>Ethics Approval (if applicable)</li>
          <li>Supporting Documents</li>
        </ul>
      </section>
    </div>
  );
}