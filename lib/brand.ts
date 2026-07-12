// Central record of company facts. Referenced across pages and metadata.
// (Named `brand` — a single source of truth for the storefront's identity.)

export const brand = {
  legalName: "Zenect Solutions LLC",
  shortName: "Zenect",
  tagline: "Dependable equipment for everyday care",
  // A fresh, plainspoken positioning line — no stock "trusted partner" phrasing.
  positioning:
    "A medical-equipment supplier for clinics, care teams, and households that need gear to work the first time, every time.",
  domain: "zenectsolutionsllc.com",
  phone: "+1 (614) 555-0142",
  phoneHref: "+16145550142",
  email: "hello@zenectsolutionsllc.com",
  address: {
    line1: "218 Marconi Boulevard, Suite 4",
    city: "Columbus",
    state: "OH",
    zip: "43215",
  },
  hours: [
    { days: "Monday – Thursday", time: "8:00a – 6:00p" },
    { days: "Friday", time: "8:00a – 4:00p" },
    { days: "Saturday", time: "9:00a – 1:00p" },
    { days: "Sunday", time: "Closed" },
  ],
  founded: 2011,
  social: {
    // Placeholders — swap when live accounts exist.
    linkedin: "#",
    instagram: "#",
  },
} as const;

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${brand.domain}`;

export function fullAddress() {
  const { line1, city, state, zip } = brand.address;
  return `${line1}, ${city}, ${state} ${zip}`;
}
