"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#green-ring", label: "Green Ring Bengaluru" },
  { href: "#work", label: "Miyawaki Forests" },
  { href: "#gallery", label: "Gallery" },
  { href: "#media", label: "Media Coverage" },
  { href: "#donate", label: "Donate" },
  { href: "#volunteer", label: "Volunteer" },
];

type DocItem = {
  label: string;
  type: "pdf" | "image";
  src: string;
};

const docItems: DocItem[] = [
  { label: "80G Certificate", type: "pdf", src: "/documents/80G_certificate.pdf" },
  { label: "PAN", type: "image", src: "/documents/PAN.jpg" },
  { label: "CSR Registration", type: "image", src: "/documents/csr_registration.jpg" },
  { label: "Darpan", type: "image", src: "/documents/darpan_id.jpg" },
];

function DocumentModal({ doc, onClose }: { doc: DocItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-gray-900 font-bold text-base">{doc.label}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 bg-gray-50 max-h-[75vh] overflow-auto">
          {doc.type === "pdf" ? (
            <iframe
              src={doc.src}
              className="w-full rounded-lg border border-gray-200"
              style={{ height: "60vh" }}
              title={doc.label}
            />
          ) : (
            <Image
              src={doc.src}
              alt={doc.label}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg object-contain"
            />
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center">
          <a
            href={doc.src}
            download
            className="text-green-700 hover:text-green-900 text-sm font-medium transition-colors"
          >
            Download ↓
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [activeDoc, setActiveDoc] = useState<DocItem | null>(null);

  return (
    <footer className="bg-gray-900 text-gray-300">
      {activeDoc && <DocumentModal doc={activeDoc} onClose={() => setActiveDoc(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logos/dhare-logo-new.png"
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
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Working to plant 5 crore native saplings across Karnataka through native plantation, Miyawaki forests,
              biodiversity conservation, groundwater recharge, and tank rejuvenation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Documents</p>
            <ul className="space-y-2">
              {docItems.map((doc) => (
                <li key={doc.label}>
                  <button
                    onClick={() => setActiveDoc(doc)}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors text-left"
                  >
                    {doc.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3">
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
