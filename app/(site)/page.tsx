import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import SlotFrame from "@/components/media/SlotFrame";
import { brand } from "@/lib/brand";
import { divisions } from "@/lib/catalog";

const stats = [
  { figure: "14 yrs", note: "Supplying Ohio care teams" },
  { figure: "1,900+", note: "Units placed in service" },
  { figure: "48 hr", note: "Typical fulfillment window" },
  { figure: "1:1", note: "Named specialist per account" },
];

const capabilities = [
  {
    n: "A",
    head: "We stock what we sell",
    copy: "Every catalog unit is on our shelf, not a drop-ship listing. If it ships, we&rsquo;ve had our hands on it.",
  },
  {
    n: "B",
    head: "Fit before invoice",
    copy: "A specialist sizes bracing, seating, and aids against the actual user before anything is billed.",
  },
  {
    n: "C",
    head: "Service after the box",
    copy: "Adjustments, replacement parts, and warranty claims run through one person who knows your account.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b border-hairline">
        <div className="frame grid gap-0 lg:grid-cols-2">
          <div className="settle flex flex-col justify-center py-16 lg:py-24 lg:pr-14">
            <p className="kicker">Medical equipment · Columbus, OH</p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Dependable equipment
              <br />
              for everyday care.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">
              {brand.positioning}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact#quote" className="btn-clay">
                Request a quote
              </Link>
              <Link href="/catalog" className="btn-ghost">
                Browse the catalog
              </Link>
            </div>
            <a
              href={`tel:${brand.phoneHref}`}
              className="mt-8 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-label text-mist hover:text-clay"
            >
              <Phone size={13} /> {brand.phone}
            </a>
          </div>

          <div className="relative min-h-[320px] border-hairline lg:min-h-[560px] lg:border-l">
            <SlotFrame
              slot="hero-still"
              alt="Zenect equipment in use"
              label="Home Hero"
              className="h-full w-full"
              fit="cover"
            />
          </div>
        </div>
      </section>

      {/* ── Stat strip ───────────────────────────────────── */}
      <section className="border-b border-hairline bg-panel">
        <div className="frame grid grid-cols-2 divide-x divide-hairline lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.figure} className="px-6 py-10 first:pl-0 lg:px-8">
              <p className="font-display text-3xl font-semibold text-clay lg:text-4xl">
                {s.figure}
              </p>
              <p className="mt-2 text-sm text-graphite">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capability / why Zenect ──────────────────────── */}
      <section className="frame py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative aspect-[4/5] max-h-[560px] border border-hairline">
            <SlotFrame
              slot="capability-still"
              alt="A Zenect specialist fitting equipment"
              label="Why-Zenect Panel"
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="kicker">Why Zenect</p>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              A supplier that stays on the line after the delivery.
            </h2>
            <div className="mt-10 divide-y divide-hairline border-t border-hairline">
              {capabilities.map((c) => (
                <div key={c.n} className="flex gap-6 py-7">
                  <span className="font-mono text-sm text-clay">{c.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink">
                      {c.head}
                    </h3>
                    <p
                      className="mt-2 max-w-md text-sm leading-relaxed text-graphite"
                      dangerouslySetInnerHTML={{ __html: c.copy }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Division overview ────────────────────────────── */}
      <section className="border-t border-hairline bg-panel">
        <div className="frame py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">Four divisions</p>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
                What we carry
              </h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-label text-clay hover:text-clay-deep"
            >
              Full catalog <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-12 border-t border-hairline">
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/catalog#${d.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-hairline py-8 transition-colors hover:bg-paper"
              >
                <span className="font-mono text-sm text-mist">{d.index}</span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink group-hover:text-clay">
                    {d.name}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-graphite">
                    {d.summary}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-mist transition-colors group-hover:text-clay"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────── */}
      <section className="bg-ink">
        <div className="frame flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-label text-clay-soft">
              Start a consultation
            </p>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold text-paper sm:text-3xl">
              Tell us the user, the setting, and the timeline — we&rsquo;ll spec
              the right equipment.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact#quote" className="btn-clay">
              Request a quote
            </Link>
            <a
              href={`tel:${brand.phoneHref}`}
              className="inline-flex items-center gap-2 border border-paper/40 px-6 py-3 font-mono text-[0.72rem] uppercase tracking-label text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <Phone size={13} /> Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
