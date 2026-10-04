import { NextResponse } from "next/server";

// Tiny persistent counter API (resume downloads + GitHub clicks).
//
// Storage: Upstash Redis over its REST API. In Vercel: Storage → Create →
// Upstash Redis (Marketplace) → connect it to this project; that injects the
// env vars below automatically (names differ by integration, both work).
// Without storage the API answers { count: null } and the badges simply stay
// hidden — it never shows a number it can't keep.
export const dynamic = "force-dynamic";

const COUNTER_KEYS = {
  resume: "asjid-portfolio:resume-downloads",
  github: "asjid-portfolio:github-clicks",
} as const;
type CounterKey = keyof typeof COUNTER_KEYS;

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const NO_STORE = { "Cache-Control": "no-store" };

function isKey(k: unknown): k is CounterKey {
  return typeof k === "string" && k in COUNTER_KEYS;
}

async function redis(command: (string | number)[]): Promise<unknown> {
  const r = await fetch(REDIS_URL as string, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  const j = (await r.json()) as { result?: unknown; error?: string };
  if (j.error) throw new Error(j.error);
  return j.result;
}

async function read(key: CounterKey): Promise<number> {
  const v = await redis(["GET", COUNTER_KEYS[key]]);
  return v == null ? 0 : Number(v) || 0;
}

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!isKey(key)) return NextResponse.json({ error: "bad key" }, { status: 400, headers: NO_STORE });
  if (!REDIS_URL || !REDIS_TOKEN) return NextResponse.json({ count: null }, { headers: NO_STORE });
  try {
    return NextResponse.json({ count: await read(key) }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ count: null }, { headers: NO_STORE });
  }
}

// best-effort flood guard: one increment per IP+counter every 3 s
const lastHit = new Map<string, number>();

export async function POST(req: Request) {
  // same-site browser requests only
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE });
  }
  // ignore crawlers / link-preview bots
  if (/bot|crawl|spider|preview|headless|lighthouse/i.test(req.headers.get("user-agent") ?? "")) {
    return NextResponse.json({ count: null }, { headers: NO_STORE });
  }

  let key: unknown;
  try {
    key = ((await req.json()) as { key?: unknown }).key;
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400, headers: NO_STORE });
  }
  if (!isKey(key)) return NextResponse.json({ error: "bad key" }, { status: 400, headers: NO_STORE });
  if (!REDIS_URL || !REDIS_TOKEN) return NextResponse.json({ count: null }, { headers: NO_STORE });

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const id = `${ip}:${key}`;
  const now = Date.now();
  const tooSoon = now - (lastHit.get(id) ?? 0) < 3000;
  lastHit.set(id, now);
  if (lastHit.size > 500) {
    for (const [k, t] of lastHit) if (now - t > 60_000) lastHit.delete(k);
  }

  try {
    const count = tooSoon ? await read(key) : Number(await redis(["INCR", COUNTER_KEYS[key]]));
    return NextResponse.json({ count }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ count: null }, { headers: NO_STORE });
  }
}
