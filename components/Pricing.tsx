const KEY_URL = "https://jnhh-keysystem.vercel.app/";
const BUY_URL = "https://buy-bice.vercel.app/";

const plans = [
  {
    name: "Keyless Basic Version",
    prices: [{ label: "0$", highlight: true }],
    features: [
      "No Key",
      "Good Anti-Cheat Bypass (NO BAN)",
      "Limited Features⚠️",
    ],
    cta: "Get Free Version",
    highlighted: false,
    badge: null,
  },
  {
    name: "Key System — Daily",
    prices: [{ label: "0$", highlight: true }],
    features: [
      "Better Anti-Cheat Bypass (NO BAN)",
      "Daily Key System for 24 hours key 🔑",
      "All Features✅",
    ],
    cta: "Click on Generate Key",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Paid Version",
    prices: [
      { label: "Price for 1 month is 7$", highlight: true },
      { label: "OR", highlight: false },
      { label: "Price for 1 Year is 50$", highlight: true },
      { label: "OR", highlight: false },
      { label: "Price for Life time is 100$", highlight: true },
    ],
    features: [
      "Best Anti-Cheat Bypass (NO BAN)",
      "No Key🔑",
      "All Features✅️",
      "Best Value⭐",
    ],
    cta: "Purchase 1 Year",
    highlighted: false,
    badge: "Best Value",
  },
];

const paymentMethods = ["Paypal", "Crypto", " Credit Card", "Debit Card", "UPI", "Robux"];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-gaming-red-light"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gaming-red/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-gaming-red-light">
            Pricing
          </span>
          <h2 className="text-glow-red mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Rivals Script By JN HH Gaming
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Choose the plan that fits your playstyle. Premium anti-cheat bypass with
            flexible payment options.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "glow-red animate-pulse-glow scale-[1.02] border-gaming-red bg-gradient-to-b from-gaming-card to-gaming-dark shadow-[0_0_40px_rgba(220,38,38,0.25)]"
                  : "border-gaming-border bg-gaming-card hover:border-gaming-red/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.12)]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gaming-red px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-white sm:text-xl">{plan.name}</h3>
              </div>

              <div className="mb-8 flex flex-col items-center gap-1 text-center">
                {plan.prices.map((price, i) =>
                  price.label === "OR" ? (
                    <span key={i} className="my-1 text-xs font-medium uppercase tracking-widest text-gray-500">
                      {price.label}
                    </span>
                  ) : (
                    <span
                      key={i}
                      className={`${
                        price.highlight
                          ? "text-glow-red text-3xl font-extrabold text-white sm:text-4xl"
                          : "text-sm text-gray-400"
                      }`}
                    >
                      {price.label}
                    </span>
                  )
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={
                  plan.name === "Key System — Daily"
                    ? KEY_URL
                    : BUY_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-xl py-3.5 text-center text-sm font-bold transition-all ${
                  plan.highlighted
                    ? "glow-red bg-gaming-red text-white hover:bg-gaming-red-light hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                    : "border border-gaming-border text-gray-200 hover:border-gaming-red/60 hover:bg-gaming-red/10 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="glow-red rounded-2xl border border-gaming-red/30 bg-gaming-card p-8 text-center">
            <h3 className="text-glow-red mb-6 text-xl font-bold text-white sm:text-2xl">
              Payment Methods
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-gaming-red/30 bg-gaming-red/10 px-5 py-2 text-sm font-semibold text-gaming-red-light shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
