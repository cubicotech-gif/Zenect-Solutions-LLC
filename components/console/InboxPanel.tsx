"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Mail, Phone, Loader2, Inbox } from "lucide-react";
import { getStore } from "@/lib/supabaseClient";

type Status = "new" | "read" | "replied" | "archived";
const FLOW: Status[] = ["new", "read", "replied", "archived"];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-clay text-paper",
  read: "bg-ink text-paper",
  replied: "border border-clay text-clay-deep",
  archived: "border border-hairline text-mist",
};

type Row = {
  id: string;
  created_at: string;
  status: Status;
  full_name: string;
  email: string;
  phone: string | null;
  // inquiry
  subject?: string | null;
  body?: string | null;
  // quote
  division?: string | null;
  quantity?: number | null;
  notes?: string | null;
};

type Source = { key: "inquiries" | "quote_requests"; label: string };
const SOURCES: Source[] = [
  { key: "inquiries", label: "Messages" },
  { key: "quote_requests", label: "Quote requests" },
];

function formatDate(iso: string) {
  // Deterministic, locale-independent formatting.
  const d = new Date(iso);
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export default function InboxPanel() {
  const [source, setSource] = useState<Source>(SOURCES[0]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const store = getStore();
    if (!store) {
      setError("Backend not configured.");
      setLoading(false);
      return;
    }
    const { data, error } = await store
      .from(source.key)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      setError(error.message);
      setRows([]);
    } else {
      setRows((data as Row[]) || []);
    }
    setLoading(false);
  }, [source]);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(row: Row, status: Status) {
    const store = getStore();
    if (!store) return;
    // Optimistic update
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    const { error } = await store
      .from(source.key)
      .update({ status })
      .eq("id", row.id);
    if (error) void load();
  }

  const counts = FLOW.reduce(
    (acc, s) => ({ ...acc, [s]: rows.filter((r) => r.status === s).length }),
    {} as Record<Status, number>
  );
  const visible =
    filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      {/* Source + refresh */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
        <div className="flex border border-hairline">
          {SOURCES.map((s) => (
            <button
              key={s.key}
              onClick={() => setSource(s)}
              className={`px-4 py-2 font-mono text-[0.66rem] uppercase tracking-label transition-colors ${
                source.key === s.key
                  ? "bg-ink text-paper"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => load()}
          className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-label text-graphite hover:text-clay"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Status filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`All · ${rows.length}`}
        />
        {FLOW.map((s) => (
          <FilterChip
            key={s}
            active={filter === s}
            onClick={() => setFilter(s)}
            label={`${s} · ${counts[s] || 0}`}
          />
        ))}
      </div>

      {/* List */}
      <div className="mt-6">
        {loading ? (
          <div className="flex items-center gap-3 py-16 text-mist">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        ) : error ? (
          <p className="border border-clay-deep bg-clay-wash px-4 py-3 text-sm text-clay-deep">
            {error}
          </p>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-mist">
            <Inbox size={22} />
            <p className="font-mono text-xs uppercase tracking-label">
              Nothing here yet
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-hairline border-y border-hairline">
            {visible.map((row) => (
              <li key={row.id} className="py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-label ${STATUS_STYLE[row.status]}`}
                      >
                        {row.status}
                      </span>
                      <p className="font-display text-base font-medium text-ink">
                        {row.full_name}
                      </p>
                      <span className="font-mono text-[0.62rem] text-mist">
                        {formatDate(row.created_at)}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-graphite">
                      <a
                        href={`mailto:${row.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-clay"
                      >
                        <Mail size={12} /> {row.email}
                      </a>
                      {row.phone && (
                        <a
                          href={`tel:${row.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-clay"
                        >
                          <Phone size={12} /> {row.phone}
                        </a>
                      )}
                    </div>

                    {source.key === "inquiries" ? (
                      <div className="mt-3 max-w-2xl">
                        {row.subject && (
                          <p className="text-sm font-medium text-ink">
                            {row.subject}
                          </p>
                        )}
                        <p className="mt-1 whitespace-pre-wrap text-sm text-graphite">
                          {row.body}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 max-w-2xl text-sm text-graphite">
                        <p>
                          <span className="text-mist">Category:</span>{" "}
                          {row.division} ·{" "}
                          <span className="text-mist">Units:</span>{" "}
                          {row.quantity}
                        </p>
                        {row.notes && (
                          <p className="mt-1 whitespace-pre-wrap">{row.notes}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status controls */}
                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    {FLOW.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(row, s)}
                        disabled={row.status === s}
                        className={`px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-label transition-colors ${
                          row.status === s
                            ? "cursor-default bg-ink text-paper"
                            : "border border-hairline text-graphite hover:border-clay hover:text-clay"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-label transition-colors ${
        active
          ? "bg-clay text-paper"
          : "border border-hairline text-graphite hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
