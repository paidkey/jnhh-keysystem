import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gaming-border bg-gaming-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gaming-red font-bold text-white">
                JH
              </span>
              <div>
                <span className="block text-sm font-bold text-white">
                  JN HH Gaming Rivals
                </span>
                <span className="block text-xs text-gaming-red-light">Key System</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              The official key generation and management platform for JN HH Gaming
              Rivals. Secure access for competitive gamers worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/#features", label: "Features" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/generate-key", label: "Generate Key" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-gaming-red-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2">
              {["Documentation", "Discord", "Contact Us", "FAQ"].map((item) => (
                <li key={item}>
                  <span className="cursor-default text-sm text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gaming-border pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} JN HH Gaming Rivals. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span
                key={item}
                className="cursor-default text-sm text-gray-500 hover:text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
