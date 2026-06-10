"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const mediaSrcs = [
  { src: "/images/media-coverage/NSFelicitation.jpg", captionKey: "caption0" },
  { src: "/images/media-coverage/media1.jpg", captionKey: null },
  { src: "/images/media-coverage/media2.jpg", captionKey: null },
  { src: "/images/media-coverage/media3.jpg", captionKey: null },
  { src: "/images/media-coverage/media4.jpg", captionKey: null },
  { src: "/images/media-coverage/media5.jpg", captionKey: null },
  { src: "/images/media-coverage/media6.jpg", captionKey: null },
  { src: "/images/media-coverage/media7.jpg", captionKey: null },
  { src: "/images/media-coverage/media8.jpg", captionKey: null },
  { src: "/images/media-coverage/media9.jpg", captionKey: null },
];

export default function MediaCoverageSection() {
  const t = useTranslations("media");
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = mediaSrcs.length;

  const mediaItems = mediaSrcs.map((m, i) => ({
    src: m.src,
    alt: `Dhare Foundation media coverage ${i + 1}`,
    caption: m.captionKey ? t(m.captionKey as any) : "",
  }));

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (lightbox !== null) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, lightbox]);

  const getVisible = () => [0, 1, 2].map((offset) => (current + offset) % total);

  return (
    <section id="media" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t("heading")}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{t("desc")}</p>
        </div>

        <div className="relative">
          <div className="hidden sm:grid grid-cols-3 gap-4">
            {getVisible().map((idx) => (
              <button
                key={`${idx}-${current}`}
                onClick={() => setLightbox(idx)}
                className="group relative rounded-xl overflow-hidden shadow border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ aspectRatio: "4/3" }}
                aria-label={`View ${mediaItems[idx].alt}`}
              >
                <Image src={mediaItems[idx].src} alt={mediaItems[idx].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setLightbox(current)}
              className="relative w-full rounded-xl overflow-hidden shadow border border-gray-100 bg-white focus:outline-none"
              style={{ aspectRatio: "4/3" }}
              aria-label={`View ${mediaItems[current].alt}`}
            >
              <Image src={mediaItems[current].src} alt={mediaItems[current].alt} fill className="object-contain" sizes="100vw" />
            </button>
          </div>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-5 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-colors z-10" aria-label="Previous">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-5 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-colors z-10" aria-label="Next">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {mediaItems.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-green-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white z-10" aria-label="Close">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button onClick={() => setLightbox((l) => (l! - 1 + total) % total)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white z-10" aria-label="Previous">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative max-w-3xl max-h-[85vh] w-full">
            <Image src={mediaItems[lightbox].src} alt={mediaItems[lightbox].alt} width={900} height={675} className="object-contain w-full max-h-[85vh] rounded-lg" />
            {mediaItems[lightbox].caption && (
              <p className="text-white/80 text-sm text-center mt-3 px-4 leading-relaxed">{mediaItems[lightbox].caption}</p>
            )}
            <p className="text-white/40 text-xs text-center mt-2">{lightbox + 1} / {total}</p>
          </div>
          <button onClick={() => setLightbox((l) => (l! + 1) % total)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white z-10" aria-label="Next">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
