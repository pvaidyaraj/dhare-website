"use client";

import { useState } from "react";

type DonationTier = {
  amount: string;
  label: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

const tiers: DonationTier[] = [
  {
    amount: "₹175",
    label: "Plant a Sapling",
    description: "Prepare Soil. Plant Life.",
    features: ["Soil preparation", "Native sapling plantation"],
    highlighted: false,
  },
  {
    amount: "₹395",
    label: "Plant & Protect",
    description: "Plant and Protect Through Summer.",
    features: ["Soil preparation", "Native sapling plantation", "Watering support for two summers"],
    highlighted: true,
  },
  {
    amount: "₹700",
    label: "Complete Support",
    description: "Complete Sapling Support.",
    features: ["Soil preparation", "Native sapling plantation", "Tree guard / fencing", "Watering support for two years"],
    highlighted: false,
  },
];

function BankDetailsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🏦</div>
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Bank Transfer Details</h3>
            <p className="text-gray-500 text-xs">DHARE FOUNDATION</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: "Bank", value: "Kotak Mahindra Bank" },
            { label: "Account No", value: "6246258991" },
            { label: "Branch", value: "BTM Layout Branch" },
            { label: "IFSC Code", value: "KKBK0008077" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500 text-sm">{label}</span>
              <span className="text-gray-900 font-semibold text-sm text-right">{value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-gray-400 text-center">
          Please share payment confirmation to <span className="text-green-700 font-medium">info@dharefoundation.org</span>
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default function DonationSection() {
  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <section id="donate" className="py-8 sm:py-10 bg-green-900">
      {showBankDetails && <BankDetailsModal onClose={() => setShowBankDetails(false)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">Support Our Mission</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Donate to Plant, Protect, and Grow</h2>
          <p className="text-green-200 leading-relaxed">
            Every contribution helps Dhare Foundation create long-lasting native green spaces across Karnataka.
          </p>
        </div>

        {/* Tiers */}
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
                  Most Popular
                </span>
              )}
              <p className="text-4xl font-bold text-white mb-1">{tier.amount}</p>
              <p className={`text-sm font-semibold mb-2 ${tier.highlighted ? "text-white" : "text-green-300"}`}>
                {tier.label}
              </p>
              <p className={`text-sm mb-5 ${tier.highlighted ? "text-white/90" : "text-green-200"}`}>
                {tier.description}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-white" : "text-green-200"}`}>
                    <span className={tier.highlighted ? "text-white" : "text-green-400"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowBankDetails(true)}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${
                  tier.highlighted
                    ? "bg-white text-green-700 hover:bg-green-50"
                    : "bg-green-700 text-white hover:bg-green-600 border border-green-600"
                }`}
              >
                Donate {tier.amount}
              </button>
            </div>
          ))}
        </div>

        {/* Custom amount */}
        <div className="text-center">
          <button
            onClick={() => setShowBankDetails(true)}
            className="inline-flex items-center gap-2 border-2 border-green-500 text-green-300 hover:text-white hover:border-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            Donate a Custom Amount
          </button>
        </div>

      </div>
    </section>
  );
}
