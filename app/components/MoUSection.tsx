import Image from "next/image";

const tankPoints = [
  "Protection of tank surroundings",
  "Native plantation around tank bunds",
  "Prevention of soil erosion",
  "Improving groundwater recharge",
  "Creating biodiversity zones around water bodies",
  "Supporting birds, butterflies, insects, and aquatic ecosystems",
];

export default function MoUSection() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* KSLSA MoU */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">
            KSLSA – Dhare Foundation MoU
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            A Landmark Ecological Partnership for Karnataka
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Dhare Foundation has entered into a Memorandum of Understanding with the{" "}
            <strong className="text-green-800">Karnataka State Legal Services Authority</strong> to support large-scale
            ecological conservation across Karnataka — encouraging plantation, biodiversity protection, groundwater
            recharge, and environmental restoration through cooperation between institutions, local bodies, government
            departments, communities, and civil society.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Green Ring Bengaluru card */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
            <Image
              src="/images/plantation-row.jpeg"
              alt="Green Ring Bengaluru plantation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-green-400 text-sm font-semibold mb-1">Green Ring Bengaluru</p>
              <h3 className="text-white text-2xl font-bold mb-2">2 Crore Saplings for Bengaluru</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Creating a green ecological belt in and around Bengaluru with 2 crore native saplings to restore
                urban biodiversity, reduce pollution, and recharge groundwater.
              </p>
            </div>
          </div>

          {/* Tank Rejuvenation card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">💧</div>
              <div>
                <p className="text-blue-700 text-xs font-semibold uppercase tracking-wide">Tank Rejuvenation</p>
                <h3 className="text-gray-900 font-bold text-lg">Restoring Water Bodies, Recharging Groundwater</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Karnataka's tanks are ecological systems that support agriculture, groundwater recharge, birds, aquatic life,
              cattle, local communities, and surrounding vegetation. Dhare Foundation aims to support tank rejuvenation by:
            </p>
            <ul className="space-y-2">
              {tankPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
