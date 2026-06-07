"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

const aboutSubmenu = [{ href: "/team", label: "ourTeam" as const }];

export default function Navbar() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const navLinks = [
    { href: "#about", labelKey: "about" as const, submenu: aboutSubmenu },
    { href: "#green-ring", labelKey: "greenRing" as const },
    { href: "#projects", labelKey: "ourWork" as const },
    { href: "#gallery", labelKey: "gallery" as const },
    { href: "#media", labelKey: "media" as const },
    { href: "#donate", labelKey: "donate" as const },
    { href: "#volunteer", labelKey: "volunteer" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logos/dhare-logo-3.png"
              alt="Dhare Foundation"
              width={56}
              height={56}
              className="object-contain shrink-0"
              priority
            />
            <div>
              <p className="text-base sm:text-xl font-bold text-green-900 leading-tight">DHARE</p>
              <p className="text-[11px] sm:text-sm text-green-700 leading-tight font-medium tracking-wide">FOUNDATION</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {t(link.labelKey)}
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  {aboutOpen && (
                    <div className="absolute top-full left-0 w-44 pt-1 z-50">
                      <div className="bg-white border border-gray-100 rounded-xl shadow-lg py-1.5">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                          >
                            {t(sub.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              )
            )}
          </div>

          {/* CTA + LocaleSwitcher + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#donate"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-full hover:bg-green-800 transition-colors"
            >
              {t("donateNow")}
            </a>
            <div className="hidden md:block">
              <LocaleSwitcher />
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-green-100 py-3 space-y-1">
            <div>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
              >
                {t("about")}
              </a>
              <div className="ml-5 mt-1 space-y-1 border-l-2 border-green-100 pl-3">
                <Link
                  href="/team"
                  onClick={() => setMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors"
                >
                  {t("ourTeam")}
                </Link>
              </div>
            </div>
            {navLinks.filter((l) => !l.submenu).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <div className="pt-2 px-3 flex flex-col gap-2">
              <a
                href="#donate"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-full hover:bg-green-800 transition-colors"
              >
                {t("donateNow")}
              </a>
              <div className="flex justify-end">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
