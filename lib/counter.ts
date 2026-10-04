// Client helpers for the two silent visitor counters.
//   "resume" — how many times the resume PDF was downloaded
//   "github" — how many times the GitHub profile link was clicked
// The numbers are shown as bare badges (no label) — see <CountBadge />.
export type CounterKey = "resume" | "github";
export const COUNTER_EVENT = "counter-update";

export async function fetchCount(key: CounterKey): Promise<number | null> {
  try {
    const r = await fetch(`/api/counter?key=${key}`, { cache: "no-store" });
    if (!r.ok) return null;
    const j = (await r.json()) as { count?: number | null };
    return typeof j.count === "number" ? j.count : null;
  } catch {
    return null;
  }
}

// Adds 1 and tells every <CountBadge /> on the page the new total.
export async function trackCounter(key: CounterKey): Promise<void> {
  try {
    const r = await fetch("/api/counter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
      keepalive: true, // still delivered if the click navigates away
    });
    if (!r.ok) return;
    const j = (await r.json()) as { count?: number | null };
    if (typeof j.count === "number") {
      window.dispatchEvent(new CustomEvent(COUNTER_EVENT, { detail: { key, count: j.count } }));
    }
  } catch {
    /* counting must never break a click */
  }
}
