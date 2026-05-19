import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Board of Directors — Dhare Foundation",
  description:
    "Meet the Board of Directors of Dhare Foundation working to restore Karnataka's ecology through native plantation and Miyawaki forests.",
};

const directors = [
  {
    name: "D. M. Purnesh",
    title: "Chairman & Managing Director",
    image: "/images/team/Purnesh.jpg",
    bio: [
      "A fourth-generation coffee planter from Chikmagalur, Karnataka. Chairman & Managing Director of the Classic Group of Companies, known for its premium Indian coffees. Leads Harley Estate, a historic plantation in the Sakleshpur–Manjarabad region, producing award-winning Arabica and Robusta coffees across nearly 500 acres.",
      "He has played a key role in shaping India's speciality coffee sector through his involvement with the Speciality Coffee Association of India for over 25 years, and has served as Board of Director in Coffee Board of India.",
      "Currently a Member of the Board of Governors at the Indian Institute of Plantation Management, Bangalore — an autonomous institute under the Ministry of Commerce and Industry, Government of Bharat. Beyond plantations, he has been actively involved in strategic land development and real estate, with notable projects such as Classic Orchards on Bannerghatta Road and Brigade Orchards in Devanahalli.",
    ],
  },
  {
    name: "Vrushanka Bhat",
    title: "Director",
    image: "/images/team/VrushankaBhat.jpg",
    bio: [
      "A Bengaluru-based journalist, author, poet, socio-cultural and environmental activist known for consistent work in media, literature, and public discourse. Actively involved in editorial leadership, content strategy, interviews, and digital storytelling across print and online platforms.",
      "His work focuses on social issues, culture, civic awareness, environmental awareness, and regional narratives — reaching wide audiences through articles, videos, and public programs. He has collaborated with writers, artists, community organisations, and sustainability-oriented initiatives, contributing to discussions that connect heritage, contemporary society, ecological responsibility, and grassroots voices while strengthening Kannada media presence and cultural engagement across multiple communication platforms.",
    ],
  },
  {
    name: "Ashok K. M. Gowda",
    title: "Director",
    image: "/images/team/AshokGowda.jpg",
    bio: [
      "A qualified architect with a deep passion for education. Leads Dera Ne Institution under the Ekam Group of Companies, which includes both CBSE and IGCSE schools, and is also associated with EKAM Healthcare Institutions that cater to Nursing, Physiotherapy, and Allied Sciences.",
      "He actively serves the community through the initiatives of the Dhare Foundation, focusing on environmentally conscious development such as large-scale tree plantations and other ecological efforts. His work extends extensively across social and environmental domains, reflecting a strong commitment to sustainable and community-oriented progress.",
    ],
  },
];

export default function TeamPage() {
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
          <span className="text-white/30">·</span>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logos/dhare-logo-new.png" alt="Dhare Foundation" width={28} height={28} className="rounded-full" />
            <span className="text-white text-sm font-semibold">Dhare Foundation</span>
          </Link>
        </div>
      </div>

      <main className="min-h-screen bg-stone-50">
        {/* Hero */}
        <div className="bg-green-900 py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">The People Behind the Mission</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Team</h1>
            <p className="text-green-200 leading-relaxed">
              Dhare Foundation is led by a dedicated team bringing together expertise in agriculture,
              media, education, and environmental conservation to drive Karnataka's ecological restoration mission.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h2 id="directors" className="text-2xl font-bold text-gray-900 mb-7 pb-3 border-b border-gray-200">
            Board of Directors
          </h2>
          <div className="space-y-10">
          {directors.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                {/* Photo panel */}
                <div className="relative bg-green-800 flex items-center justify-center">
                  <div className="relative w-full h-64 sm:h-full min-h-[260px]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 220px"
                    />
                  </div>
                </div>

                {/* Bio panel */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{d.name}</h2>
                  <span className="inline-block mt-1 mb-4 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {d.title}
                  </span>
                  <div className="space-y-3">
                    {d.bio.map((para, j) => (
                      <p key={j} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </main>

      <div className="bg-gray-900 py-5 px-4 text-center">
        <p className="text-gray-400 text-xs">© 2026 Dhare Foundation · Plant. Protect. Recharge. Restore.</p>
      </div>
    </>
  );
}
