import type { Metadata } from "next";
import KeyGenerator from "@/components/KeyGenerator";

export const metadata: Metadata = {
  title: "Generate Key | JN HH Gaming Rivals Key System",
  description: "Generate your Gaming Rivals access key securely and instantly.",
};

export default function GenerateKeyPage() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full border border-gaming-red/30 bg-gaming-red/10 px-4 py-1 text-sm font-medium text-gaming-red-light">
            Key Generator
          </span>
          <h1 className="text-glow-red mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Generate Your Access Key
          </h1>
          <p className="text-base text-gray-400 sm:text-lg">
            Generate a unique access key instantly. Keys expire after 24 hours and
            are validated in-game via HWID.
          </p>
        </div>
        <KeyGenerator />
      </div>
    </section>
  );
}
