import Image from "next/image";

const counters = [
  { label: "Total Saplings Target", value: "5,00,00,000", sub: "Across all of Karnataka", icon: "🌳" },
  { label: "Green Ring Bengaluru", value: "2,00,00,000", sub: "In & around Bengaluru", icon: "🌿" },
  { label: "Rest of Karnataka", value: "3,00,00,000", sub: "Across Karnataka's districts", icon: "🌱" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/aerial-forest.jpeg"
          alt="Dhare Foundation forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-5">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0" />
          <span className="text-green-300 text-base sm:text-lg font-semibold">5 Crore Sapling Ecological Movement</span>
        </div>

        {/* Impact counters — right below badge */}
        <div className="mb-6 w-full">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Impact Goal</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {counters.map((c) => (
              <div key={c.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-4 px-3 sm:py-5 sm:px-4">
                <div className="text-2xl sm:text-3xl mb-2">{c.icon}</div>
                <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{c.value}</p>
                <p className="text-green-300 text-xs sm:text-sm font-medium mt-1.5 leading-tight">{c.label}</p>
                <p className="text-green-400/80 text-xs mt-0.5 leading-tight">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Creating Green, Living,
          <span className="block text-green-400 mt-1">Biodiverse Karnataka</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-2">
          Restoring Karnataka's ecological balance through native sapling plantation, Miyawaki forests,
          biodiversity conservation, groundwater recharge, and community participation.
        </p>
        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 italic">
          Plant. Protect. Recharge. Restore.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#volunteer"
            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-colors text-sm"
          >
            Volunteer With Us
          </a>
          <a
            href="#donate"
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-green-800 font-semibold rounded-full transition-colors text-sm"
          >
            Donate Now
          </a>
          <a
            href="#work"
            className="px-6 py-2.5 border-2 border-white/60 hover:border-white text-white font-semibold rounded-full transition-colors text-sm"
          >
            CSR Partnership
          </a>
        </div>
      </div>
    </section>
  );
}
