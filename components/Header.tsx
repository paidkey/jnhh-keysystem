"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/generate-key", label: "Generate Key" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
                onClick={() => setMenuOpen(false)}
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
  );
}
