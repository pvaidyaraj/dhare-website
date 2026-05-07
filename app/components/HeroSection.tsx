import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/aerial-forest.jpeg"
          alt="Dhare Foundation forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-300 text-sm font-medium">5 Crore Sapling Ecological Movement</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Creating Green, Living,
          <span className="block text-green-400 mt-1">Biodiverse Karnataka</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-4">
          Dhare Foundation is working to restore Karnataka's ecological balance through native sapling plantation,
          Miyawaki forests, biodiversity conservation, groundwater recharge, tank rejuvenation, and community participation.
        </p>
        <p className="text-base text-gray-300 max-w-2xl mx-auto mb-10 italic">
          Plant. Protect. Recharge. Restore.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            href="#volunteer"
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
          >
            Volunteer With Us
          </Link>
          <Link
            href="#donate"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-green-800 font-semibold rounded-full transition-colors text-sm sm:text-base"
          >
            Donate Now
          </Link>
          <Link
            href="#work"
            className="px-6 py-3 border-2 border-white/60 hover:border-white text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
          >
            CSR Partnership
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 text-white/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
