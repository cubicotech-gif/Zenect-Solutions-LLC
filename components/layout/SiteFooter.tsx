import Link from "next/link";
import { brand, fullAddress } from "@/lib/brand";
import { divisions } from "@/lib/catalog";
import NewsletterField from "@/components/ui/NewsletterField";

export default function SiteFooter() {
  const year = 2025; // build-time constant; keeps pages fully static

  return (
    <footer className="border-t border-hairline bg-panel">
      <div className="frame py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold tracking-wordmark">
                {brand.shortName}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-label text-clay">
                Solutions
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite">
              {brand.tagline}. Serving clinics, care teams, and households since{" "}
              {brand.founded}.
            </p>
          </div>

          <nav aria-label="Catalog">
            <p className="kicker-muted">Catalog</p>
            <ul className="mt-4 space-y-2">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/catalog#${d.slug}`}
                    className="text-sm text-graphite hover:text-clay"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="kicker-muted">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-graphite">
              <li>
                <Link href="/about" className="hover:text-clay">
                  Practice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-clay">
                  Contact
                </Link>
              </li>
              <li>
                <a href={`tel:${brand.phoneHref}`} className="hover:text-clay">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-clay">
                  {brand.email}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="kicker-muted">Field notes</p>
            <p className="mt-4 text-sm text-graphite">
              Occasional product notes and restock alerts. No noise.
            </p>
            <div className="mt-4">
              <NewsletterField />
            </div>
          </div>
        </div>

        <div className="rule mt-14 flex flex-col gap-4 pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-label">{fullAddress()}</p>
        </div>
      </div>
    </footer>
  );
}
