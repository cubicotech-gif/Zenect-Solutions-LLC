"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { getStore, storeConfigured } from "@/lib/supabaseClient";
import { divisions } from "@/lib/catalog";

type State = "idle" | "sending" | "done" | "error";

const initial = {
  name: "",
  email: "",
  phone: "",
  division: "",
  quantity: "1",
  notes: "",
};

export default function QuoteForm() {
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
    const { error } = await store.from("quote_requests").insert({
      full_name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      division: form.division || "Unspecified",
      quantity: Number(form.quantity) || 1,
      notes: form.notes.trim() || null,
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
      <div className="border border-clay bg-clay-wash/60 p-8">
        <div className="flex items-center gap-3 text-clay-deep">
          <Check size={20} />
          <p className="font-display text-lg font-medium">Quote request in.</p>
        </div>
        <p className="mt-3 text-sm text-graphite">
          We&rsquo;ll price it, confirm availability, and get back to you with a
          written quote — usually same day.
        </p>
        <button
          className="btn-ghost mt-6"
          onClick={() => setState("idle")}
          type="button"
        >
          Request another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="q-name">
            Name
          </label>
          <input
            id="q-name"
            required
            className="field"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="q-email">
            Email
          </label>
          <input
            id="q-email"
            type="email"
            required
            className="field"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_1fr_0.6fr]">
        <div>
          <label className="field-label" htmlFor="q-phone">
            Phone
          </label>
          <input
            id="q-phone"
            className="field"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="q-division">
            Category
          </label>
          <select
            id="q-division"
            className="field"
            value={form.division}
            onChange={(e) => set("division", e.target.value)}
          >
            <option value="">Select…</option>
            {divisions.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="q-qty">
            Units
          </label>
          <input
            id="q-qty"
            type="number"
            min={1}
            className="field"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="q-notes">
          Details <span className="text-mist">(model, timeline, setting)</span>
        </label>
        <textarea
          id="q-notes"
          rows={4}
          className="field resize-none"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>

      {state === "error" && (
        <p className="border border-clay-deep bg-clay-wash px-4 py-3 text-sm text-clay-deep">
          Couldn&rsquo;t submit the request. Please retry or call us.
        </p>
      )}

      <button type="submit" className="btn-clay" disabled={state === "sending"}>
        {state === "sending" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Submitting
          </>
        ) : (
          "Request quote"
        )}
      </button>
    </form>
  );
}
