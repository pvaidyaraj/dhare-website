import Image from "next/image";

const projects = [
  {
    title: "EKAM Edify School (2021)",
    detail: "Inaugurated by MP A. Narayanaswamy and retired IAS Madan Gopal",
    color: "border-green-600",
    badge: "bg-green-700",
  },
  {
    title: "NAAC Bengaluru (2021)",
    detail: "Inaugurated by Education Minister B.C. Nagesh (3,000 saplings)",
    color: "border-green-600",
    badge: "bg-green-700",
  },
  {
    title: "Govt ITI Davanagere (2023)",
    detail: "Community leaders and spiritual dignitaries present (1,000 saplings)",
    color: "border-green-600",
    badge: "bg-green-700",
  },
  {
    title: "Devagiri Farms (2022–24)",
    detail: "10,000+ saplings grown into dense green cover",
    color: "border-green-600",
    badge: "bg-green-700",
  },
  {
    title: "PPISR Institute (2023)",
    detail: "Shri Ishapriya Thirtha Swamiji inaugurated the plantation drive (1,500 saplings)",
    color: "border-green-600",
    badge: "bg-green-700",
  },
  {
    title: "Mandya Rural Project (2025)",
    detail: "2,000 fruit saplings for village self-reliance",
    color: "border-green-600",
    badge: "bg-green-700",
  },
];

export default function MajorProjectsSection() {
  return (
    <section id="projects" className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">On the Ground</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Major Projects & Impact Locations</h2>
          <p className="text-gray-600 leading-relaxed">
            Real sites, real trees, and real ecological impact — across schools, farms, institutions, and rural communities throughout Karnataka.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map((p) => (
            <div key={p.title} className={`bg-green-700 rounded-2xl p-5 text-white`}>
              <h3 className="font-bold text-base mb-2 leading-snug">{p.title}</h3>
              <p className="text-green-100 text-sm leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="bg-green-900 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-80">
              <Image
                src="/images/before-dhare.jpg"
                alt="Bare land before plantation — soil preparation in progress"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-5">
                <p className="text-white font-semibold text-sm">Before: Bare Land — Soil Preparation</p>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src="/images/green-cover.jpg"
                alt="Dense green cover after plantation — transformation after 18 months"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-5">
                <p className="text-white font-semibold text-sm">After 18 Months: Dense Native Forest</p>
              </div>
            </div>
          </div>
          <div className="p-6 text-center">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">The Transformation</p>
            <p className="text-white font-bold text-xl mb-1">Bare Land → Living Forest in 18 Months</p>
            <p className="text-green-200 text-sm">The Miyawaki method creates fast-growing, multi-layered native forests that become real habitats far sooner than conventional planting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
