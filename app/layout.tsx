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
        {/* Adsterra Popunder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement('script');s.src='https://pl29789391.effectivecpmnetwork.com/1d/e3/20/1de32055ff0b495e2d3d9cb6b1a911d3.js';s.async=true;document.head.appendChild(s);})();`,
          }}
        />
        {/* Adsterra Social Bar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement('script');s.src='https://pl29789393.effectivecpmnetwork.com/15/54/41/15544153cc26112901e0c788b03fd6a3.js';s.async=true;document.head.appendChild(s);})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <div className="grid-bg min-h-screen flex flex-col">
          <Header />

          {/* Adsterra Banner 728x90 - Top */}
          <div className="flex justify-center py-2 bg-gaming-dark/50">
            <div>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    atOptions = {
                      'key' : 'adfb842bf6e8b71a1ba1642fd609def7',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                    };
                  `,
                }}
              />
              <script
                src="https://www.highperformanceformat.com/adfb842bf6e8b71a1ba1642fd609def7/invoke.js"
                async
              />
            </div>
          </div>

          <main className="flex-1">{children}</main>

          {/* Adsterra Native Banner - Above Footer */}
          <div className="flex justify-center py-4">
            <script
              async
              data-cfasync="false"
              src="https://pl29789394.effectivecpmnetwork.com/49be1ff3bbc1337ca058f14a12497da7/invoke.js"
            />
            <div id="container-49be1ff3bbc1337ca058f14a12497da7"></div>
          </div>

          {/* Adsterra Banner 728x90 - Bottom */}
          <div className="flex justify-center py-2 bg-gaming-dark/50">
            <div>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    atOptions = {
                      'key' : 'adfb842bf6e8b71a1ba1642fd609def7',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                    };
                  `,
                }}
              />
              <script
                src="https://www.highperformanceformat.com/adfb842bf6e8b71a1ba1642fd609def7/invoke.js"
                async
              />
            </div>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
