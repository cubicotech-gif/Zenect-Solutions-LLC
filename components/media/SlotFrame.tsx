"use client";

import { useSlot } from "@/lib/mediaVault";

// Renders the image for a named slot, or a labeled placeholder when the slot is
// empty. Plain <img> keeps every page statically served straight from the
// Supabase CDN — no image-optimization functions on the host.

type Fit = "cover" | "contain";

export default function SlotFrame({
  slot,
  alt,
  className = "",
  fit = "cover",
  label,
}: {
  slot: string;
  alt: string;
  className?: string;
  fit?: Fit;
  label?: string;
}) {
  const { ready, entry } = useSlot(slot);

  if (!ready) {
    return <span className={`block animate-pulse bg-hairline/40 ${className}`} />;
  }

  if (!entry) {
    return (
      <span
        className={`flex items-center justify-center bg-clay-wash/70 ${className}`}
        aria-label={`${alt} (image not set)`}
        role="img"
      >
        <span className="px-4 text-center font-mono text-[0.62rem] uppercase tracking-label text-clay-deep/70">
          {label || alt}
        </span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={entry.url}
      alt={alt}
      className={className}
      style={{ objectFit: fit }}
      loading="lazy"
      decoding="async"
    />
  );
}
