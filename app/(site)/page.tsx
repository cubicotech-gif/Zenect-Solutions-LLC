import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Truck,
  Ruler,
  Headphones,
} from "lucide-react";
import SlotFrame from "@/components/media/SlotFrame";
import { brand } from "@/lib/brand";
import { divisions } from "@/lib/catalog";

const stats = [
  { figure: "14 yrs", note: "Serving Colorado care teams" },
  { figure: "1,900+", note: "Units placed in service" },
  { figure: "48 hr", note: "Typical fulfillment window" },
  { figure: "1:1", note: "Named specialist per account" },
];

const capabilities = [
  {
    icon: ShieldCheck,
    head: "We stock what we sell",
    copy: "Every catalog unit sits on our shelf — not a drop-ship listing. If it ships, we&rsquo;ve had our hands on it.",
  },
  {
    icon: Ruler,
    head: "Fit before invoice",
    copy: "A specialist sizes bracing, seating, and aids against the actual user before anything is billed.",
  },
  {
    icon: Headphones,
    head: "Service after the box",
    copy: "Adjustments, parts, and warranty claims run through one person who already knows your account.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-sweep">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, rgba(111,208,222,0.5), transparent 45%), radial-gradient(circle at 10% 90%, rgba(255,255,255,0.18), transparent 40%)",
          }}
        />
        <div className="frame relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="settle text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-label text-teal-soft">
              Medical equipment · Denver, CO
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Dependable equipment for everyday care.
            </h1>
            <p className="mt-5 max-w-lg text-lg italic text-white/85">
              Stocked here. Fitted in person. Backed after delivery.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
              {brand.positioning}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/catalog" className="btn-gold">
                Shop the catalog <ArrowRight size={16} />
              </Link>
              <Link href="/contact#quote" className="btn-onblue">
                Request a quote
              </Link>
            </div>
            <a
              href={`tel:${brand.phoneHref}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone size={15} className="text-teal-soft" /> {brand.phone}
            </a>
          </div>

          {/* Product card */}
          <div className="settle">
            <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white p-3 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-panel">
                <SlotFrame
                  slot="hero-still"
                  alt="Featured Zenect equipment"
                  label="Home Hero"
                  className="h-full w-full"
                  fit="cover"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <div>
                  <p className="font-display text-sm font-semibold text-navy">
                    Featured this month
                  </p>
                  <p className="text-xs text-graphite">
                    Mobility &amp; recovery essentials
                  </p>
                </div>
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-deep"
                >
                  Browse <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro band ───────────────────────────────────── */}
      <section className="frame flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            Stocked in Denver. Built for care.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-graphite">
            Browse equipment chosen for how it performs in real care settings —
            durable mobility, monitoring, and bracing that our specialists size,
            deliver, and service. No marketplace guesswork.
          </p>
        </div>
        <Link href="/catalog" className="btn-primary shrink-0">
          Shop all <ArrowRight size={16} />
        </Link>
      </section>

      {/* ── Category cards ───────────────────────────────── */}
      <section className="bg-panel">
        <div className="frame py-16 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">Shop by category</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                Four divisions, ready to ship
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/catalog#${d.slug}`}
                className="group card flex flex-col overflow-hidden transition-shadow hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sky">
                  <SlotFrame
                    slot={d.units[0].mediaSlot}
                    alt={d.name}
                    label={d.name}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    fit="contain"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-[0.68rem] font-semibold text-brand">
                    {d.index}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-navy group-hover:text-brand">
                    {d.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-graphite">
                    {d.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat band ────────────────────────────────────── */}
      <section className="bg-teal-sweep">
        <div className="frame grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.figure} className="text-white">
              <p className="font-display text-3xl font-bold lg:text-4xl">
                {s.figure}
              </p>
              <p className="mt-1.5 text-sm text-white/80">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Zenect ───────────────────────────────────── */}
      <section className="frame py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="kicker">Why Zenect</p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
              A supplier that stays on the line after the delivery.
            </h2>
            <div className="mt-8 space-y-5">
              {capabilities.map((c) => (
                <div key={c.head} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky text-brand">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy">
                      {c.head}
                    </h3>
                    <p
                      className="mt-1 max-w-md text-sm leading-relaxed text-graphite"
                      dangerouslySetInnerHTML={{ __html: c.copy }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Our story
              </Link>
              <Link href="/contact" className="btn-ghost">
                Talk to a specialist
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-hairline shadow-card">
            <div className="relative aspect-[4/5]">
              <SlotFrame
                slot="capability-still"
                alt="A Zenect specialist fitting equipment"
                label="Why-Zenect Panel"
                className="h-full w-full"
              />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-card">
              <Truck size={16} className="text-teal-deep" />
              <span className="font-display text-xs font-semibold text-navy">
                Same-day dispatch, Denver metro
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────── */}
      <section className="bg-brand-sweep">
        <div className="frame flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-label text-teal-soft">
              Start a consultation
            </p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">
              Tell us the user, the setting, and the timeline — we&rsquo;ll spec
              the right equipment.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact#quote" className="btn-gold">
              Request a quote
            </Link>
            <a href={`tel:${brand.phoneHref}`} className="btn-onblue">
              <Phone size={15} /> Call us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
