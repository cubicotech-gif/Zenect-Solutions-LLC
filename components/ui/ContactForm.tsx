"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { getStore, storeConfigured } from "@/lib/supabaseClient";

type State = "idle" | "sending" | "done" | "error";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<State>("idle");

  function set<K extends keyof typeof initial>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");

    const store = getStore();
    if (!store || !storeConfigured()) {
      setState("error");
      return;
    }
    const { error } = await store.from("inquiries").insert({
      full_name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      subject: form.subject.trim() || "General inquiry",
      body: form.message.trim(),
      status: "new",
    });

    if (error) {
      setState("error");
      return;
    }
    setState("done");
    setForm(initial);
  }

  if (state === "done") {
    return (
      <div className="border border-teal bg-sky/60 p-8">
        <div className="flex items-center gap-3 text-teal-deep">
          <Check size={20} />
          <p className="font-display text-lg font-medium">Message received.</p>
        </div>
        <p className="mt-3 text-sm text-graphite">
          A specialist will reply within one business day. For anything urgent,
          call us during business hours.
        </p>
        <button
          className="btn-ghost mt-6"
          onClick={() => setState("idle")}
          type="button"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="c-name">
            Name
          </label>
          <input
            id="c-name"
            required
            className="field"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            required
            className="field"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="c-phone">
            Phone <span className="text-mist">(optional)</span>
          </label>
          <input
            id="c-phone"
            className="field"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="c-subject">
            Subject
          </label>
          <input
            id="c-subject"
            className="field"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="c-message">
          How can we help?
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          className="field resize-none"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>

      {state === "error" && (
        <p className="border border-teal-deep bg-sky px-4 py-3 text-sm text-teal-deep">
          We couldn&rsquo;t send that. Check the connection and try again, or
          email us directly.
        </p>
      )}

      <button type="submit" className="btn-primary" disabled={state === "sending"}>
        {state === "sending" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Sending
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
