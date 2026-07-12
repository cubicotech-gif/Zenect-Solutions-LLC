"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { getStore, storeConfigured } from "@/lib/supabaseClient";

type State = "idle" | "sending" | "done" | "error";

export default function NewsletterField() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("sending");

    const store = getStore();
    if (!store || !storeConfigured()) {
      setState("error");
      return;
    }
    const { error } = await store
      .from("newsletter_signups")
      .insert({ email: email.trim().toLowerCase(), source: "footer" });

    if (error) {
      // Unique-violation → treat as already subscribed, still a success to user.
      if (error.code === "23505") {
        setState("done");
        return;
      }
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-label text-clay">
        <Check size={14} /> You&rsquo;re on the list
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-stretch border border-hairline">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="w-full bg-panel px-3 py-2 text-sm text-ink placeholder:text-mist focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        aria-label="Subscribe"
        className="flex items-center bg-ink px-3 text-paper transition-colors hover:bg-clay disabled:opacity-60"
      >
        <ArrowRight size={16} />
      </button>
      {state === "error" && (
        <span className="sr-only">Something went wrong.</span>
      )}
    </form>
  );
}
