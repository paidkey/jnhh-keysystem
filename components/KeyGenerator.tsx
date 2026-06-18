"use client";

import { useCallback, useState } from "react";
import { KEY_EXPIRY_HOURS } from "@/lib/key";

type GeneratedKeyResponse = {
  key: string;
  status: string;
  key_type: string;
  expires_at: string;
  expiry_hours: number;
};

const SMARTLINK_URL = "https://www.effectivecpmnetwork.com/zasxq9zf9a?key=d0c05691ee5effbcdbcbef1ac1723f6d";
const ADS_REQUIRED = 5;

export default function KeyGenerator() {
  const [result, setResult] = useState<GeneratedKeyResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adClicks, setAdClicks] = useState(0);
  const [showAdPrompt, setShowAdPrompt] = useState(false);

  const handleGenerate = useCallback(async () => {
    // If not enough ad clicks, show ad prompt
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
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to generate key. Please try again.");
        return;
      }

      setResult(data as GeneratedKeyResponse);
      setAdClicks(0); // reset after successful generation
      setShowAdPrompt(false);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [adClicks]);

  const handleAdClick = useCallback(() => {
    window.open(SMARTLINK_URL, "_blank");
    setAdClicks((prev) => {
      const next = prev + 1;
      if (next >= ADS_REQUIRED) {
        setShowAdPrompt(false);
      }
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
    <div className="rounded-2xl border border-gaming-border bg-gaming-card p-6 sm:p-8">

      {/* Banner Ad 300x250 */}
      <div className="flex justify-center mb-6">
        <div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : 'b92159cedbeff4a38f54728ef63b39b9',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              `,
            }}
          />
          <script
            src="https://www.highperformanceformat.com/b92159cedbeff4a38f54728ef63b39b9/invoke.js"
            async
          />
        </div>
      </div>

      {/* Ad Click Progress */}
      {showAdPrompt && (
        <div className="mb-6 rounded-xl border border-gaming-red/30 bg-gaming-dark p-4 text-center">
          <p className="mb-2 text-sm font-semibold text-white">
            ⚡ To generate your free key, please click the button below{" "}
            <span className="text-gaming-red-light">{ADS_REQUIRED - adClicks} more time(s)</span>
          </p>
          <p className="mb-4 text-xs text-gray-400">
            This supports the project and keeps keys free!
          </p>
          {/* Progress bar */}
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

      {/* Generate Button */}
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
            Expiry: {result.expiry_hours ?? KEY_EXPIRY_HOURS} Hours
          </p>

          {/* Banner Ad 300x250 after key generation */}
          <div className="mt-6 flex justify-center">
            <div>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    atOptions = {
                      'key' : 'b92159cedbeff4a38f54728ef63b39b9',
                      'format' : 'iframe',
                      'height' : 250,
                      'width' : 300,
                      'params' : {}
                    };
                  `,
                }}
              />
              <script
                src="https://www.highperformanceformat.com/b92159cedbeff4a38f54728ef63b39b9/invoke.js"
                async
              />
            </div>
          </div>
        </div>
      )}

      {/* Banner Ad 160x600 sidebar-style */}
      <div className="mt-6 flex justify-center">
        <div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '48cbdd63e77ac540499adc96fa7fad31',
                  'format' : 'iframe',
                  'height' : 600,
                  'width' : 160,
                  'params' : {}
                };
              `,
            }}
          />
          <script
            src="https://www.highperformanceformat.com/48cbdd63e77ac540499adc96fa7fad31/invoke.js"
            async
          />
        </div>
      </div>

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
    </div>
  );
}
