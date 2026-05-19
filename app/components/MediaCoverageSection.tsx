"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const mediaItems = [
  {
    src: "/images/media/NSFelicitation.jpg",
    alt: "Union Finance Minister Nirmala Sitharaman felicitates Dhare Foundation Director D.M. Purnesh",
    caption: "Union Finance Minister Nirmala Sitharaman recognized the achievements of Dhare Foundation and honored its Director, D.M. Purnesh, during an event held in Bangalore on August 13, 2022.",
  },
  { src: "/images/media/media1.jpg", alt: "Dhare Foundation media coverage 1", caption: "" },
  { src: "/images/media/media2.jpg", alt: "Dhare Foundation media coverage 2", caption: "" },
  { src: "/images/media/media3.jpg", alt: "Dhare Foundation media coverage 3", caption: "" },
  { src: "/images/media/media4.jpg", alt: "Dhare Foundation media coverage 4", caption: "" },
  { src: "/images/media/media5.jpg", alt: "Dhare Foundation media coverage 5", caption: "" },
  { src: "/images/media/media6.jpg", alt: "Dhare Foundation media coverage 6", caption: "" },
  { src: "/images/media/media7.jpg", alt: "Dhare Foundation media coverage 7", caption: "" },
  { src: "/images/media/media8.jpg", alt: "Dhare Foundation media coverage 8", caption: "" },
  { src: "/images/media/media9.jpg", alt: "Dhare Foundation media coverage 9", caption: "" },
];

export default function MediaCoverageSection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = mediaItems.length;

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

  // Auto-advance every 4 seconds when lightbox is closed
  useEffect(() => {
    if (lightbox !== null) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, lightbox]);

  // Show 3 slides at a time on desktop, 1 on mobile
  const getVisible = () => {
    return [0, 1, 2].map((offset) => (current + offset) % total);
  };

  return (
    <section id="media" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Press & Media</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Media Coverage</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Dhare Foundation's ecological mission covered by leading media across Karnataka.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop: 3-up carousel */}
          <div className="hidden sm:grid grid-cols-3 gap-4">
            {getVisible().map((idx) => (
              <button
                key={`${idx}-${current}`}
                onClick={() => setLightbox(idx)}
                className="group relative rounded-xl overflow-hidden shadow border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ aspectRatio: "4/3" }}
                aria-label={`View ${mediaItems[idx].alt}`}
              >
                <Image
                  src={mediaItems[idx].src}
                  alt={mediaItems[idx].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>

          {/* Mobile: single-item carousel */}
          <div className="sm:hidden">
            <button
              onClick={() => setLightbox(current)}
              className="relative w-full rounded-xl overflow-hidden shadow border border-gray-100 bg-white focus:outline-none"
              style={{ aspectRatio: "4/3" }}
              aria-label={`View ${mediaItems[current].alt}`}
            >
              <Image
                src={mediaItems[current].src}
                alt={mediaItems[current].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </button>
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-5 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-5 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${
                i === current ? "w-6 h-2 bg-green-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => setLightbox((l) => (l! - 1 + total) % total)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="relative max-w-3xl max-h-[85vh] w-full">
            <Image
              src={mediaItems[lightbox].src}
              alt={mediaItems[lightbox].alt}
              width={900}
              height={675}
              className="object-contain w-full max-h-[85vh] rounded-lg"
            />
            {mediaItems[lightbox].caption && (
              <p className="text-white/80 text-sm text-center mt-3 px-4 leading-relaxed">{mediaItems[lightbox].caption}</p>
            )}
            <p className="text-white/40 text-xs text-center mt-2">{lightbox + 1} / {total}</p>
          </div>
          <button
            onClick={() => setLightbox((l) => (l! + 1) % total)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
