const INSTAGRAM_URL = "https://www.instagram.com/jn_hh_gaming";
const TELEGRAM_URL = "https://t.me/jnhhgaming";

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
      "Daily Key System for 24 hours key",
      "All Features✅",
    ],
    cta: "Get Free Version",
    highlighted: true,
    badge: null,
  },
  {
    name: "Paid Version — 1 Year",
    prices: [
      { label: "70 USD", highlight: true },
      { label: "OR", highlight: false },
      { label: "30000 Robux", highlight: true },
    ],
    features: [
      "Best Anti-Cheat Bypass (NO BAN)",
      "2 Months Bonus",
      "All Features",
      "Best Value",
    ],
    cta: "Purchase 1 Year",
    highlighted: false,
    badge: "Best Value",
  },
];

const paymentMethods = ["Paypal", "Crypto", "UPI", "Robux"];

const purchaseChannels = [
  {
    label: "Discord Ticket",
    href: INSTAGRAM_URL,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: TELEGRAM_URL,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

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
                href={INSTAGRAM_URL}
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

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <h3 className="text-glow-red mb-2 text-xl font-bold text-white sm:text-2xl">
            Where to Purchase?
          </h3>
          <p className="mb-8 text-sm text-gray-400">
            Contact us through any of these channels to complete your purchase.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            {purchaseChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-red flex w-full items-center justify-center gap-2 rounded-xl border border-gaming-red/40 bg-gaming-red/10 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-gaming-red hover:shadow-[0_0_25px_rgba(220,38,38,0.45)] sm:w-auto"
              >
                {channel.icon}
                {channel.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
