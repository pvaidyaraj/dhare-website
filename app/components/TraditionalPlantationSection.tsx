import Image from "next/image";
import { getTranslations } from "next-intl/server";

const useCaseIcons = ["🏫", "🛣️", "💧", "🏛️", "🏘️", "🌾"];

export default async function TraditionalPlantationSection() {
  const t = await getTranslations("traditional");

  const useCases = useCaseIcons.map((icon, i) => ({ icon, label: t(`useCase${i}` as any) }));
  const steps = Array.from({ length: 6 }, (_, i) => ({
    step: t(`step${i}Step` as any),
    title: t(`step${i}Title` as any),
    desc: t(`step${i}Desc` as any),
  }));

  return (
    <section id="traditional-plantation" className="py-8 sm:py-10 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/plantation-row.jpeg"
              alt="Row of native saplings at a Dhare Foundation traditional plantation site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <p className="text-white text-sm font-medium">{t("imageCaption")}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t("whereWePlant")}</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {useCases.map((u) => (
                <div key={u.label} className="flex items-center gap-2.5 bg-white border border-green-100 rounded-xl px-3 py-2.5">
                  <span className="text-xl">{u.icon}</span>
                  <span className="text-sm font-medium text-green-800">{u.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-800 text-white rounded-2xl p-5">
              <p className="font-bold text-base mb-2">{t("whyNativeTitle")}</p>
              <p className="text-green-100 text-sm leading-relaxed">{t("whyNativeDesc")}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">{t("howItWorks")}</h3>
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
