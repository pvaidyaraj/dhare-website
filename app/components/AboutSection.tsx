import Image from "next/image";
import { getTranslations } from "next-intl/server";

const pillarIcons = ["🌳", "🌲", "🦋", "💧", "🏞️", "🤝"];

export default async function AboutSection() {
  const t = await getTranslations("about");

  const pillars = pillarIcons.map((icon, i) => ({ icon, label: t(`pillar${i}` as any) }));

  return (
    <section id="about" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">{t("label")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">{t("heading")}</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-3">{t("para1")}</p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("para2Start")} <strong className="text-green-800">{t("greenRing")}</strong>
                {t("para2Mid")} <strong>{t("2crore")}</strong> {t("para2And")} <strong>{t("3crore")}</strong>{" "}
                {t("para2End")} <strong>{t("5crore")}</strong>{t("para2Planted")}{" "}
                <strong className="text-green-800">{t("25k")}</strong> {t("para2Final")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pillars.map((p) => (
                  <div key={p.label} className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-sm font-medium text-green-800">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-5 py-4 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white text-lg">
                🤝
              </div>
              <div>
                <p className="text-green-700 text-xs font-semibold uppercase tracking-widest mb-0.5">{t("partnershipLabel")}</p>
                <p className="text-gray-800 text-sm font-semibold leading-snug">{t("partnershipTitle")}</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[400px]">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/gallery/community-volunteer.jpeg"
                alt="Community member with native sapling"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
