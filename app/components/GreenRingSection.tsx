import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function GreenRingSection() {
  const t = await getTranslations("greenRing");

  const outcomes = Array.from({ length: 7 }, (_, i) => t(`outcome${i}` as any));

  return (
    <section id="green-ring" className="py-8 sm:py-10 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-200 rounded-full px-4 py-1.5 mb-3">
              <span className="text-green-800 text-sm font-bold">{t("badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t("heading")}</h2>
            <p className="text-2xl font-semibold text-green-700 mb-3">{t("subheading")}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{t("para1")}</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t("para2Start")} <strong className="text-green-800">{t("greenBelt")}</strong>{" "}
              {t("para2Mid")} <strong className="text-green-800">{t("2crore")}</strong> {t("para2End")}
            </p>
            <div className="space-y-2 mb-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg col-span-2">
              <Image src="/images/aerial-canopy.jpeg" alt="Aerial view of Miyawaki canopy" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <p className="text-white text-xs font-medium">{t("mapCaption")}</p>
              </div>
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow">
              <Image src="/images/soil-preparation.jpeg" alt="Soil preparation for plantation" fill className="object-cover" />
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow">
              <Image src="/images/miyawaki-sign.jpeg" alt="Miyawaki Forest signboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
