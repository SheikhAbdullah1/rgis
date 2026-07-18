interface Props {
    status: string;
  }
  
  export default function ProposalStatus({
    status,
  }: Props) {
    let color =
      "bg-gray-100 text-gray-700";
  
    switch (status) {
      case "Pending":
        color =
          "bg-yellow-100 text-yellow-800";
        break;
  
      case "Under Review":
        color =
          "bg-blue-100 text-blue-800";
        break;
  
      case "Approved":
        color =
          "bg-green-100 text-green-800";
        break;
  
      case "Rejected":
        color =
          "bg-red-100 text-red-800";
        break;
  
      case "Revision Required":
        color =
          "bg-purple-100 text-purple-800";
        break;
    }
  
    return (
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${color}`}
      >
        {status}
      </span>
    );
  }