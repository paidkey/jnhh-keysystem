"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#info", label: "Info" },
  { href: "/generate-key", label: "Generate Key" },
];

function BannerAd({ adKey, width, height }: { adKey: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !ref.current) return;
    injected.current = true;

    const optScript = document.createElement("script");
    optScript.text = `atOptions = {'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};`;
    ref.current.appendChild(optScript);

    const invokeScript = document.createElement("script");
    invokeScript.src = `https://everybodycollecteagle.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    ref.current.appendChild(invokeScript);
  }, [adKey, width, height]);

  return <div ref={ref} style={{ width, height, overflow: "hidden" }} className="mx-auto" />;
}

function AdPopup({
  step,
  total,
  onContinue,
  onClose,
}: {
  step: number;
  total: number;
  onContinue: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-gaming-border bg-gaming-card p-6 text-center shadow-[0_0_40px_rgba(220,38,38,0.15)]">
        {/* Step indicator */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Step {step} of {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-gray-400"
          >
            ✕ Skip
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-gaming-border">
          <div
            className="h-1 rounded-full bg-gaming-red transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>

        <p className="mb-4 text-xs text-gray-400">
          Supporting this free project ❤️
        </p>

        {/* Ad */}
        <div className="flex justify-center mb-5">
          {step === 1 ? (
            <BannerAd adKey="b92159cedbeff4a38f54728ef63b39b9" width={300} height={250} />
          ) : (
            <BannerAd adKey="f14881bec14040f7e7be580ba49e04b1" width={160} height={300} />
          )}
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="glow-red w-full rounded-xl bg-gaming-red px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gaming-red-light hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          {step === total ? "✅ Continue to Site" : "➡️ Next"}
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const [pendingHref, setPendingHref] = useState("");

  const TOTAL_STEPS = 2;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === "/#features" || href === "/#info") {
      e.preventDefault();
      setPendingHref(href);
      setPopupStep(1);
      setMenuOpen(false);
    }
  };

  const handleContinue = () => {
    if (popupStep < TOTAL_STEPS) {
      setPopupStep(popupStep + 1);
    } else {
      setPopupStep(0);
      if (pendingHref.includes("#")) {
        const id = pendingHref.split("#")[1];
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = pendingHref;
        }
      }
    }
  };

  const handleClose = () => {
    setPopupStep(0);
    if (pendingHref) {
      const id = pendingHref.split("#")[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = pendingHref;
      }
    }
  };

  return (
    <>
      {popupStep > 0 && (
        <AdPopup
          step={popupStep}
          total={TOTAL_STEPS}
          onContinue={handleContinue}
          onClose={handleClose}
        />
      )}

      <header className="sticky top-0 z-50 border-b border-gaming-border/80 bg-gaming-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gaming-red font-bold text-white transition-transform group-hover:scale-105">
              JH
            </span>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold leading-tight text-white">
                JN HH Gaming Rivals
              </span>
              <span className="block text-xs text-gaming-red-light">Key System</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/generate-key"
                  ? pathname === "/generate-key"
                  : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gaming-red/20 text-gaming-red-light"
                      : "text-gray-300 hover:bg-gaming-card hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/generate-key"
              className="ml-2 rounded-lg bg-gaming-red px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gaming-red-light hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Get Key
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gaming-border text-gray-300 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-gaming-border bg-gaming-dark px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    if (link.href === "/generate-key") setMenuOpen(false);
                  }}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gaming-card hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/generate-key"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-gaming-red px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get Key
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
