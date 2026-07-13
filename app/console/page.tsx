"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, LogOut, Images, MessageSquare, ArrowLeft } from "lucide-react";
import MediaManager from "@/components/console/MediaManager";
import InboxPanel from "@/components/console/InboxPanel";
import { brand } from "@/lib/brand";
import { storeConfigured } from "@/lib/supabaseClient";

const SESSION_KEY = "zenect.console.ok";
const GATE = process.env.NEXT_PUBLIC_CONSOLE_KEY || "";

type Tab = "media" | "inbox";

export default function ConsolePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<Tab>("media");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
    }
    setChecked(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (GATE && pw === GATE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
      setErr(false);
    } else {
      setErr(true);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setPw("");
  }

  if (!checked) return null;

  // ── Gate ──────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <span className="font-display text-xl font-semibold tracking-wordmark">
              {brand.shortName}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-label text-teal">
              Console
            </span>
          </div>
          <div className="border border-hairline bg-panel p-8">
            <Lock size={18} className="text-teal" />
            <h1 className="mt-4 font-display text-xl font-semibold text-ink">
              Restricted
            </h1>
            <p className="mt-1 text-sm text-graphite">
              Enter the console passphrase to manage media and submissions.
            </p>
            {!GATE && (
              <p className="mt-4 border border-teal-deep bg-sky px-3 py-2 text-xs text-teal-deep">
                No passphrase is configured. Set NEXT_PUBLIC_CONSOLE_KEY.
              </p>
            )}
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                type="password"
                value={pw}
                autoFocus
                onChange={(e) => {
                  setPw(e.target.value);
                  setErr(false);
                }}
                placeholder="Passphrase"
                className="field"
              />
              {err && (
                <p className="text-xs text-teal-deep">
                  That passphrase didn&rsquo;t match.
                </p>
              )}
              <button type="submit" className="btn-primary w-full justify-center">
                Unlock
              </button>
            </form>
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-label text-mist hover:text-teal"
          >
            <ArrowLeft size={12} /> Back to site
          </Link>
        </div>
      </div>
    );
  }

  // ── Console ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
        <div className="frame flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-wordmark">
              {brand.shortName}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-label text-teal">
              Console
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden font-mono text-[0.66rem] uppercase tracking-label text-mist hover:text-teal sm:inline"
            >
              View site
            </Link>
            <button
              onClick={lock}
              className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-label text-graphite hover:text-teal-deep"
            >
              <LogOut size={13} /> Lock
            </button>
          </div>
        </div>
      </header>

      <div className="frame py-10">
        {!storeConfigured() && (
          <p className="mb-8 border border-teal-deep bg-sky px-4 py-3 text-sm text-teal-deep">
            Supabase env vars are not set — uploads and the inbox won&rsquo;t work
            until NEXT_PUBLIC_STORE_URL and NEXT_PUBLIC_STORE_KEY are configured.
          </p>
        )}

        {/* Tabs */}
        <div className="mb-10 flex border-b border-hairline">
          <TabButton
            active={tab === "media"}
            onClick={() => setTab("media")}
            icon={<Images size={15} />}
            label="Media"
          />
          <TabButton
            active={tab === "inbox"}
            onClick={() => setTab("inbox")}
            icon={<MessageSquare size={15} />}
            label="Submissions"
          />
        </div>

        {tab === "media" ? <MediaManager /> : <InboxPanel />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative -mb-px flex items-center gap-2 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-label transition-colors ${
        active
          ? "border-b-2 border-teal text-ink"
          : "border-b-2 border-transparent text-mist hover:text-ink"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
