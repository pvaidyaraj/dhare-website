"use client";

import { useEffect } from "react";

interface Props {
  latitude: number;
  longitude: number;
  label: string;
  onClose: () => void;
}

export default function GoogleMapModal({ latitude, longitude, label, onClose }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{latitude}, {longitude}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <iframe
          title={`Map for ${label}`}
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-700 hover:text-green-900 font-medium"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
}
