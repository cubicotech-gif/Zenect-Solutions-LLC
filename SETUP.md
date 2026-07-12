# Zenect Solutions — Deployment Setup

Four steps take this from a fresh clone to a live site. Budget ~15 minutes.

---

## 1 · Provision the backend (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**.
3. Paste the entire contents of [`SETUP.sql`](./SETUP.sql) and **Run**.

That one script creates every table (`inquiries`, `quote_requests`,
`newsletter_signups`, `site_settings`), the public **`brand-media`** storage
bucket (5 MB limit, images only), and all Row-Level-Security + storage policies.
It is idempotent — re-run it any time without harm.

From **Project Settings → API**, copy two values for the next step:
- **Project URL**
- **anon / public** key

---

## 2 · Set environment variables (Vercel)

In **Vercel → Project → Settings → Environment Variables**, add:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_STORE_URL` | your Supabase Project URL |
| `NEXT_PUBLIC_STORE_KEY` | your Supabase anon/public key |
| `NEXT_PUBLIC_CONSOLE_KEY` | a passphrase to unlock `/console` |
| `NEXT_PUBLIC_SITE_ORIGIN` | e.g. `https://zenectsolutionsllc.com` |

For local development, copy `.env.example` → `.env.local` and fill the same keys.

> **Security note.** The site is fully client-side and uses the anon key, so
> submissions are readable by anyone holding that key; `/console` is guarded only
> by the client-side passphrase. For stronger isolation, add Supabase Auth and
> tighten the `SELECT`/`UPDATE` policies in `SETUP.sql` to authenticated staff.

---

## 3 · Deploy

Push to the connected Git branch (or click **Redeploy** in Vercel). The build is
fully static — every route prerenders as `○ (Static)`, so it runs comfortably on
the free tier with no per-request functions.

---

## 4 · Upload the artwork

Open `https://your-domain/console`, enter the passphrase (`NEXT_PUBLIC_CONSOLE_KEY`),
and use the **Media** tab to fill each slot. Empty slots show a labeled
placeholder until an image is uploaded. The **Submissions** tab lists incoming
messages and quote requests with a `new → read → replied → archived` workflow.

### Image slots & recommended dimensions

| Slot key | Where it appears | Recommended (px) |
| --- | --- | --- |
| `wordmark` | Top bar + footer logo | 480 × 160 (transparent) |
| `favicon` | Browser tab icon | 512 × 512 (square) |
| `hero-still` | Home hero | 1600 × 1100 |
| `capability-still` | Home "Why Zenect" panel | 1200 × 1400 |
| `story-still` | About portrait | 1200 × 1500 |
| `unit-featherframe-transit` | Featherframe Transit Chair | 1000 × 1000 |
| `unit-terra-recline` | Terra Recline Power Chair | 1000 × 1000 |
| `unit-stride-rollator` | Stride Rollator | 1000 × 1000 |
| `unit-cadence-walker` | Cadence Folding Walker | 1000 × 1000 |
| `unit-glucotrack-kit` | GlucoTrack Monitor Kit | 1000 × 1000 |
| `unit-softstep-footwear` | SoftStep Diabetic Footwear | 1000 × 1000 |
| `unit-axisguard-knee` | AxisGuard Knee Brace | 1000 × 1000 |
| `unit-meridian-lumbar` | Meridian Lumbar Support | 1000 × 1000 |

Product images look best on a plain, light background. Upload accepts PNG, JPG,
WEBP, SVG, and ICO up to 5 MB.
