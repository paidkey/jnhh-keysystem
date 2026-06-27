import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-32 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gaming-red/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gaming-red/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-gaming-red/30 bg-gaming-red/10 px-4 py-1.5 text-sm font-medium text-gaming-red-light">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gaming-red" />
          Official Key System
        </span>

        <h1 className="animate-fade-in-up text-glow-red mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          JN HH Gaming Rivals
          <span className="mt-2 block text-gaming-red-light">Key System</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
          style={{ animationDelay: "0.1s" }}
        >
          Generate secure access keys for Gaming Rivals in seconds. Built for
          competitive players who demand speed, security, and reliability.
        </p>

        <div
          className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/generate-key"
            className="glow-red w-full rounded-xl bg-gaming-red px-8 py-4 text-center text-base font-bold text-white transition-all hover:bg-gaming-red-light sm:w-auto"
          >
            Generate Key Now
          </Link>
          <Link
            href="/#features"
            className="w-full rounded-xl border border-gaming-border bg-gaming-card px-8 py-4 text-center text-base font-semibold text-gray-200 transition-all hover:border-gaming-red/50 hover:text-white sm:w-auto"
          >
            Explore Features
          </Link>
        </div>

        <div
          className="animate-fade-in-up mt-16 grid grid-cols-3 gap-4 sm:gap-8"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { value: "100K+", label: "Keys Generated" },
            { value: "99.9%", label: "Uptime" },
            { value: "<1s", label: "Generation Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-glow-red text-2xl font-bold text-gaming-red-light sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
