import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VolunteerForm from "@/app/components/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer — Dhare Foundation",
  description:
    "Join Dhare Foundation as a green volunteer. Help us plant native saplings, create Miyawaki forests, and restore Karnataka's ecology.",
};

const highlights = [
  { icon: "🌱", text: "Participate in plantation drives" },
  { icon: "📸", text: "Document biodiversity & field work" },
  { icon: "🤝", text: "Community outreach & awareness" },
  { icon: "💧", text: "Tank rejuvenation activities" },
  { icon: "🌳", text: "Sapling care & site monitoring" },
  { icon: "📢", text: "School & college programs" },
];

export default function VolunteerPage() {
  return (
    <>
      {/* Top nav strip */}
      <div className="bg-green-900 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <span className="text-white/30 text-sm">·</span>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/dhare-logo.jpeg"
              alt="Dhare Foundation"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-white text-sm font-semibold">Dhare Foundation</span>
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Left: info panel */}
            <div className="lg:col-span-2">
              <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">
                Join the Movement
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Become a Green Volunteer
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Dhare Foundation welcomes citizens, students, professionals, families, and community groups to
                participate in plantation and ecological restoration activities across Karnataka.
              </p>

              {/* Image */}
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden shadow mb-6">
                <Image
                  src="/images/dhare-volunteer.jpg"
                  alt="Dhare Foundation volunteer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-medium">
                    Dhare Foundation volunteer — Green Ring Bengaluru
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <p className="text-gray-800 font-semibold text-sm mb-3">Volunteers help with:</p>
                <div className="space-y-2">
                  {highlights.map((h) => (
                    <div key={h.text} className="flex items-center gap-2.5">
                      <span className="text-lg">{h.icon}</span>
                      <span className="text-sm text-gray-700">{h.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: form card */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Volunteer Registration</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Fields marked with <span className="text-red-500">*</span> are required.
                  </p>
                </div>
                <VolunteerForm />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer strip */}
      <div className="bg-gray-900 py-5 px-4 text-center">
        <p className="text-gray-400 text-xs">
          © 2026 Dhare Foundation · Plant. Protect. Recharge. Restore.
        </p>
      </div>
    </>
  );
}
