// Named image slots. Every image on the site renders from one of these keys,
// managed from the console. Dimensions are recommendations for uploads.

import { allUnits } from "./catalog";

export type SlotGroup = "identity" | "editorial" | "product";

export type MediaSlot = {
  key: string;
  label: string;
  group: SlotGroup;
  hint: string;
  ratio: string; // recommended pixel dimensions
};

const identity: MediaSlot[] = [
  {
    key: "wordmark",
    label: "Wordmark / Logo",
    group: "identity",
    hint: "Transparent PNG or SVG, sits in the top bar and footer.",
    ratio: "480 × 160",
  },
  {
    key: "favicon",
    label: "Favicon",
    group: "identity",
    hint: "Square mark used for the browser tab.",
    ratio: "512 × 512",
  },
];

const editorial: MediaSlot[] = [
  {
    key: "hero-still",
    label: "Home Hero",
    group: "editorial",
    hint: "Wide, calm image behind the opening statement.",
    ratio: "1600 × 1100",
  },
  {
    key: "capability-still",
    label: "Why-Zenect Panel",
    group: "editorial",
    hint: "Supports the capability section on the home page.",
    ratio: "1200 × 1400",
  },
  {
    key: "story-still",
    label: "About Portrait",
    group: "editorial",
    hint: "Vertical image beside the company story.",
    ratio: "1200 × 1500",
  },
];

const product: MediaSlot[] = allUnits().map((u) => ({
  key: u.mediaSlot,
  label: u.name,
  group: "product" as const,
  hint: "Product image on a plain, light background.",
  ratio: "1000 × 1000",
}));

export const mediaSlots: MediaSlot[] = [...identity, ...editorial, ...product];

export const slotGroups: { id: SlotGroup; title: string }[] = [
  { id: "identity", title: "Identity" },
  { id: "editorial", title: "Editorial" },
  { id: "product", title: "Product Units" },
];

export function slotByKey(key: string) {
  return mediaSlots.find((s) => s.key === key);
}
