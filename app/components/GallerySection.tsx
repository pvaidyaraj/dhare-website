import Image from "next/image";

const photos = [
  {
    src: "/images/aerial-canopy.jpeg",
    alt: "Aerial view of dense Miyawaki forest canopy",
    caption: "Dense native canopy from a Miyawaki forest site",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/aerial-forest.jpeg",
    alt: "Aerial view of plantation forest",
    caption: "Native saplings planted to support birds, butterflies, and pollinators",
    span: "col-span-1 row-span-2 sm:col-span-1",
  },
  {
    src: "/images/soil-preparation.jpeg",
    alt: "Workers preparing soil for Miyawaki forest",
    caption: "Soil preparation before native sapling plantation",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/plantation-row.jpeg",
    alt: "Row of native trees at plantation site",
    caption: "A row of thriving native trees at a Dhare Foundation plantation site",
    span: "col-span-1 sm:col-span-2 row-span-1",
  },
  {
    src: "/images/dense-forest.jpeg",
    alt: "Dense forest growth",
    caption: "A Miyawaki forest site — forests in the making",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/community-volunteer.jpeg",
    alt: "Community volunteer with native sapling",
    caption: "Volunteers planting native saplings under Green Ring Bengaluru",
    span: "col-span-1 row-span-1",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">Gallery</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Forests in the Making</h2>
          <p className="text-gray-600 leading-relaxed">
            From soil preparation to dense canopy — witness the transformation of bare land into living green habitats.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl bg-gray-200 h-60 sm:h-72 shadow-sm hover:shadow-lg transition-shadow"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-sm p-4 leading-snug">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Photo categories */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Plantation Drives", "Miyawaki Forests", "Volunteer Activities", "Before & After", "Biodiversity"].map((tag) => (
            <span
              key={tag}
              className="bg-white border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
