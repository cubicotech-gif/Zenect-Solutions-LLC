import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import QuoteForm from "@/components/ui/QuoteForm";
import { brand, fullAddress } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Support",
  description: `Reach ${brand.legalName} in Denver, CO. Send a message or request a written equipment quote — a specialist replies within one business day.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero header */}
      <header className="bg-brand-sweep">
        <div className="frame py-14 lg:py-20">
          <p className="font-display text-xs font-semibold uppercase tracking-label text-teal-soft">
            Support
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
            Talk to a specialist, not a call center.
          </h1>
        </div>
      </header>

      <div className="frame grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        {/* Left: contact form */}
        <section className="card p-7 lg:p-9">
          <h2 className="font-display text-2xl font-bold text-navy">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-graphite">
            General questions, service, or anything that isn&rsquo;t a quote.
          </p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </section>

        {/* Right: company info */}
        <aside>
          <h2 className="font-display text-2xl font-bold text-navy">Find us</h2>
          <ul className="mt-7 space-y-6">
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-brand">
                <MapPin size={18} />
              </span>
              <div>
                <p className="field-label mb-1">Storeroom</p>
                <p className="text-sm text-graphite">{fullAddress()}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-brand">
                <Phone size={18} />
              </span>
              <div>
                <p className="field-label mb-1">Phone</p>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="text-sm text-graphite hover:text-brand"
                >
                  {brand.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-brand">
                <Mail size={18} />
              </span>
              <div>
                <p className="field-label mb-1">Email</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-graphite hover:text-brand"
                >
                  {brand.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky text-brand">
                <Clock size={18} />
              </span>
              <div className="w-full">
                <p className="field-label mb-2">Hours</p>
                <dl className="space-y-1.5">
                  {brand.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex justify-between gap-6 text-sm text-graphite"
                    >
                      <dt>{h.days}</dt>
                      <dd className="text-mist">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>

          {/* Map area */}
          <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline shadow-card">
            <iframe
              title={`Map to ${brand.legalName}`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                fullAddress()
              )}&output=embed`}
            />
          </div>
        </aside>
      </div>

      {/* Quote request */}
      <section id="quote" className="scroll-mt-56 bg-panel">
        <div className="frame py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="kicker">Request a quote</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
                Priced, in writing, usually same day.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-graphite">
                Tell us the category, rough quantity, and the setting. We confirm
                availability and send an itemized quote — no obligation.
              </p>
            </div>
            <div className="card p-7 lg:p-9">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
