import { getTranslations } from "next-intl/server";

export default async function WhyTreesSection() {
  const t = await getTranslations("whyTrees");

  const reasons = Array.from({ length: 8 }, (_, i) => ({
    number: String(i + 1),
    title: t(`reason${i}Title` as any),
    desc: t(`reason${i}Desc` as any),
  }));

  return (
    <section id="why-trees" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
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
