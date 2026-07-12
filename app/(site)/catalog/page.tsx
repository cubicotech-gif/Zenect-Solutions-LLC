import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import SlotFrame from "@/components/media/SlotFrame";
import { divisions } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Wheelchairs, mobility aids, diabetic care, and orthopedic bracing — every unit stocked, fitted, and serviced by Zenect Solutions.",
};

export default function CatalogPage() {
  return (
    <>
      <header className="border-b border-hairline">
        <div className="frame py-16 lg:py-20">
          <p className="kicker">Catalog · 2025</p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Four divisions, eight units, all in stock.
          </h1>
          <p className="mt-5 max-w-xl text-base text-graphite">
            No drop-shipped listings. Every unit below is fitted to the user and
            serviced by the same specialist who sold it.
          </p>
        </div>
      </header>

      {divisions.map((division) => (
        <section
          key={division.slug}
          id={division.slug}
          className="scroll-mt-20 border-b border-hairline"
        >
          <div className="frame py-16 lg:py-20">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-sm text-clay">
                {division.index}
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {division.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-graphite">
                  {division.summary}
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {division.units.map((unit) => (
                <article
                  key={unit.slug}
                  id={unit.slug}
                  className="scroll-mt-24 flex flex-col bg-paper p-6 lg:p-8"
                >
                  <div className="relative aspect-square border border-hairline bg-panel">
                    <SlotFrame
                      slot={unit.mediaSlot}
                      alt={unit.name}
                      label={unit.name}
                      className="h-full w-full"
                      fit="contain"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {unit.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">
                    {unit.blurb}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                    {unit.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-graphite"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-clay"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex-1" />
                  <Link
                    href={`/contact#quote`}
                    className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-label text-clay hover:text-clay-deep"
                  >
                    Request pricing <ArrowUpRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-ink">
        <div className="frame flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-2xl font-semibold text-paper">
            Not sure which unit fits? Send the details and we&rsquo;ll spec it.
          </h2>
          <Link href="/contact#quote" className="btn-clay">
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
