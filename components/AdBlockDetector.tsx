"use client";

import { useEffect, useState } from "react";

export default function AdBlockDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    let score = 0;
    const checks: Promise<void>[] = [];

    const p1 = new Promise<void>((resolve) => {
      const test = document.createElement("div");
      test.className = "adsbygoogle adsbox ad-placement";
      test.style.cssText =
        "position:absolute;height:1px;width:1px;opacity:0;pointer-events:none;left:-9999px;";
      document.body.appendChild(test);
      setTimeout(() => {
        if (test.offsetHeight === 0 || test.offsetParent === null) score++;
        document.body.removeChild(test);
        resolve();
      }, 300);
    });
    checks.push(p1);

    const p2 = fetch(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      { method: "HEAD", mode: "no-cors" }
    )
      .then(() => {})
      .catch(() => { score++; });
    checks.push(p2);

    const p3 = new Promise<void>((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://googleads.g.doubleclick.net/pagead/html/r20220130/r20110914/zrt_lookup.html";
      iframe.style.cssText =
        "position:absolute;left:-9999px;height:1px;width:1px;";
      document.body.appendChild(iframe);
      setTimeout(() => {
        try {
          if (!iframe.contentDocument || iframe.contentDocument.body === null) {
            score++;
          }
        } catch {
          score++;
        }
        document.body.removeChild(iframe);
        resolve();
      }, 1000);
    });
    checks.push(p3);

    const p4 = new Promise<void>((resolve) => {
      setTimeout(() => {
        if (typeof (window as Window & { adsbygoogle?: unknown }).adsbygoogle === "undefined") {
          score++;
        }
        resolve();
      }, 500);
    });
    checks.push(p4);

    Promise.all(checks).then(() => {
      setTimeout(() => {
        if (score >= 3) setAdBlockDetected(true);
      }, 200);
    });
  }, []);

  if (!adBlockDetected) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl border border-gaming-red/40 bg-gaming-card p-8 text-center shadow-[0_0_40px_rgba(220,38,38,0.2)]">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gaming-red/30 bg-gaming-red/10">
            <span className="text-4xl">🚫</span>
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          Ad Blocker Detected
        </h2>

        <p className="mb-2 text-sm text-gray-400">
          This site is{" "}
          <span className="font-semibold text-white">100% free</span> &mdash; ads are
          the only way we keep it running.
        </p>
        <p className="mb-6 text-sm text-gray-500">
          Please disable your ad blocker and refresh the page to continue.
        </p>

        <div className="mb-6 rounded-xl border border-gaming-border/50 bg-gaming-dark/50 p-4 text-left">
          <p className="mb-3 text-xs font-semibold text-gray-300">
            How to disable:
          </p>
          <ol className="space-y-2 text-xs text-gray-500">
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">1.</span>
              Click the ad blocker icon in your browser toolbar
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">2.</span>
              Select &quot;Disable for this site&quot; or &quot;Pause on this site&quot;
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-gaming-red-light">3.</span>
              Refresh the page and generate your key
            </li>
          </ol>

          <div className="mt-4 border-t border-gaming-border/30 pt-4">
            <p className="mb-2 text-xs font-semibold text-gray-300">
              🦁 Using Brave Browser?
            </p>
            <ol className="space-y-2 text-xs text-gray-500">
              <li className="flex gap-2">
                <span className="font-bold text-gaming-red-light">1.</span>
                Click the Brave Shield icon (lion) in the address bar
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-gaming-red-light">2.</span>
                Toggle &quot;Shields&quot; to OFF for this site
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-gaming-red-light">3.</span>
                Refresh the page
              </li>
            </ol>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="glow-red w-full rounded-xl bg-gaming-red px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gaming-red-light hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
        >
          🔄 I&apos;ve Disabled It &mdash; Refresh
        </button>

        <p className="mt-4 text-xs text-gray-600">
          We don&apos;t collect personal data. Ads keep key access free.
        </p>
      </div>
    </div>
  );
}
