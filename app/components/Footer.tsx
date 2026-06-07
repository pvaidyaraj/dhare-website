"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type DocItem = {
  label: string;
  type: "pdf" | "image";
  src: string;
};

function DocumentModal({ doc, onClose, downloadLabel, closeLabel }: { doc: DocItem; onClose: () => void; downloadLabel: string; closeLabel: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-gray-900 font-bold text-base">{doc.label}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 bg-gray-50 max-h-[75vh] overflow-auto">
          {doc.type === "pdf" ? (
            <iframe src={doc.src} className="w-full rounded-lg border border-gray-200" style={{ height: "60vh" }} title={doc.label} />
          ) : (
            <Image src={doc.src} alt={doc.label} width={800} height={600} className="w-full h-auto rounded-lg object-contain" />
          )}
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center">
          <a href={doc.src} download className="text-green-700 hover:text-green-900 text-sm font-medium transition-colors">{downloadLabel}</a>
          <button onClick={onClose} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors">{closeLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const [activeDoc, setActiveDoc] = useState<DocItem | null>(null);

  const navLinks = [
    { href: "#about", label: t("navAbout") },
    { href: "#green-ring", label: t("navGreenRing") },
    { href: "#work", label: t("navWork") },
    { href: "#gallery", label: t("navGallery") },
    { href: "#media", label: t("navMedia") },
    { href: "#donate", label: t("navDonate") },
    { href: "#volunteer", label: t("navVolunteer") },
  ];

  const docItems: DocItem[] = [
    { label: t("doc0"), type: "pdf", src: "/documents/80G_certificate.pdf" },
    { label: t("doc1"), type: "image", src: "/documents/PAN.jpg" },
    { label: t("doc2"), type: "image", src: "/documents/csr_registration.jpg" },
    { label: t("doc3"), type: "image", src: "/documents/darpan_id.jpg" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {activeDoc && <DocumentModal doc={activeDoc} onClose={() => setActiveDoc(null)} downloadLabel={t("download")} closeLabel={t("close")} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/logos/dhare-logo-new.png" alt="Dhare Foundation" width={48} height={48} className="rounded-full" />
              <div>
                <p className="text-white font-bold">DHARE FOUNDATION</p>
                <p className="text-green-400 text-xs">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{t("desc")}</p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">{t("quickLinks")}</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-green-400 text-sm transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">{t("documents")}</p>
            <ul className="space-y-2">
              {docItems.map((doc) => (
                <li key={doc.label}>
                  <button onClick={() => setActiveDoc(doc)} className="text-gray-400 hover:text-green-400 text-sm transition-colors text-left">{doc.label}</button>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <p className="text-white font-semibold text-sm mb-2">{t("volunteerReg")}</p>
              <Link href="/volunteer" className="text-green-400 hover:text-green-300 text-sm transition-colors">{t("registerHere")}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">{t("copyright")}</p>
          <p className="text-gray-500 text-xs">{t("taglineBottom")}</p>
        </div>
      </div>
    </footer>
  );
}
