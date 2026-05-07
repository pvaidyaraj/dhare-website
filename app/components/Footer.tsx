import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#green-ring", label: "Green Ring Bengaluru" },
  { href: "#work", label: "Miyawaki Forests" },
  { href: "#gallery", label: "Gallery" },
  { href: "#donate", label: "Donate" },
  { href: "#volunteer", label: "Volunteer" },
];

const legalLinks = [
  "80G Certificate",
  "PAN",
  "CSR Registration",
  "NGO Darpan",
  "KSLSA MoU",
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/dhare-logo.jpeg"
                alt="Dhare Foundation"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-white font-bold">DHARE FOUNDATION</p>
                <p className="text-green-400 text-xs">Plant. Protect. Recharge. Restore.</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-5">
              Working to plant 5 crore native saplings across Karnataka through native plantation, Miyawaki forests,
              biodiversity conservation, groundwater recharge, and tank rejuvenation.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xs">In partnership with</span>
              <span className="text-white text-xs font-semibold">Karnataka State Legal Services Authority</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Documents</p>
            <ul className="space-y-2">
              {legalLinks.map((doc) => (
                <li key={doc}>
                  <span className="text-gray-400 hover:text-green-400 text-sm transition-colors cursor-pointer">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-white font-semibold text-sm mb-2">Volunteer Registration</p>
              <Link href="/volunteer" className="text-green-400 hover:text-green-300 text-sm transition-colors">
                Register Here →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 Dhare Foundation. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Creating Green, Living, Biodiverse Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
}
