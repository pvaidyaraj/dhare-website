import Image from "next/image";

const useCases = [
  { icon: "🏫", label: "School & College Campuses" },
  { icon: "🛣️", label: "Roadside & Avenue Planting" },
  { icon: "💧", label: "Tank Bunds & Lake Shores" },
  { icon: "🏛️", label: "Government & Public Land" },
  { icon: "🏘️", label: "Residential Layouts" },
  { icon: "🌾", label: "Agricultural Boundaries" },
];

const steps = [
  { step: "01", title: "Site Assessment", desc: "Identify land type, soil condition, sunlight, and water availability." },
  { step: "02", title: "Species Selection", desc: "Choose native species suited to the local ecology — trees that birds, butterflies, and insects rely on." },
  { step: "03", title: "Soil Preparation", desc: "Dig pits, enrich soil with compost and organic matter for healthy root growth." },
  { step: "04", title: "Plantation", desc: "Plant saplings with correct spacing for canopy development over time." },
  { step: "05", title: "Watering & Care", desc: "Regular watering for the first two summers is critical for survival." },
  { step: "06", title: "Monitoring", desc: "GPS-tagged sites are monitored for survival rate, growth, and long-term health." },
];

export default function TraditionalPlantationSection() {
  return (
    <section id="traditional-plantation" className="py-8 sm:py-10 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">Large-Scale Greening</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Traditional Plantation</h2>
          <p className="text-gray-600 leading-relaxed">
            Alongside Miyawaki forests, Dhare Foundation conducts large-scale traditional native plantation across open land,
            institutional campuses, roadsides, and tank bunds — covering more ground with carefully chosen native species.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Image */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/plantation-row.jpeg"
              alt="Row of native saplings at a Dhare Foundation traditional plantation site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <p className="text-white text-sm font-medium">Native sapling row plantation — Karnataka</p>
            </div>
          </div>

          {/* Use cases */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Where We Plant</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {useCases.map((u) => (
                <div key={u.label} className="flex items-center gap-2.5 bg-white border border-green-100 rounded-xl px-3 py-2.5">
                  <span className="text-xl">{u.icon}</span>
                  <span className="text-sm font-medium text-green-800">{u.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-800 text-white rounded-2xl p-5">
              <p className="font-bold text-base mb-2">Why Native Species?</p>
              <p className="text-green-100 text-sm leading-relaxed">
                Native trees have co-evolved with local birds, insects, and soil organisms over thousands of years.
                They provide the right food, nesting materials, and habitat that exotic ornamental trees cannot.
                Native plantations create real ecological value — not just green cover.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-step process */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.step} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4">
                <span className="text-2xl font-bold text-green-200 shrink-0 leading-none">{s.step}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
