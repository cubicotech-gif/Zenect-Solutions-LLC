import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SlotFrame from "@/components/media/SlotFrame";
import { divisions } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Wheelchairs, mobility aids, diabetic care, and orthopedic bracing — every unit stocked, fitted, and serviced by Zenect Solutions in Denver, CO.",
};

export default function CatalogPage() {
  return (
    <>
      {/* Hero header */}
      <header className="bg-brand-sweep">
        <div className="frame py-14 lg:py-20">
          <p className="font-display text-xs font-semibold uppercase tracking-label text-teal-soft">
            Catalog · 2025
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
            Four divisions, eight units, all in stock.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80">
            No drop-shipped listings. Every unit below is fitted to the user and
            serviced by the same specialist who sold it.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {divisions.map((d) => (
              <a
                key={d.slug}
                href={`#${d.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-navy"
              >
                {d.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {divisions.map((division, di) => (
        <section
          key={division.slug}
          id={division.slug}
          className={`scroll-mt-40 md:scroll-mt-60 lg:scroll-mt-72 ${di % 2 === 1 ? "bg-panel" : "bg-white"}`}
        >
          <div className="frame py-14 lg:py-20">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-lg font-bold text-teal-deep">
                {division.index}
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                  {division.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-graphite">
                  {division.summary}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {division.units.map((unit) => (
                <article
                  key={unit.slug}
                  id={unit.slug}
                  className="card flex scroll-mt-40 md:scroll-mt-60 lg:scroll-mt-72 flex-col overflow-hidden"
                >
                  <div className="relative aspect-[5/3] border-b border-hairline bg-sky">
                    <SlotFrame
                      slot={unit.mediaSlot}
                      alt={unit.name}
                      label={unit.name}
                      className="h-full w-full"
                      fit="contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <h3 className="font-display text-xl font-semibold text-navy">
                      {unit.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">
                      {unit.blurb}
                    </p>

                    <ul className="mt-5 grid gap-2.5 border-t border-hairline pt-5">
                      {unit.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-graphite"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky text-teal-deep">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex-1" />
                    <Link
                      href="/contact#quote"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                    >
                      Request pricing <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-brand-sweep">
        <div className="frame flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-2xl font-bold text-white">
            Not sure which unit fits? Send the details and we&rsquo;ll spec it.
          </h2>
          <Link href="/contact#quote" className="btn-gold">
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
