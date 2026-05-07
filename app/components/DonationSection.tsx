type DonationTier = {
  amount: string;
  label: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

const tiers: DonationTier[] = [
  {
    amount: "₹210",
    label: "Plant a Sapling",
    description: "Prepare Soil. Plant Life.",
    features: ["Soil preparation", "Native sapling plantation"],
    highlighted: false,
  },
  {
    amount: "₹700",
    label: "Plant & Protect",
    description: "Plant and Protect Through Summer.",
    features: ["Soil preparation", "Native sapling plantation", "Watering support for two summers"],
    highlighted: true,
  },
  {
    amount: "₹1,000",
    label: "Complete Support",
    description: "Complete Sapling Support.",
    features: ["Soil preparation", "Native sapling plantation", "Tree guard / fencing", "Watering support for two years"],
    highlighted: false,
  },
];

export default function DonationSection() {
  return (
    <section id="donate" className="py-16 sm:py-24 bg-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-green-400 font-semibold text-sm uppercase tracking-widest mb-3">Support Our Mission</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Donate to Plant, Protect, and Grow</h2>
          <p className="text-green-200 leading-relaxed">
            Every contribution helps Dhare Foundation create long-lasting native green spaces across Karnataka.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col ${
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
          <button className="inline-flex items-center gap-2 border-2 border-green-500 text-green-300 hover:text-white hover:border-white px-6 py-3 rounded-full font-semibold text-sm transition-colors">
            Donate a Custom Amount
          </button>
        </div>

        {/* Payment methods */}
        <div className="mt-10 text-center">
          <p className="text-green-400 text-xs uppercase tracking-widest mb-3">Payment Options</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["UPI", "Debit Card", "Credit Card", "Net Banking", "QR Code", "Bank Transfer", "CSR Transfer"].map((m) => (
              <span key={m} className="bg-green-800/50 border border-green-700 text-green-300 text-xs px-3 py-1.5 rounded-full">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
