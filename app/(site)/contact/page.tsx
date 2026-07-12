import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import QuoteForm from "@/components/ui/QuoteForm";
import { brand, fullAddress } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${brand.legalName} in Columbus, OH. Send a message or request a written equipment quote — a specialist replies within one business day.`,
};

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-hairline">
        <div className="frame py-16 lg:py-20">
          <p className="kicker">Contact</p>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Talk to a specialist, not a call center.
          </h1>
        </div>
      </header>

      <div className="frame grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: contact form */}
        <section className="border-hairline py-14 lg:border-r lg:py-20 lg:pr-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-graphite">
            General questions, service, or anything that isn&rsquo;t a quote.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </section>

        {/* Right: company info */}
        <aside className="py-14 lg:py-20 lg:pl-16">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Find us
          </h2>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <MapPin size={18} className="mt-0.5 shrink-0 text-clay" />
              <div>
                <p className="field-label mb-1">Storeroom</p>
                <p className="text-sm text-graphite">{fullAddress()}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone size={18} className="mt-0.5 shrink-0 text-clay" />
              <div>
                <p className="field-label mb-1">Phone</p>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="text-sm text-graphite hover:text-clay"
                >
                  {brand.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={18} className="mt-0.5 shrink-0 text-clay" />
              <div>
                <p className="field-label mb-1">Email</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-graphite hover:text-clay"
                >
                  {brand.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock size={18} className="mt-0.5 shrink-0 text-clay" />
              <div className="w-full">
                <p className="field-label mb-2">Hours</p>
                <dl className="space-y-1.5">
                  {brand.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex justify-between gap-6 text-sm text-graphite"
                    >
                      <dt>{h.days}</dt>
                      <dd className="font-mono text-xs text-mist">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>

          {/* Map area */}
          <div className="mt-8 aspect-[4/3] w-full overflow-hidden border border-hairline">
            <iframe
              title={`Map to ${brand.legalName}`}
              className="h-full w-full grayscale"
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
      <section
        id="quote"
        className="scroll-mt-16 border-t border-hairline bg-panel"
      >
        <div className="frame py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="kicker">Request a quote</p>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Priced, in writing, usually same day.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-graphite">
                Tell us the category, rough quantity, and the setting. We confirm
                availability and send an itemized quote — no obligation.
              </p>
            </div>
            <div className="border border-hairline bg-paper p-6 lg:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
