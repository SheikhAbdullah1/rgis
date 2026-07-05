export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Funding Opportunities", href: "/funding-opportunities" },
    { label: "Funding Agencies", href: "//funding-agencies" },
    { 
      label: "Proposal Center", 
      href: "/proposal-center",
      subItems: [
        { label: "Proposal History", href: "/proposal-center/history" },
        { label: "Templates", href: "/proposal-center/templates" },      // ✅ missing tha, add karo
        { label: "Guidelines", href: "/proposal-center/guidelines" },    // ✅ missing tha, add karo
      ]
    },
    { label: "Training Academy", href: "/training-academy" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ];