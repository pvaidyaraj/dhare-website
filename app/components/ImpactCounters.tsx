type Counter = {
  label: string;
  target: string;
  current: string;
  description: string;
  icon: string;
};

const counters: Counter[] = [
  {
    label: "Total Saplings Target",
    target: "5,00,00,000",
    current: "Growing",
    description: "Across all of Karnataka",
    icon: "🌳",
  },
  {
    label: "Green Ring Bengaluru",
    target: "2,00,00,000",
    current: "Active",
    description: "In & around Bengaluru",
    icon: "🌿",
  },
  {
    label: "Rest of Karnataka",
    target: "3,00,00,000",
    current: "Expanding",
    description: "Across Karnataka's districts",
    icon: "🌱",
  },
];

export default function ImpactCounters() {
  return (
    <section className="bg-green-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-green-300 text-sm font-semibold uppercase tracking-widest mb-8">
          Our Impact Goal
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {counters.map((counter) => (
            <div
              key={counter.label}
              className="bg-green-800/50 border border-green-700 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{counter.icon}</div>
              <p className="text-green-300 text-sm font-medium mb-1">{counter.label}</p>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{counter.target}</p>
              <p className="text-green-400 text-xs">{counter.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
