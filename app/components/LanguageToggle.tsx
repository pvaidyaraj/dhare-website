"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function LanguageToggle() {
  const [isKannada, setIsKannada] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "gt-hide-toolbar";
    style.textContent = `
      .goog-te-banner-frame,
      iframe.skiptranslate,
      .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      body { top: 0px !important; }
      #goog-gt-tt, .goog-te-balloon-frame, .goog-te-ftab-float { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "kn", autoDisplay: false },
        "google_translate_element"
      );
      setReady(true);
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toggle = () => {
    if (isKannada) {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      window.location.reload();
    } else {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = "kn";
        select.dispatchEvent(new Event("change"));
        setIsKannada(true);
      }
    }
  };

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <button
        onClick={toggle}
        disabled={!ready}
        title={isKannada ? "Switch to English" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"}
        className="flex items-center gap-1 border border-green-600 rounded-full overflow-hidden text-sm font-medium disabled:opacity-40 transition-opacity"
      >
        <span
          className={`px-2.5 py-1 transition-colors ${
            !isKannada ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-50"
          }`}
        >
          EN
        </span>
        <span
          className={`px-2.5 py-1 transition-colors ${
            isKannada ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-50"
          }`}
        >
          ಕನ್ನಡ
        </span>
      </button>
    </>
  );
}
