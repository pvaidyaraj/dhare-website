"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SaplingPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClose() {
    setIsVisible(false);
    timerRef.current = setTimeout(() => setIsVisible(true), 10_000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] animate-popup-enter animate-glow-ring rounded-xl"
      style={{ width: "min(240px, calc(100vw - 2rem))" }}
    >
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-green-100">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-700 to-green-900 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse shrink-0" />
            <div>
              <p className="text-white font-bold text-xs leading-tight">Green Bengaluru</p>
              <p className="text-green-300 text-[10px] leading-tight">Dhare Foundation</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-colors shrink-0"
            aria-label="Close"
          >
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-3 py-3 text-center">
          <p className="text-gray-800 font-bold text-xs">For Free Saplings</p>
          <p className="text-green-700 font-semibold text-xs">For in and around Bengaluru</p>
          <div className="mt-1.5 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <span className="text-amber-600 font-semibold text-[10px]">⏰ Last date: June 20th</span>
          </div>
          <Link
            href="/register-saplings"
            className="mt-3 w-full py-2 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-xs shadow-sm flex items-center justify-center"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
