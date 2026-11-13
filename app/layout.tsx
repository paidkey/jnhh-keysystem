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

        {/* Popunder */}
        <Script
          id="ad-popunder"
          data-cfasync="false"
          src="https://abscloud.org/1/1de32055ff0b495e2d3d9cb6b1a911d3"
          strategy="afterInteractive"
        />
        {/* Social Bar */}
        <Script
          id="ad-social-bar"
          data-cfasync="false"
          src="https://bauval.org/14/15544153cc26112901e0c788b03fd6a3"
          strategy="afterInteractive"
        />
        {/* Native Banner */}
        <Script
          id="ad-native-banner"
          async
          data-cfasync="false"
          src="https://bauval.org/21/49be1ff3bbc1337ca058f14a12497da7"
          strategy="afterInteractive"
        />

        <div className="grid-bg min-h-screen flex flex-col">
          <Header />
          {/* Native Banner container */}
          <div id="container-49be1ff3bbc1337ca058f14a12497da7" />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
