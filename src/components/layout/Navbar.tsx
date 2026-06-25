export default function Navbar() {
    return (
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold text-xl">
            RGIS
          </h1>
  
          <div className="flex gap-6">
            <a href="/">Home</a>
            <a href="/funding-opportunities">
              Funding
            </a>
            <a href="/proposal-center">
              Proposal Center
            </a>
            <a href="/training-academy">
              Academy
            </a>
            <a href="/membership">
              Membership
            </a>
            <a href="/contact">
              Contact
            </a>
          </div>
        </div>
      </nav>
    );
  }