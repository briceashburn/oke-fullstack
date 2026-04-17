// In production, the nginx ingress intercepts /api/* and routes directly to the
// backend — this handler is only invoked in local development.
//
// Local: tries API_URL (localhost:8080) first. If the backend isn't running,
// falls back to NEXT_PUBLIC_API_FALLBACK_URL (production) server-side (no CORS).

const primary = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
const fallback = process.env.NEXT_PUBLIC_API_FALLBACK_URL ?? "";

async function tryFetch(base) {
  const res = await fetch(`${base}/hello-world`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    const data = await tryFetch(primary);
    return Response.json(data);
  } catch {
    if (!fallback || fallback === primary) {
      return Response.json({ error: "backend unavailable" }, { status: 502 });
    }
    try {
      const data = await tryFetch(fallback);
      return Response.json(data);
    } catch (e) {
      return Response.json({ error: e.message }, { status: 502 });
    }
  }
}
