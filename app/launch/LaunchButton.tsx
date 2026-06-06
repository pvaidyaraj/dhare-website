"use client";

import { useState } from "react";
import { completeLaunch } from "@/app/actions/launch";

export default function LaunchButton() {
  const [launching, setLaunching] = useState(false);

  async function handleLaunch() {
    setLaunching(true);
    await completeLaunch();
  }

  return (
    <button
      onClick={handleLaunch}
      disabled={launching}
      className="w-full py-14 bg-green-400 hover:bg-green-300 active:bg-green-500 disabled:bg-green-600 disabled:cursor-not-allowed text-green-950 font-black tracking-[0.25em] transition-colors duration-200 shrink-0"
      style={{ fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
    >
      {launching ? "LAUNCHING…" : "LAUNCH"}
    </button>
  );
}
