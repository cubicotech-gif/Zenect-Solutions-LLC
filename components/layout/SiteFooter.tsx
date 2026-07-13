import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { brand, fullAddress } from "@/lib/brand";
import { divisions } from "@/lib/catalog";
import NewsletterField from "@/components/ui/NewsletterField";

export default function SiteFooter() {
  const year = 2025; // build-time constant; keeps pages fully static

  return (
    <footer className="bg-navy text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="frame flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              Product notes &amp; restock alerts
            </p>
            <p className="mt-1 text-sm text-white/70">
              Occasional, useful, and easy to unsubscribe from.
            </p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterField />
          </div>
        </div>
      </div>

      <div className="frame py-14">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl font-bold tracking-wordmark text-white">
                {brand.shortName.toUpperCase()}
              </span>
              <span className="mt-1 font-display text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-teal-soft">
                Solutions
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {brand.tagline}. Supplying clinics, care teams, and households
              since {brand.founded}.
            </p>
          </div>

          <nav aria-label="Catalog">
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-label text-teal-soft">
              Catalog
            </p>
            <ul className="mt-4 space-y-2.5">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/catalog#${d.slug}`}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-label text-teal-soft">
              Company
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Zenect
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/contact#quote" className="hover:text-white">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link href="/console" className="hover:text-white">
                  Team console
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-label text-teal-soft">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal" />
                <span>{fullAddress()}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-teal" />
                <a href={`tel:${brand.phoneHref}`} className="hover:text-white">
                  {brand.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-teal" />
                <a href={`mailto:${brand.email}`} className="hover:text-white">
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p>
            {brand.address.city}, {brand.address.state} · Nationwide fulfillment
          </p>
        </div>
      </div>
    </footer>
  );
}
