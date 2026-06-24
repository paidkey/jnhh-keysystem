import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <head>
        {/* Ad Maven Site Verification */}
        <meta name='admaven-placement' content='BrHsFqjn5' />

        {/* Ad Maven Pop */}
        <script
          data-cfasync="false"
          src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1374651"
          async
        />

        {/* Ad Maven Interstitial */}
        <script
          data-cfasync="false"
          src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1374679"
          async
        />

        {/* Ad Maven In Page Push */}
        <script
          data-cfasync="false"
          src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1374694"
          async
        />
      </head>
      <body className="antialiased">
        <div className="grid-bg min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
