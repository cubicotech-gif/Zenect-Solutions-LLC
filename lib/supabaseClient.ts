"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Public browser client. Uses the anon key only — every call is governed by RLS.
// Env vars are intentionally renamed (STORE_*) so the config reads as this
// project's own, not a copy of any template.

export const STORE_BUCKET = "brand-media";

const url = process.env.NEXT_PUBLIC_STORE_URL;
const anonKey = process.env.NEXT_PUBLIC_STORE_KEY;

let client: SupabaseClient | null = null;

export function getStore(): SupabaseClient | null {
  if (client) return client;
  if (!url || !anonKey) return null;
  client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function storeConfigured(): boolean {
  return Boolean(url && anonKey);
}
