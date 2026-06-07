import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function WorkSection() {
  const t = await getTranslations("work");

  const miyawakiPoints = Array.from({ length: 4 }, (_, i) => t(`point${i}` as any));
  const miyawakiBenefits = Array.from({ length: 3 }, (_, i) => ({
    icon: t(`benefit${i}Icon` as any),
    title: t(`benefit${i}Title` as any),
    desc: t(`benefit${i}Desc` as any),
  }));

  return (
    <section id="work" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-7">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image src="/images/miyawaki-sign.jpeg" alt="Miyawaki Forest at Canaan — 530 trees by Dhare Foundation" fill className="object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-green-700 text-sm font-semibold">{t("miyawakiBadge")}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("miyawakiHeading")}</h3>
            <p className="text-gray-600 leading-relaxed mb-5">{t("miyawakiDesc")}</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {miyawakiBenefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-7">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("crisisLabel")}</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("crisisHeading")}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{t("crisisDesc")}</p>
            <p className="text-gray-800 font-semibold text-lg">{t("crisisQuote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
