import { useState, useCallback } from "react";
import { api } from "@/lib/api";

export function useApi<T, P extends unknown[] = []>(
  fetcher: (...args: P) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args: P) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher(...args);
        setData(result);
        return result;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Request failed";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return { data, error, loading, run };
}

export async function fetchPackages() {
  return api<{ packages: Package[] }>("/api/packages");
}

export type Package = {
  id: number;
  slug: string;
  type: "plan" | "addon";
  name_ro: string;
  name_en: string;
  badge_ro?: string;
  badge_en?: string;
  price: number;
  period: string | null;
  original_price?: number | null;
  description_ro?: string;
  description_en?: string;
  features_ro: string[];
  features_en: string[];
  is_popular: boolean;
  is_discount: boolean;
  discount_label_ro?: string | null;
  discount_label_en?: string | null;
  note_ro?: string | null;
  note_en?: string | null;
  sort_order: number;
};
