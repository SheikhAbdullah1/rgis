export default function AdminProposalTable() {
    const dummyProposals = [
      {
        id: "1",
        title: "AI Research Grant Proposal",
        fullName: "Ali Khan",
        role: "Researcher",
        status: "pending",
      },
      {
        id: "2",
        title: "Climate Innovation Proposal",
        fullName: "Sara Ahmed",
        role: "Student",
        status: "approved",
      },
    ];
  
    return (
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Applicant</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyProposals.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.fullName}</td>
                <td className="p-3">{p.role}</td>
                <td className="p-3">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }