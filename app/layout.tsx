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
