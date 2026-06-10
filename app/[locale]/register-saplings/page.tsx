import Image from "next/image";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import SaplingRegistrationForm from "@/app/register-saplings/SaplingRegistrationForm";

export const metadata = { title: "Free Sapling Registration — Dhare Foundation" };

export default async function SaplingRegistrationPage() {
  const t = await getTranslations("saplingPage");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-white border-b border-green-100 shadow-sm px-4 sm:px-8 py-3">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src="/images/logos/dhare-logo-3.png" alt="Dhare Foundation" width={48} height={48} className="object-contain shrink-0" priority />
          <div>
            <p className="text-base sm:text-xl font-bold text-green-900 leading-tight">DHARE</p>
            <p className="text-[11px] sm:text-sm text-green-700 font-medium tracking-wide leading-tight">FOUNDATION</p>
          </div>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-green-800 to-green-950 px-4 py-8 text-center">
        <p className="text-green-300 text-sm font-semibold tracking-wide mb-2">{t("initiative")}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{t("heading")}</h1>
        <p className="text-green-200 text-sm mb-3">{t("subtitle")}</p>
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5">
          <span className="text-amber-300 text-xs font-semibold">{t("deadline")}</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <SaplingRegistrationForm />
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 mt-6 text-sm text-green-700 hover:text-green-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("backLink")}
        </Link>
      </div>
    </div>
  );
}
