import Image from "next/image";

const miyawakiPoints = [
  "Birds, butterflies, bees, insects",
  "Pollinators & small reptiles",
  "Soil microbes & native plants",
  "Fungi and decomposers",
];

const miyawakiBenefits = [
  { icon: "💧", title: "Groundwater Recharge", desc: "Tree roots loosen soil; leaf litter improves organic matter. Forests act as natural sponges." },
  { icon: "🌬️", title: "Urban Pollution Buffer", desc: "Dense native forests trap dust, reduce PM2.5/PM10, lower heat and improve local microclimate." },
  { icon: "🦋", title: "Biodiversity Islands", desc: "Multi-layered native forests become habitats for birds, butterflies, insects, and soil life in cities." },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Miyawaki Forests?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Small spaces. Dense forests. Big ecological impact. The Miyawaki method creates fast-growing,
            multi-layered forests using local species — bringing back lost habitats into urban and semi-urban spaces.
          </p>
        </div>

        {/* Miyawaki Forest — image + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-7">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/images/miyawaki-sign.jpeg"
              alt="Miyawaki Forest at Canaan — 530 trees by Dhare Foundation"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-green-700 text-sm font-semibold">Miyawaki & Biodiversity</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A Living Home for Many Species
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              A Miyawaki forest becomes a living home for many species. Dense native vegetation gives food, shade,
              nesting space, moisture, and protection. Over time, these forests become small biodiversity islands inside cities.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {miyawakiPoints.map((pt) => (
                <div key={pt} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                  <span className="text-green-600 font-bold text-sm">✦</span>
                  <span className="text-sm text-green-800 font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {miyawakiBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Urban biodiversity danger callout */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-7">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-3">The Crisis</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Urban Biodiversity Is in Danger
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Urban areas are becoming increasingly difficult for biodiversity to survive. When insects disappear, birds
              lose food. When pollinators disappear, plants suffer. When native plants vanish, the entire local food
              chain becomes weak.
            </p>
            <p className="text-gray-800 font-semibold text-lg">
              "Biodiversity is not decoration. It is the foundation of life."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
