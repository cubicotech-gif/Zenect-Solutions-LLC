"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, ImageOff, Loader2 } from "lucide-react";
import { getStore, STORE_BUCKET } from "@/lib/supabaseClient";
import { useVault } from "@/lib/mediaVault";
import { mediaSlots, slotGroups, MediaSlot } from "@/lib/media";

const MAX_BYTES = 5 * 1024 * 1024;
const OK_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/x-icon"];

function SlotCard({ slot }: { slot: MediaSlot }) {
  const { resolve, refresh } = useVault();
  const entry = resolve(slot.key);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"idle" | "up" | "del">("idle");
  const [note, setNote] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setNote(null);

    if (!OK_TYPES.includes(file.type)) {
      setNote("Use PNG, JPG, WEBP, SVG, or ICO.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setNote("File exceeds 5 MB.");
      return;
    }
    const store = getStore();
    if (!store) {
      setNote("Storage not configured.");
      return;
    }
    setBusy("up");
    const { error } = await store.storage
      .from(STORE_BUCKET)
      .upload(slot.key, file, { upsert: true, contentType: file.type });
    setBusy("idle");
    if (error) {
      setNote(error.message);
      return;
    }
    await refresh();
  }

  async function onDelete() {
    const store = getStore();
    if (!store) return;
    setBusy("del");
    const { error } = await store.storage.from(STORE_BUCKET).remove([slot.key]);
    setBusy("idle");
    if (error) {
      setNote(error.message);
      return;
    }
    await refresh();
  }

  return (
    <div className="flex flex-col border border-hairline bg-paper">
      <div className="relative aspect-video border-b border-hairline bg-panel">
        {entry ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.url}
            alt={slot.label}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-mist">
            <ImageOff size={20} />
            <span className="font-mono text-[0.6rem] uppercase tracking-label">
              Empty
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-sm font-medium text-ink">
            {slot.label}
          </p>
          <span className="font-mono text-[0.6rem] text-mist">{slot.ratio}</span>
        </div>
        <p className="mt-1 text-xs leading-snug text-graphite">{slot.hint}</p>
        <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-label text-mist">
          slot: {slot.key}
        </p>

        {note && <p className="mt-2 text-xs text-teal-deep">{note}</p>}

        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy !== "idle"}
            className="flex flex-1 items-center justify-center gap-2 bg-ink px-3 py-2 font-mono text-[0.62rem] uppercase tracking-label text-paper transition-colors hover:bg-teal disabled:opacity-60"
          >
            {busy === "up" ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Upload size={13} />
            )}
            {entry ? "Replace" : "Upload"}
          </button>
          {entry && (
            <button
              type="button"
              onClick={onDelete}
              disabled={busy !== "idle"}
              aria-label={`Delete ${slot.label}`}
              className="flex items-center justify-center border border-hairline px-3 py-2 text-graphite transition-colors hover:border-teal-deep hover:text-teal-deep disabled:opacity-60"
            >
              {busy === "del" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={OK_TYPES.join(",")}
          onChange={onFile}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default function MediaManager() {
  return (
    <div className="space-y-14">
      {slotGroups.map((group) => {
        const slots = mediaSlots.filter((s) => s.group === group.id);
        return (
          <section key={group.id}>
            <div className="flex items-baseline gap-4 border-b border-hairline pb-3">
              <h2 className="font-display text-lg font-semibold text-ink">
                {group.title}
              </h2>
              <span className="font-mono text-xs text-mist">
                {slots.length} slot{slots.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => (
                <SlotCard key={slot.key} slot={slot} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
