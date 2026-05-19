const reasons = [
  {
    number: "1",
    title: "Oxygen Production & Carbon Sequestration",
    desc: "Through photosynthesis, trees absorb carbon dioxide (CO₂) and release oxygen (O₂). A mature tree can absorb approximately 20–25 kg of CO₂ per year, reducing greenhouse gases and mitigating climate change.",
  },
  {
    number: "2",
    title: "Air Purification & Dust Capture",
    desc: "Tree leaves trap particulate matter (PM2.5, PM10), heavy metals, and pollutants like nitrogen oxides (NOx) and sulfur dioxide (SO₂). Urban trees can reduce airborne dust levels by 30–60% in dense corridors.",
  },
  {
    number: "3",
    title: "Temperature Regulation & Urban Heat Island Control",
    desc: "Trees provide shade and cool the atmosphere through evapotranspiration, lowering surrounding temperatures by 2–8°C in urban areas and significantly reducing heat stress.",
  },
  {
    number: "4",
    title: "Groundwater Recharge & Hydrological Balance",
    desc: "Tree roots enhance soil infiltration capacity, allowing rainwater to percolate into aquifers. Forested areas can increase groundwater recharge by 15–40% compared to barren land.",
  },
  {
    number: "5",
    title: "Soil Fertility & Microbial Health",
    desc: "Leaf litter decomposes into organic matter (humus), improving soil carbon content and supporting beneficial microbes, fungi (mycorrhizae), and nutrient cycling.",
  },
  {
    number: "6",
    title: "Biodiversity Support (Flora & Fauna Habitat)",
    desc: "A single/group of trees can host hundreds of species of insects, birds, fungi, lichens, and microorganisms, forming the foundation of local food webs and ecological stability.",
  },
  {
    number: "7",
    title: "Climate Regulation & Rainfall Patterns",
    desc: "Large forest systems influence regional rainfall through moisture recycling and atmospheric moisture transport. Forest loss is directly linked to reduced monsoon reliability.",
  },
  {
    number: "8",
    title: "Noise Reduction & Psychological Well-being",
    desc: "Green belts can reduce urban noise levels by 5–10 decibels. Exposure to trees is scientifically linked with lower cortisol (stress hormone), improved attention, and better mental health.",
  },
];

export default function WhyTreesSection() {
  return (
    <section id="why-trees" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">The Science</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why do we need TREES?</h2>
          <p className="text-gray-600 leading-relaxed">
            Trees are not decoration — they are the foundation of life, climate, and ecological balance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div key={r.number} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{r.number}</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">{r.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
