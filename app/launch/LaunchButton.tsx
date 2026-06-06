"use client";

import { useState } from "react";
import { completeLaunch } from "@/app/actions/launch";

export default function LaunchButton() {
  const [launching, setLaunching] = useState(false);

  async function handleLaunch() {
    setLaunching(true);
    const result = await completeLaunch();
    if (result.success) {
      window.location.href = "/";
    } else {
      setLaunching(false);
    }
  }

  return (
    <button
      onClick={handleLaunch}
      disabled={launching}
      className="animate-launch-pulse relative w-full flex flex-col items-center justify-center overflow-hidden disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
      style={{
        background: launching
          ? "linear-gradient(to bottom, #15803d, #14532d)"
          : "linear-gradient(to bottom, #4ade80 0%, #22c55e 25%, #16a34a 65%, #15803d 100%)",
        borderTop: "3px solid rgba(134, 239, 172, 0.65)",
        minHeight: "45vh",
      }}
    >
      {/* Shimmer on hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
        }}
      />

      {/* Top highlight edge */}
      <span
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.3)" }}
      />

      {/* Arrow + LAUNCH */}
      <span
        className="relative flex flex-col items-center justify-center gap-2"
        style={{
          color: launching ? "rgba(255,255,255,0.5)" : "#052e16",
        }}
      >
        {!launching && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "clamp(2rem, 7vw, 4rem)", height: "clamp(2rem, 7vw, 4rem)", opacity: 0.8 }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        )}
        <span
          style={{
            fontSize: "clamp(3.5rem, 14vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "0.22em",
            lineHeight: 1,
            textShadow: launching ? "none" : "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          {launching ? "LAUNCHING…" : "LAUNCH"}
        </span>
      </span>
    </button>
  );
}
