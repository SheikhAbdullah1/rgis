import Link from "next/link";
// import { NAV_ITEMS } from "./../src/constants/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-xl font-bold">RGIS</h1>

        {/* <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </div> */}
<div className="flex gap-6"> 
  <a href="/">Home</a> 
  <a href="/fundingOpportunities"> Funding </a> 
  <a href="/proposalCenter"> Proposal Center </a> 
  <a href="/trainingAcademy"> Academy </a> 
  <a href="/membership"> Membership </a> 
  <a href="/contact"> Contact </a>


        {/* <div className="flex gap-3"> */}
          <button className="px-4 py-2 border rounded-md">
            Login
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Register
          </button>
        </div>

      </div>
    </nav>
  );
}