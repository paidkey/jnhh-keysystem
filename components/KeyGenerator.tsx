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

export default function KeyGenerator() {
  const [result, setResult] = useState<GeneratedKeyResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = useCallback(async () => {
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
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating...
            </span>
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
              {copied ? "Copied!" : "Copy Key"}
            </button>
          </div>

          <p className="mt-6 text-sm font-medium text-gray-400">
            Expiry: {result.expiry_hours ?? KEY_EXPIRY_HOURS} Hours
          </p>
        </div>
      )}

      <div className="mt-10 rounded-xl border border-gaming-border/50 bg-gaming-dark/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-300">How it works</h3>
        <ol className="space-y-2 text-sm text-gray-500">
          <li className="flex gap-2">
            <span className="font-bold text-gaming-red-light">1.</span>
            Click Generate Key to create and save your unique access key
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
