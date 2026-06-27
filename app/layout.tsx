import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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
        {/* Adsterra Popunder */}
        <script
          src="https://everybodycollecteagle.com/1d/e3/20/1de32055ff0b495e2d3d9cb6b1a911d3.js"
          async
        />
        {/* Adsterra Social Bar */}
        <script
          src="https://everybodycollecteagle.com/15/54/41/15544153cc26112901e0c788b03fd6a3.js"
          async
        />
      </head>
      <body className="antialiased">
        {/* Adsterra Native Banner */}
        <Script
          async
          data-cfasync="false"
          src="https://everybodycollecteagle.com/49be1ff3bbc1337ca058f14a12497da7/invoke.js"
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
