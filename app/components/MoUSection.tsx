import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function MoUSection() {
  const t = await getTranslations("mou");

  const tankPoints = Array.from({ length: 6 }, (_, i) => t(`tank${i}` as any));

  return (
    <section className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
            <Image src="/images/plantation-row.jpeg" alt="Green Ring Bengaluru plantation" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-green-400 text-sm font-semibold mb-1">{t("greenRingLabel")}</p>
              <h3 className="text-white text-2xl font-bold mb-2">{t("greenRingHeading")}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{t("greenRingDesc")}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">💧</div>
              <div>
                <p className="text-blue-700 text-xs font-semibold uppercase tracking-wide">{t("tankLabel")}</p>
                <h3 className="text-gray-900 font-bold text-lg">{t("tankHeading")}</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{t("tankDesc")}</p>
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
