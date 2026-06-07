import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function MajorProjectsSection() {
  const t = await getTranslations("projects");

  const projects = Array.from({ length: 6 }, (_, i) => ({
    title: t(`project${i}Title` as any),
    detail: t(`project${i}Detail` as any),
  }));

  return (
    <section id="projects" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map((p) => (
            <div key={p.title} className="bg-green-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-base mb-2 leading-snug">{p.title}</h3>
              <p className="text-green-100 text-sm leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-900 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-80">
              <Image src="/images/before-dhare.jpg" alt="Bare land before plantation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-5">
                <p className="text-white font-semibold text-sm">{t("beforeLabel")}</p>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image src="/images/green-cover.jpg" alt="Dense green cover after plantation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-5">
                <p className="text-white font-semibold text-sm">{t("afterLabel")}</p>
              </div>
            </div>
          </div>
          <div className="p-6 text-center">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">{t("transformationLabel")}</p>
            <p className="text-white font-bold text-xl mb-1">{t("transformationHeading")}</p>
            <p className="text-green-200 text-sm">{t("transformationDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
