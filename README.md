## Zenect Solutions

Marketing site and light CMS for **Zenect Solutions LLC**, a Columbus-based
medical-equipment supplier. Static-first Next.js frontend, Supabase backend,
built to run on the Vercel free tier.

The look is deliberate: a Clinical-Swiss system — warm off-white paper, ink
text, a single clay accent, grid-locked layout, hairline rules, and near-zero
motion. Type is Space Grotesk (display) over IBM Plex Sans (body) with IBM Plex
Mono for labels and data.

### Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Supabase — Postgres (forms + settings) and Storage (images), reached directly
  from the browser with the anon key under Row Level Security
- lucide-react icons

Every route is statically prerendered; there are no request-time server
functions. Images are served straight from the Supabase CDN
(`images.unoptimized`), so the host does no image optimization.

### Local development

```bash
npm install
cp .env.example .env.local   # then fill in the four keys
npm run dev                  # http://localhost:3000
```

Without Supabase keys the pages still render — image slots fall back to
placeholders and forms report that the backend is unconfigured.

### Structure

```
app/
  (site)/            marketing pages share the top-bar + footer layout
    page.tsx         home
    catalog/         product divisions & units
    about/           practice, values, timeline
    contact/         contact form, company info, quote request
  console/           passphrase-gated admin (media + submissions)
  layout.tsx         fonts, metadata, media provider
components/
  layout/            TopBar, SiteFooter
  media/             SlotFrame (slot-aware image with placeholder)
  console/           MediaManager, InboxPanel
  ui/                ContactForm, QuoteForm, NewsletterField
lib/
  brand.ts           company facts + site origin
  catalog.ts         divisions and units
  media.ts           named image-slot definitions
  supabaseClient.ts  browser client (anon key)
  mediaVault.tsx     one-shot bucket listing → per-slot URLs
```

### Admin console

Visit `/console` and enter the passphrase set in `NEXT_PUBLIC_CONSOLE_KEY`. The
gate is client-side and remembered for the browser session.

- **Media** — upload, replace, or delete every image slot (logo, favicon, hero,
  editorial panels, and one per product unit).
- **Submissions** — read contact messages and quote requests, and move each
  through `new → read → replied → archived`.

### Backend & deployment

See [`SETUP.md`](./SETUP.md) for the full walkthrough: run `SETUP.sql` in
Supabase, set the four environment variables in Vercel, redeploy, then upload the
artwork from `/console`.
