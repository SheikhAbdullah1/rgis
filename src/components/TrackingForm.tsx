// // "use client";

// // import { useState } from "react";

// // export default function TrackingForm() {
// //   const [trackingId, setTrackingId] =
// //     useState("");

// //   const [proposal, setProposal] =
// //     useState<any>(null);

// //   const [error, setError] =
// //     useState("");

// //   // const handleSearch = async () => {
// //   //   setError("");
// //   //   setProposal(null);

// //   //   const res = await fetch(
// //   //     `/api/trackProposals?trackingId=${trackingId}`
// //   //   );
    
// //   //   const [loading, setLoading] =
// //   // useState(false);

// //   //   const data = await res.json();

// //   //   if (!data.success) {
// //   //     setError(data.message);
// //   //     return;
// //   //   }

// //   //   setProposal(data.proposal);
// //   // };
// //   const handleSearch = async () => {
// //     if (!trackingId.trim()) {
// //       setError("Please enter a tracking ID.");
// //       return;
// //     }
  
// //     setLoading(true);
// //     setError("");
// //     setProposal(null);
  
// //     try {
// //       const res = await fetch(
// //         `/api/trackProposals?trackingId=${trackingId}`
// //       );
  
// //       const data = await res.json();
  
// //       if (!data.success) {
// //         setError(data.message);
// //         return;
// //       }
  
// //       setProposal(data.proposal);
// //     } catch (err) {
// //       setError(
// //         "Something went wrong. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">

// //       <input
// //         type="text"
// //         placeholder="Enter Tracking ID"
// //         value={trackingId}
// //         onChange={(e) =>
// //           setTrackingId(e.target.value)
// //         }
// //         className="border p-3 rounded-lg w-full"
// //       />

// // <button
// //   onClick={handleSearch}
// //   disabled={loading}
// //   className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
// // >
// //   {loading
// //     ? "Searching..."
// //     : "Track Proposal"}
// // </button>

// //       {error && (
// //         <p className="text-red-500">
// //           {error}
// //         </p>
// //       )}

// //       {proposal && (
// //         <div className="border rounded-lg p-6">
// //           <h2 className="font-bold text-xl">
// //             {proposal.title}
// //           </h2>

// //           <p>
// //   Status:
// //   <span className="ml-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
// //     {proposal.status}
// //   </span>
// // </p>

// //           <p>
// //             Applicant:
// //             {" "}
// //             {proposal.fullName}
// //           </p>

// //           <p>
// //             Submitted:
// //             {" "}
// //             {new Date(
// //               proposal.createdAt
// //             ).toLocaleDateString()}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";

// export default function TrackingForm() {
//   const [trackingId, setTrackingId] =
//     useState("");

//   const [proposal, setProposal] =
//     useState<any>(null);

//   const [error, setError] =
//     useState("");

//   const handleTrack =
//     async () => {
//       setError("");
//       setProposal(null);

//       // const res = await fetch(
//       //   "/api/trackProposals",
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type":
//       //         "application/json",
//       //     },
//       //     body: JSON.stringify({
//       //       trackingId,
//       //     }),
//       //   }
//       // );
//       const res = await fetch(
//         `/api/trackProposals?trackingId=${encodeURIComponent(
//           trackingId
//         )}`
//       );
      
//       const data =
//         await res.json();

//       if (data.success) {
//         setProposal(
//           data.proposal
//         );
//       } else {
//         setError(
//           data.message
//         );
//       }
//     };

//   return (
//     <div className="mx-auto max-w-3xl rounded-xl border bg-white p-6">

//       <h2 className="mb-6 text-2xl font-bold">
//         Track Proposal
//       </h2>

//       <div className="flex gap-3">
//         <input
//           value={trackingId}
//           onChange={(e) =>
//             setTrackingId(
//               e.target.value
//             )
//           }
//           placeholder="RGIS-001"
//           className="flex-1 rounded border p-3"
//         />

//         <button
//           onClick={
//             handleTrack
//           }
//           className="rounded bg-blue-600 px-6 py-3 text-white"
//         >
//           Search
//         </button>
//       </div>

//       {error && (
//         <p className="mt-6 text-red-600">
//           {error}
//         </p>
//       )}

//       {proposal && (
//         <div className="mt-6 flex items-center gap-4">

//         <div
//           className={`rounded-full px-4 py-2 ${
//             proposal.status ===
//               "Pending"
//               ? "bg-yellow-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Pending
//         </div>
      
//         <div
//           className={`rounded-full px-4 py-2 ${
//             proposal.status ===
//               "Under Review"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Under Review
//         </div>
      
//         <div
//           className={`rounded-full px-4 py-2 ${
//             proposal.status ===
//               "Approved"
//               ? "bg-green-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Approved
//         </div>
      
//         <div
//           className={`rounded-full px-4 py-2 ${
//             proposal.status ===
//               "Rejected"
//               ? "bg-red-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Rejected
//         </div>
      
//       </div>

//         <div className="mt-8 rounded-lg border p-6">

//           <h3 className="text-xl font-bold">
//             {proposal.title}
//           </h3>

//           <p className="mt-2">
//             <strong>
//               Applicant:
//             </strong>{" "}
//             {proposal.fullName}
//           </p>

//           <p>
//             <strong>
//               Tracking ID:
//             </strong>{" "}
//             {
//               proposal.trackingId
//             }
//           </p>

//           <p>
//             <strong>
//               Status:
//             </strong>{" "}
//             {proposal.status}
//           </p>

//           <p>
//             <strong>
//               Submitted:
//             </strong>{" "}
//             {new Date(
//               proposal.createdAt
//             ).toLocaleDateString()}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import { useState } from "react";

export default function TrackingForm() {
  const [trackingId, setTrackingId] = useState("");
  const [proposal, setProposal] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added missing loading state

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID.");
      return;
    }

    setLoading(true);
    setError("");
    setProposal(null);

    try {
      const res = await fetch(
        `/api/trackProposals?trackingId=${encodeURIComponent(trackingId)}`
      );
      
      const data = await res.json();

      if (data.success) {
        setProposal(data.proposal);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Track Proposal</h2>

      <div className="flex gap-3">
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="RGIS-001"
          className="flex-1 rounded border p-3"
          disabled={loading}
        />

        <button
          onClick={handleTrack}
          disabled={loading}
          className="rounded bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="mt-6 text-red-600">{error}</p>}

      {/* ✅ Fixed: Wrapped multiple child divs inside a single React Fragment (<> ... </>) */}
      {proposal && (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                proposal.status === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                proposal.status === "Under Review"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Under Review
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                proposal.status === "Approved"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Approved
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                proposal.status === "Rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Rejected
            </div>
          </div>

          <div className="mt-8 rounded-lg border p-6">
            <h3 className="text-xl font-bold">{proposal.title}</h3>

            <p className="mt-4">
              <strong>Applicant:</strong> {proposal.fullName}
            </p>

            <p className="mt-1">
              <strong>Tracking ID:</strong> {proposal.trackingId}
            </p>

            <p className="mt-1">
              <strong>Status:</strong> {proposal.status}
            </p>

            <p className="mt-1">
              <strong>Submitted:</strong>{" "}
              {new Date(proposal.createdAt).toLocaleDateString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
}