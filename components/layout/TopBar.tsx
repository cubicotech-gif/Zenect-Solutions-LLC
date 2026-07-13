"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Phone, ChevronRight } from "lucide-react";
import { brand } from "@/lib/brand";
import { divisions } from "@/lib/catalog";
import { useSlot } from "@/lib/mediaVault";

const routes = [
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Support" },
  { href: "/contact#quote", label: "Get a Quote" },
];

function Wordmark() {
  const { entry } = useSlot("wordmark");
  if (entry) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={entry.url}
        alt={brand.legalName}
        className="h-16 w-auto sm:h-20 lg:h-24"
      />
    );
  }
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-2xl font-bold tracking-wordmark text-navy">
        {brand.shortName.toUpperCase()}
      </span>
      <span className="mt-0.5 font-display text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-teal">
        Solutions
      </span>
    </span>
  );
}

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base === "/catalog"
      ? pathname.startsWith("/catalog")
      : pathname === base;
  };

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      q.trim() ? `/catalog?q=${encodeURIComponent(q.trim())}` : "/catalog"
    );
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-navy text-white">
        <div className="frame flex h-9 items-center justify-center text-center">
          <p className="text-xs font-medium">
            Same-day dispatch on stocked units across the Denver metro
            <ChevronRight className="ml-1 inline" size={13} />
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-hairline bg-white">
        <div className="frame flex h-24 items-center gap-5 sm:h-28 lg:h-32">
          <Link
            href="/"
            aria-label={`${brand.legalName} home`}
            className="shrink-0"
          >
            <Wordmark />
          </Link>

          {/* Search (desktop) */}
          <form
            onSubmit={onSearch}
            className="ml-2 hidden max-w-md flex-1 items-center lg:flex"
          >
            <div className="flex w-full items-center rounded-full border border-hairline bg-panel px-4 py-2 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <Search size={16} className="text-mist" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, categories, SKUs"
                aria-label="Search the catalog"
                className="w-full bg-transparent px-3 text-sm text-ink placeholder:text-mist focus:outline-none"
              />
            </div>
          </form>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-6">
            <nav className="hidden items-center gap-7 md:flex">
              {routes.slice(0, 3).map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className={`font-display text-sm font-semibold transition-colors ${
                    isActive(r.href) ? "text-brand" : "text-navy hover:text-brand"
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </nav>
            <a
              href={`tel:${brand.phoneHref}`}
              className="hidden items-center gap-2 font-display text-sm font-semibold text-navy hover:text-brand xl:flex"
            >
              <Phone size={15} className="text-teal" /> {brand.phone}
            </a>
            <Link
              href="/contact#quote"
              className="btn-primary hidden md:inline-flex"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              className="md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick-link band */}
      <div className="hidden border-b border-skyline bg-sky md:block">
        <div className="frame flex h-12 items-center gap-2 overflow-x-auto">
          <span className="mr-1 shrink-0 font-display text-[0.7rem] font-semibold uppercase tracking-label text-brand-deep">
            Shop by need
          </span>
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={`/catalog#${d.slug}`}
              className="pill-link shrink-0"
            >
              {d.name}
            </Link>
          ))}
          <Link href="/contact" className="pill-link shrink-0">
            Find a Rep
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-hairline bg-white md:hidden">
          <div className="frame py-4">
            <form onSubmit={onSearch} className="mb-4 flex items-center">
              <div className="flex w-full items-center rounded-full border border-hairline bg-panel px-4 py-2">
                <Search size={16} className="text-mist" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products"
                  aria-label="Search the catalog"
                  className="w-full bg-transparent px-3 text-sm focus:outline-none"
                />
              </div>
            </form>
            <nav className="flex flex-col">
              {routes.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-hairline py-3.5 font-display text-base font-semibold ${
                    isActive(r.href) ? "text-brand" : "text-navy"
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-wrap gap-2">
              {divisions.map((d) => (
                <Link
                  key={d.slug}
                  href={`/catalog#${d.slug}`}
                  onClick={() => setOpen(false)}
                  className="pill-link"
                >
                  {d.name}
                </Link>
              ))}
            </div>
            <a
              href={`tel:${brand.phoneHref}`}
              className="mt-5 flex items-center gap-2 font-display font-semibold text-navy"
            >
              <Phone size={16} className="text-teal" /> {brand.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
