import Image from "next/image";

const outcomes = [
  "Urban biodiversity spaces",
  "Dense Miyawaki forests",
  "Green buffers against dust and pollution",
  "Cooler microclimates",
  "Natural rainwater absorption zones",
  "Habitats for birds, insects, bees, and butterflies",
  "Community-led ecological awareness",
];

export default function GreenRingSection() {
  return (
    <section id="green-ring" className="py-16 sm:py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-200 rounded-full px-4 py-1.5 mb-5">
              <span className="text-green-800 text-sm font-bold">Flagship Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Green Ring Bengaluru
            </h2>
            <p className="text-2xl font-semibold text-green-700 mb-5">
              2 Crore Saplings for Bengaluru's Ecological Future
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Bengaluru is expanding rapidly. Construction, traffic, concrete surfaces, dust pollution, shrinking open
              spaces, and loss of native vegetation have created serious pressure on the city's environment.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              The Green Ring Bengaluru initiative aims to create a <strong className="text-green-800">green ecological belt</strong> in
              and around Bengaluru by planting <strong className="text-green-800">2 crore native saplings</strong>, helping create:
            </p>
            <div className="space-y-2 mb-8">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images stacked */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg col-span-2">
              <Image
                src="/images/aerial-canopy.jpeg"
                alt="Aerial view of Miyawaki canopy"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <p className="text-white text-xs font-medium">Miyawaki Forest — Bengaluru region</p>
              </div>
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow">
              <Image
                src="/images/soil-preparation.jpeg"
                alt="Soil preparation for plantation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow">
              <Image
                src="/images/miyawaki-sign.jpeg"
                alt="Miyawaki Forest signboard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
