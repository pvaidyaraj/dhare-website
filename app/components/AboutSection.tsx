import Image from "next/image";

const pillars = [
  { icon: "🌳", label: "Native Plantations" },
  { icon: "🌲", label: "Miyawaki Forests" },
  { icon: "🦋", label: "Biodiversity" },
  { icon: "💧", label: "Groundwater Recharge" },
  { icon: "🏞️", label: "Tank Rejuvenation" },
  { icon: "🤝", label: "Community Participation" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">
              About Dhare Foundation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Let Karnataka Breathe Again
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Dhare Foundation is working to restore Karnataka's ecological balance. Our mission is to create green spaces
              that are not just tree plantations, but <strong className="text-green-800">living habitats</strong> for birds, butterflies,
              bees, insects, soil organisms, and future generations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Through our flagship mission <strong className="text-green-800">Green Ring Bengaluru</strong>, Dhare Foundation
              aims to plant <strong>2 crore saplings</strong> in and around Bengaluru and <strong>3 crore saplings</strong> across the rest
              of Karnataka — making it a <strong>5 crore sapling ecological movement</strong>. So far, we have planted over <strong className="text-green-800">25,000 saplings</strong> across Karnataka.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2"
                >
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-sm font-medium text-green-800">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/community-volunteer.jpeg"
                alt="Community member with native sapling"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-green-100 max-w-[200px]">
              <p className="text-green-700 text-xs font-semibold uppercase tracking-wide mb-1">Partnership</p>
              <p className="text-gray-800 text-sm font-bold leading-tight">MoU with Karnataka State Legal Services Authority</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
