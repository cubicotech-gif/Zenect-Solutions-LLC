"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { useSlot } from "@/lib/mediaVault";

const routes = [
  { href: "/", label: "Index" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "Practice" },
  { href: "/contact", label: "Contact" },
];

function Wordmark() {
  const { entry } = useSlot("wordmark");
  if (entry) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={entry.url} alt={brand.legalName} className="h-7 w-auto" />;
  }
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-xl font-semibold tracking-wordmark text-ink">
        {brand.shortName}
      </span>
      <span className="hidden font-mono text-[0.6rem] uppercase tracking-label text-clay sm:inline">
        Solutions
      </span>
    </span>
  );
}

export default function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur">
      <div className="frame flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${brand.legalName} home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`relative py-1 font-mono text-[0.72rem] uppercase tracking-label transition-colors ${
                isActive(r.href) ? "text-ink" : "text-mist hover:text-ink"
              }`}
            >
              {r.label}
              {isActive(r.href) && (
                <span className="absolute -bottom-[1.35rem] left-0 h-[2px] w-full bg-clay" />
              )}
            </Link>
          ))}
          <Link href="/contact#quote" className="btn-clay">
            Request a quote
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-paper md:hidden">
          <nav className="frame flex flex-col py-2">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                className={`border-b border-hairline/70 py-4 font-mono text-[0.78rem] uppercase tracking-label ${
                  isActive(r.href) ? "text-clay" : "text-ink"
                }`}
              >
                {r.label}
              </Link>
            ))}
            <Link
              href="/contact#quote"
              onClick={() => setOpen(false)}
              className="btn-clay mt-4 justify-center"
            >
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
