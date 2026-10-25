"use client";

import { useCallback, useState } from "react";
import Script from "next/script";
import { KEY_EXPIRY_HOURS, KEY_DISPLAY_HOURS } from "@/lib/key";

type GeneratedKeyResponse = {
  key: string;
  status: string;
  key_type: string;
  expires_at: string;
  expiry_hours: number;
};

const AD_LINK = "https://track.zentrova.dev/link?z=166524";
const ADS_REQUIRED = 5;

function SponsoredLink({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <a
        href={AD_LINK}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="w-full max-w-md rounded-xl border border-gaming-red/40 bg-gaming-dark px-6 py-4 text-center text-sm font-semibold text-gaming-red-light transition-all hover:bg-gaming-red/10 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
      >
         {label}
        <span className="mt-1 block text-xs font-normal text-gray-500">
          Sponsored · Opens in a new tab
        </span>
      </a>
    </div>
  );
}

export default function KeyGenerator() {
  const [result, setResult] = useState<GeneratedKeyResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adClicks, setAdClicks] = useState(0);
  const [showAdPrompt, setShowAdPrompt] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (adClicks < ADS_REQUIRED) {
      setShowAdPrompt(true);
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);
    setResult(null);

    try {
      const response = await fetch("/api/keys/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to generate key. Please try again.");
        return;
      }

      setResult(data as GeneratedKeyResponse);
      setAdClicks(0);
      setShowAdPrompt(false);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [adClicks]);

  const handleAdClick = useCallback(() => {
    window.open(AD_LINK, "_blank", "noopener,noreferrer");
    setAdClicks((prev) => {
      const next = prev + 1;
      if (next >= ADS_REQUIRED) setShowAdPrompt(false);
      return next;
    });
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Pop-ups: init config */}
      <Script
        id="aso-popup-init"
        data-cfasync="false"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,a){w[a]=w[a]||{};w[a].queue=w[a].queue||[];w[a].queue.push(function(){_ASO.PuOptions={idzone:166522};_ASO.loadPuHelper();})})(window,"_aso");`,
        }}
      />
      {/* Pop-ups: loader */}
      <Script
        id="aso-popup-loader"
        async
        data-cfasync="false"
        src="https://media.zentrova.dev/js/code.min.js"
        strategy="afterInteractive"
      />

      <SponsoredLink label="Ad" />

      <div className="rounded-2xl border border-gaming-border bg-gaming-card p-6 sm:p-8">
        {showAdPrompt && (
          <div className="mb-6 rounded-xl border border-gaming-red/30 bg-gaming-dark p-4 text-center">
            <p className="mb-2 text-sm font-semibold text-white">
              ⚡ To generate your free key, please click the button below{" "}
              <span className="text-gaming-red-light">
                {ADS_REQUIRED - adClicks} more time(s)
              </span>
            </p>
            <p className="mb-4 text-xs text-gray-400">
              This supports the project and keeps keys free!
            </p>
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gaming-border">
              <div
                className="h-2 rounded-full bg-gaming-red transition-all duration-300"
                style={{ width: `${(adClicks / ADS_REQUIRED) * 100}%` }}
              />
            </div>
            <p className="mb-3 text-xs text-gray-500">
              {adClicks} / {ADS_REQUIRED} completed
            </p>
            <button
              type="button"
              onClick={handleAdClick}
              className="glow-red rounded-xl bg-gaming-red px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gaming-red-light"
            >
              👉 Continue ({ADS_REQUIRED - adClicks} left)
            </button>
          </div>
        )}

        <SponsoredLink label="Check out this offer" className="mb-6" />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="glow-red rounded-xl bg-gaming-red px-10 py-4 text-base font-bold text-white transition-all hover:bg-gaming-red-light hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : adClicks >= ADS_REQUIRED ? (
              "🔑 Generate Key"
            ) : (
              "Generate Key"
            )}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-center text-sm font-medium text-gaming-red-light">
            {error}
          </p>
        )}

        {result && (
          <div className="animate-fade-in-up mt-10 text-center">
            <p className="mb-3 text-sm font-medium text-gray-300">Generated Key</p>
            <div className="mx-auto max-w-full rounded-xl border border-gaming-red/30 bg-gaming-dark px-4 py-4 font-mono text-sm tracking-wider text-gaming-red-light break-all sm:text-base">
              {result.key}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleCopy}
                className="glow-red rounded-xl border border-gaming-red/40 bg-gaming-red/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gaming-red hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                {copied ? "Copied! ✅" : "Copy Key"}
              </button>
            </div>

            <p className="mt-6 text-sm font-medium text-gray-400">
              Expiry: {KEY_DISPLAY_HOURS} Hours
            </p>

            <SponsoredLink label="Support us with one more visit" className="mt-6" />
          </div>
        )}

        <div className="mt-10 rounded-xl border border-gaming-border/50 bg-gaming-dark/50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-300">How it works</h3>
          <ol className="space-y-2 text-sm text-gray-500">
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">1.</span>
              Click Generate Key — complete {ADS_REQUIRED} quick steps to unlock
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">2.</span>
              Copy the key using the Copy Key button
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">3.</span>
              Activate the key in-game — validated via HWID
            </li>
          </ol>
        </div>

        <SponsoredLink label="Visit our sponsor" className="mt-6" />
      </div>

      <SponsoredLink label="Check out another offer" />
    </div>
  );
}
