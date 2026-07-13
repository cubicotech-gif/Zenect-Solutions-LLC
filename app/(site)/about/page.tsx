import type { Metadata } from "next";
import Link from "next/link";
import SlotFrame from "@/components/media/SlotFrame";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Company",
  description:
    "How Zenect Solutions works — a Denver medical-equipment supplier built on stocked inventory, in-person fitting, and one specialist per account.",
};

const values = [
  {
    tag: "Held, not listed",
    body: "We only sell what we keep in the building. A catalog is a promise; ours is one we can fulfill the same week.",
  },
  {
    tag: "Fit is the product",
    body: "The right chair sized wrong is the wrong chair. Fitting is a step, not an upsell.",
  },
  {
    tag: "One line, one name",
    body: "Accounts get a specific specialist. No queue, no ticket lottery — the person who set it up answers the phone.",
  },
  {
    tag: "Plain pricing",
    body: "Written quotes, itemized. What we say it costs is what the invoice reads.",
  },
];

const timeline = [
  {
    year: "2011",
    head: "A single storeroom",
    body: "Started as a two-person operation supplying home wheelchairs across the Denver metro.",
  },
  {
    year: "2015",
    head: "Fitting bay added",
    body: "Brought bracing and seating fitting in-house so users leave adjusted, not just delivered.",
  },
  {
    year: "2019",
    head: "Four divisions",
    body: "Extended into diabetic care and orthopedic bracing at the request of referring clinics.",
  },
  {
    year: "2024",
    head: "Same phone, more shelves",
    body: "Doubled warehouse capacity while keeping the one-specialist-per-account model intact.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero header */}
      <header className="bg-brand-sweep">
        <div className="frame grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div className="text-white">
            <p className="font-display text-xs font-semibold uppercase tracking-label text-teal-soft">
              Our company
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
              A supply company that acts like a care team.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
              {brand.legalName} has spent {2025 - brand.founded} years doing one
              thing well: putting reliable equipment in the hands of the people
              who depend on it, then staying reachable when something needs an
              adjustment. We are not a marketplace. We are a stocked storeroom
              with a fitting bay and a phone that a person answers.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-lift">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel">
              <SlotFrame
                slot="story-still"
                alt="Inside the Zenect storeroom"
                label="About Portrait"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Values */}
      <section className="frame py-16 lg:py-24">
        <p className="kicker">What we hold to</p>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-bold text-navy sm:text-4xl">
          Four commitments, kept in writing.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.tag} className="card p-7 lg:p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky font-display text-sm font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                {v.tag}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-panel">
        <div className="frame py-16 lg:py-24">
          <p className="kicker">Track record</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
            Fourteen years, one model.
          </h2>
          <div className="mt-10 space-y-4">
            {timeline.map((t) => (
              <div
                key={t.year}
                className="card grid gap-4 p-6 sm:grid-cols-[140px_1fr] lg:p-7"
              >
                <p className="font-display text-2xl font-bold text-teal-deep">
                  {t.year}
                </p>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {t.head}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-graphite">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-sweep">
        <div className="frame flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-2xl font-bold text-white">
            Work with a supplier that answers. Let&rsquo;s talk equipment.
          </h2>
          <Link href="/contact" className="btn-gold">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
