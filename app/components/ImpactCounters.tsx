import { getTranslations } from "next-intl/server";

export default async function ImpactCounters() {
  const t = await getTranslations("impact");

  const counters = [
    { label: t("counter0Label"), target: "5,00,00,000", desc: t("counter0Desc"), icon: "🌳" },
    { label: t("counter1Label"), target: "2,00,00,000", desc: t("counter1Desc"), icon: "🌿" },
    { label: t("counter2Label"), target: "3,00,00,000", desc: t("counter2Desc"), icon: "🌱" },
  ];

  return (
    <section className="bg-green-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-green-300 text-sm font-semibold uppercase tracking-widest mb-8">
          {t("sectionLabel")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {counters.map((counter) => (
            <div key={counter.label} className="bg-green-800/50 border border-green-700 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{counter.icon}</div>
              <p className="text-green-300 text-sm font-medium mb-1">{counter.label}</p>
              <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 break-words">{counter.target}</p>
              <p className="text-green-400 text-xs">{counter.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
