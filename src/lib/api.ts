const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("blueprint_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

type ApiOptions = Omit<RequestInit, "body"> & { body?: Record<string, unknown> | string };

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const { body, ...rest } = options;
  const resolvedBody = typeof body === "object" && body !== null ? JSON.stringify(body) : (body as string | undefined);
  const res = await fetch(url, {
    ...rest,
    body: resolvedBody,
    headers: { ...getAuthHeaders(), ...(rest.headers as Record<string, string>) } as HeadersInit,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || err.message || `Request failed ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}
