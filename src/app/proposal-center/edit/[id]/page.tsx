// // import ProposalForm from "@/components/proposal/ProposalForm";

// // interface Props {
// //   params: Promise<{
// //     id: string;
// //   }>;
// // }

// // export default async function EditProposalPage({
// //   params,
// // }: Props) {
// //   const { id } = await params;

// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/proposals/${id}`,
// //     {
// //       cache: "no-store",
// //     }
// //   );

// //   const data = await res.json();

// //   if (!data.success) {
// //     return (
// //       <main className="mx-auto max-w-4xl p-8">
// //         <h1 className="text-3xl font-bold">
// //           Proposal Not Found
// //         </h1>

// //         <p className="mt-4 text-gray-500">
// //           The requested proposal could not be found.
// //         </p>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="mx-auto max-w-6xl py-10 px-6">
// //       <h1 className="mb-8 text-4xl font-bold">
// //         Edit Proposal
// //       </h1>

// //       <ProposalForm
// //         proposal={data.proposal}
// //         isEdit={true}
// //       />
// //     </main>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import toast from "react-hot-toast";

// export default function EditProposalPage() {
//   const router = useRouter();
//   const params = useParams();

//   const id = params.id as string;

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     funding: "",
//     description: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     cnic: "",
//     organization: "",
//     country: "",
//     website: "",
//     role: "",
//     submissionType: "",
//     status: "",
//   });

//   useEffect(() => {
//     async function loadProposal() {
//       try {
//         const res = await fetch(`/api/proposals/${id}`);

//         const data = await res.json();

//         if (!data.success) {
//           toast.error(data.message);
//           router.push("/proposal-center/history");
//           return;
//         }

//         setForm(data.proposal);
//       } catch {
//         toast.error("Failed to load proposal.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProposal();
//   }, [id, router]);

//   function handleChange(
//     e: React.ChangeEvent<
//       HTMLInputElement |
//       HTMLTextAreaElement |
//       HTMLSelectElement
//     >
//   ) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     setSaving(true);

//     try {
//       const res = await fetch(
//         `/api/proposals/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type":
//               "application/json",
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.message);
//         return;
//       }

//       toast.success(
//         "Proposal updated successfully."
//       );

//       router.push(
//         "/proposal-center/history"
//       );

//       router.refresh();

//     } catch {
//       toast.error("Update failed.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         Loading...
//       </div>
//     );
//   }

//   if (form.status !== "Pending") {
//     return (
//       <div className="mx-auto max-w-2xl py-20 text-center">
//         <h1 className="text-3xl font-bold">
//           Proposal Locked
//         </h1>

//         <p className="mt-4 text-gray-600">
//           Only pending proposals can be edited.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <main className="mx-auto max-w-5xl p-6">

//       <h1 className="mb-8 text-4xl font-bold">
//         Edit Proposal
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6"
//       >
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <input
//           name="funding"
//           value={form.funding}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <textarea
//           rows={6}
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <input
//           name="fullName"
//           value={form.fullName}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <input
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <input
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <input
//           name="organization"
//           value={form.organization}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />

//         <button
//           disabled={saving}
//           className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
//         >
//           {saving
//             ? "Saving..."
//             : "Update Proposal"}
//         </button>

//       </form>

//     </main>
//   );
// }
import ProposalForm from "@/components/proposal/ProposalForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProposalPage({
  params,
}: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/proposals/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!data.success) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-3xl font-bold">
          Proposal Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Proposal
      </h1>

      <ProposalForm
        proposal={data.proposal}
        isEdit
      />
    </main>
  );
}