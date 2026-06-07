"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "en" ? "kn" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      title={locale === "en" ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ" : "Switch to English"}
      className="flex items-center border border-green-600 rounded-full overflow-hidden text-[11px] font-medium disabled:opacity-40 transition-opacity"
    >
      <span
        className={`px-2 py-0.5 transition-colors ${
          locale === "en" ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-50"
        }`}
      >
        EN
      </span>
      <span
        className={`px-2 py-0.5 transition-colors ${
          locale === "kn" ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-50"
        }`}
      >
        ಕನ್ನಡ
      </span>
    </button>
  );
}
