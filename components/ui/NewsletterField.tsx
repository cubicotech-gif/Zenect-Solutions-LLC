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
      <p className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-teal-soft">
        <Check size={16} /> You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-stretch gap-2 rounded-full bg-white p-1.5 shadow-card"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="w-full rounded-full bg-transparent px-4 text-sm text-ink placeholder:text-mist focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 font-display text-sm font-semibold text-navy transition-colors hover:bg-gold-deep disabled:opacity-60"
      >
        Subscribe <ArrowRight size={15} />
      </button>
      {state === "error" && (
        <span className="sr-only">Something went wrong.</span>
      )}
    </form>
  );
}
