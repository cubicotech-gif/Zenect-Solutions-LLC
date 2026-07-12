import type { Metadata } from "next";
import Link from "next/link";
import SlotFrame from "@/components/media/SlotFrame";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "How Zenect Solutions works — a Columbus medical-equipment supplier built on stocked inventory, in-person fitting, and one specialist per account.",
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
    body: "Started as a two-person operation supplying home wheelchairs to Franklin County.",
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
      <header className="border-b border-hairline">
        <div className="frame grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="py-16 lg:py-24 lg:pr-16">
            <p className="kicker">Our practice</p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              A supply company that acts like a care team.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite">
              {brand.legalName} has spent {2025 - brand.founded} years doing one
              thing well: putting reliable equipment in the hands of the people
              who depend on it, then staying reachable when something needs an
              adjustment. We are not a marketplace. We are a stocked storeroom
              with a fitting bay and a phone that a person answers.
            </p>
          </div>
          <div className="relative min-h-[300px] border-hairline lg:border-l">
            <SlotFrame
              slot="story-still"
              alt="Inside the Zenect storeroom"
              label="About Portrait"
              className="h-full w-full"
            />
          </div>
        </div>
      </header>

      {/* Values */}
      <section className="frame py-20 lg:py-28">
        <p className="kicker">What we hold to</p>
        <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold text-ink sm:text-4xl">
          Four commitments, kept in writing.
        </h2>
        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.tag} className="bg-paper p-8 lg:p-10">
              <span className="font-mono text-sm text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                {v.tag}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-hairline bg-panel">
        <div className="frame py-20 lg:py-28">
          <p className="kicker">Track record</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Fourteen years, one model.
          </h2>
          <div className="mt-14 border-t border-hairline">
            {timeline.map((t) => (
              <div
                key={t.year}
                className="grid gap-4 border-b border-hairline py-8 sm:grid-cols-[140px_1fr]"
              >
                <p className="font-mono text-lg text-clay">{t.year}</p>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">
                    {t.head}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-graphite">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="frame flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl font-display text-2xl font-semibold text-paper">
            Work with a supplier that answers. Let&rsquo;s talk equipment.
          </h2>
          <Link href="/contact" className="btn-clay">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
