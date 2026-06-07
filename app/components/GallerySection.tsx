"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const photoSrcs = [
  { src: "/images/dhare-team-kslsa.jpg", contain: false },
  { src: "/images/media/NSFelicitation.jpg", contain: true },
  { src: "/images/aerial-canopy.jpeg", contain: false },
  { src: "/images/aerial-forest.jpeg", contain: false },
  { src: "/images/soil-preparation.jpeg", contain: false },
  { src: "/images/plantation-row.jpeg", contain: false },
  { src: "/images/dense-forest.jpeg", contain: false },
  { src: "/images/community-volunteer.jpeg", contain: false },
];

export default function GallerySection() {
  const t = useTranslations("gallery");
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const total = photoSrcs.length;

  const photos = photoSrcs.map((p, i) => ({
    ...p,
    alt: t(`caption${i}` as any),
    caption: t(`caption${i}` as any),
  }));

  const tags = Array.from({ length: 5 }, (_, i) => t(`tag${i}` as any));

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (isDragging) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, isDragging]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsDragging(true);
  }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }
  function onTouchEnd() {
    setIsDragging(false);
    if (touchDeltaX.current < -50) next();
    else if (touchDeltaX.current > 50) prev();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  return (
    <section id="gallery" className="py-8 sm:py-10 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-7">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("heading")}</h2>
          <p className="text-gray-600 leading-relaxed">{t("desc")}</p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {photos.map((photo) => (
              <div key={photo.src} className="relative w-full shrink-0 aspect-[16/9] sm:aspect-[21/9]">
                <Image src={photo.src} alt={photo.alt} fill className={photo.contain ? "object-contain" : "object-cover"} sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <p className="text-white text-sm sm:text-base p-5 leading-snug font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center transition-colors z-10" aria-label="Previous photo">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center transition-colors z-10" aria-label="Next photo">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute top-3 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">{current + 1} / {total}</div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-green-600" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to photo ${i + 1}`} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-white border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
