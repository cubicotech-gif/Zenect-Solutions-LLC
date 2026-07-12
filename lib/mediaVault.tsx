"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getStore, STORE_BUCKET } from "./supabaseClient";

// Client-side registry of uploaded images. Loads the bucket listing once, then
// hands out public URLs per slot. Components ask `useSlot(key)` and get either a
// URL or null (→ render a placeholder). Keeping this in one provider means a
// single storage list() call serves the whole page.

type VaultEntry = { url: string };

type VaultShape = {
  ready: boolean;
  resolve: (key: string) => VaultEntry | null;
  refresh: () => Promise<void>;
};

const VaultContext = createContext<VaultShape | null>(null);

export function MediaVaultProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const loadedOnce = useRef(false);

  const refresh = useCallback(async () => {
    const store = getStore();
    if (!store) {
      setReady(true);
      return;
    }
    const { data, error } = await store.storage
      .from(STORE_BUCKET)
      .list("", { limit: 200 });
    if (error || !data) {
      setReady(true);
      return;
    }
    const next: Record<string, string> = {};
    for (const obj of data) {
      if (obj.name === ".emptyFolderPlaceholder") continue;
      const stamp =
        (obj.updated_at as string | undefined) ||
        (obj.created_at as string | undefined) ||
        "";
      const bust = stamp ? `?v=${encodeURIComponent(stamp)}` : "";
      const { data: pub } = store.storage
        .from(STORE_BUCKET)
        .getPublicUrl(obj.name);
      next[obj.name] = `${pub.publicUrl}${bust}`;
    }
    setMap(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (loadedOnce.current) return;
    loadedOnce.current = true;
    void refresh();
  }, [refresh]);

  const resolve = useCallback(
    (key: string): VaultEntry | null => {
      const url = map[key];
      return url ? { url } : null;
    },
    [map]
  );

  const value = useMemo<VaultShape>(
    () => ({ ready, resolve, refresh }),
    [ready, resolve, refresh]
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultShape {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    return { ready: true, resolve: () => null, refresh: async () => {} };
  }
  return ctx;
}

export function useSlot(key: string) {
  const { ready, resolve } = useVault();
  return { ready, entry: resolve(key) };
}
