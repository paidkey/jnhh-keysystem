import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import AdBlockDetector from "@/components/AdBlockDetector";

export const metadata: Metadata = {
  title: "JN HH Gaming Rivals Key System",
  description:
    "Official key generation and management system for JN HH Gaming Rivals. Secure, fast, and built for competitive gaming.",
  keywords: ["gaming", "key system", "JN HH", "Gaming Rivals", "license keys"],
  openGraph: {
    title: "JN HH Gaming Rivals Key System",
    description: "Generate and manage your Gaming Rivals access keys.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Ad Block Detector */}
        <AdBlockDetector />

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
          async
          data-cfasync="false"
          src="https://media.zentrova.dev/js/code.min.js"
          strategy="afterInteractive"
        />

        <div className="grid-bg min-h-screen flex flex-col">
          <Header />

          {/* Direct link (move this anywhere you like) */}
          <div className="text-center py-2">
            <a
              href="https://track.zentrova.dev/link?z=166524"
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              Support us
            </a>
          </div>

          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
