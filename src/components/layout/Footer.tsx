import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">RGIS</h2>
          <p className="text-slate-400">
            Research Grant Intelligence System helps researchers,
            universities and startups discover global funding
            opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-slate-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/funding-opportunities">Funding</Link></li>
            <li><Link href="/proposal-center">Proposal Center</Link></li>
            <li><Link href="/training-academy">Academy</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>

          <ul className="space-y-2 text-slate-400">
            <li>Grant Discovery</li>
            <li>AI Matching</li>
            <li>Proposal Writing</li>
            <li>Training Programs</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <ul className="space-y-2 text-slate-400">
            <li>Email: info@rgis.org</li>
            <li>Phone: +92 300 1234567</li>
            <li>Pakistan</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 RGIS. All Rights Reserved.
      </div>
    </footer>
  );
}