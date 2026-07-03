// export const NAV_ITEMS = [
//     { label: "Home", href: "/" },
//     { label: "Funding Opportunities", href: "/fundingOpportunities" },
//     { label: "Funding Agencies", href: "/agencies" },
//     { label: "Proposal Center", href: "/proposalCenter" },
//     { label: "Training Academy", href: "/trainingAcademy" },
//     { label: "Membership", href: "/membership" },
//     { label: "Contact", href: "/contact" },
//   ];

// {
//     title: "Proposal History",
//     href: "/proposalCenter/history",
//   }


export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Funding Opportunities", href: "/fundingOpportunities" },
    { label: "Funding Agencies", href: "/agencies" },
    { 
      label: "Proposal Center", 
      href: "/proposalCenter",
      subItems: [
        { label: "Proposal History", href: "/proposalCenter/history" }
      ]
    },
    { label: "Training Academy", href: "/trainingAcademy" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ];