"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createDonationOrder, verifyDonationPayment } from "@/app/actions/donation";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const TIER_AMOUNTS = [200, 395, 700];

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function BankDetailsModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("donate");
  const rows = [
    { label: t("bankName"), value: t("bankNameValue") },
    { label: t("accountNo"), value: t("accountNoValue") },
    { label: t("branch"), value: t("branchValue") },
    { label: t("ifsc"), value: t("ifscValue") },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🏦</div>
          <div>
            <h3 className="text-gray-900 font-bold text-lg">{t("bankTitle")}</h3>
            <p className="text-gray-500 text-xs">{t("bankSubtitle")}</p>
          </div>
        </div>
        <div className="space-y-4">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 text-sm">{label}</span>
              <span className="text-gray-900 font-semibold text-sm text-right">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-400 text-center">
          {t("bankNote")} <span className="text-green-700 font-medium">{t("bankEmail")}</span>
        </p>
        <button onClick={onClose} className="mt-5 w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm">
          {t("done")}
        </button>
      </div>
    </div>
  );
}

export default function DonationSection() {
  const t = useTranslations("donate");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState<string | null>(null);

  async function handleDonate(amount: number) {
    setPayError(null);
    setPaySuccess(null);
    setPaying(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPayError("Could not load payment gateway. Please try again.");
      setPaying(false);
      return;
    }

    const order = await createDonationOrder(amount);
    if (!order.success) {
      setPayError(order.error);
      setPaying(false);
      return;
    }

    const razorpay = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "Dhare Foundation",
      description: "Donation",
      theme: { color: "#15803d" },
      handler: async (response: unknown) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response as { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

        const verification = await verifyDonationPayment({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });

        if (verification.success) {
          setPaySuccess(`Thank you for your donation! Payment ID: ${verification.paymentId}`);
        } else {
          setPayError(verification.error);
        }
        setPaying(false);
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    });

    razorpay.on("payment.failed", () => {
      setPayError("Payment failed. Please try again.");
      setPaying(false);
    });

    razorpay.open();
  }

  function handleCustomAmountSubmit() {
    const amount = Math.floor(Number(customAmount));
    if (!amount || amount < 10) {
      setPayError("Enter a valid amount (minimum ₹10).");
      return;
    }
    setShowCustomAmount(false);
    setCustomAmount("");
    handleDonate(amount);
  }

  const tiers = [
    {
      amount: t("tier0Amount"),
      numericAmount: TIER_AMOUNTS[0],
      label: t("tier0Label"),
      description: t("tier0Desc"),
      features: [t("tier0Feature0"), t("tier0Feature1")],
      highlighted: false,
    },
    {
      amount: t("tier1Amount"),
      numericAmount: TIER_AMOUNTS[1],
      label: t("tier1Label"),
      description: t("tier1Desc"),
      features: [t("tier1Feature0"), t("tier1Feature1"), t("tier1Feature2")],
      highlighted: true,
    },
    {
      amount: t("tier2Amount"),
      numericAmount: TIER_AMOUNTS[2],
      label: t("tier2Label"),
      description: t("tier2Desc"),
      features: [t("tier2Feature0"), t("tier2Feature1"), t("tier2Feature2"), t("tier2Feature3")],
      highlighted: false,
    },
  ];

  return (
    <section id="donate" className="py-8 sm:py-10 bg-green-900">
      {showBankDetails && <BankDetailsModal onClose={() => setShowBankDetails(false)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-7">
          <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">{t("label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("heading")}</h2>
          <p className="text-green-200 leading-relaxed">{t("desc")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col ${
                tier.highlighted
                  ? "bg-green-500 border-2 border-green-400 shadow-xl shadow-green-900/50 scale-105"
                  : "bg-green-800/60 border border-green-700"
              }`}
            >
              {tier.highlighted && (
                <span className="inline-block self-start bg-white text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {t("mostPopular")}
                </span>
              )}
              <p className="text-4xl font-bold text-white mb-1">{tier.amount}</p>
              <p className={`text-sm font-semibold mb-2 ${tier.highlighted ? "text-white" : "text-green-300"}`}>{tier.label}</p>
              <p className={`text-sm mb-5 ${tier.highlighted ? "text-white/90" : "text-green-200"}`}>{tier.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-white" : "text-green-200"}`}>
                    <span className={tier.highlighted ? "text-white" : "text-green-400"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDonate(tier.numericAmount)}
                disabled={paying}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  tier.highlighted
                    ? "bg-white text-green-700 hover:bg-green-50"
                    : "bg-green-700 text-white hover:bg-green-600 border border-green-600"
                }`}
              >
                {t("donateBtn", { amount: tier.amount })}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          {showCustomAmount ? (
            <div className="inline-flex items-center gap-2">
              <input
                type="number"
                min={10}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="₹ Amount"
                className="w-32 px-4 py-3 rounded-full bg-green-800/60 border border-green-600 text-white placeholder:text-green-300 text-sm focus:outline-none focus:border-green-400"
                autoFocus
              />
              <button
                onClick={handleCustomAmountSubmit}
                disabled={paying}
                className="px-5 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-full text-sm border border-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Donate
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCustomAmount(true)}
              disabled={paying}
              className="inline-flex items-center gap-2 border-2 border-green-500 text-green-300 hover:text-white hover:border-white px-6 py-3 rounded-full font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {t("customAmount")}
            </button>
          )}

          {paying && <p className="text-green-300 text-sm">Processing…</p>}
          {payError && <p className="text-red-300 text-sm">{payError}</p>}
          {paySuccess && <p className="text-green-300 text-sm font-semibold">{paySuccess}</p>}

          <div>
            <button
              onClick={() => setShowBankDetails(true)}
              className="text-green-300 hover:text-white text-xs underline underline-offset-2 transition-colors"
            >
              Prefer a bank transfer instead?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
