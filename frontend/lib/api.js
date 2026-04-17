// Server-side: uses internal cluster URL to avoid round-tripping through ingress
// Client-side: falls back to NEXT_PUBLIC_API_URL
const serverBase = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
const clientBase = process.env.NEXT_PUBLIC_API_URL ?? "";

export function getApiBase() {
  return typeof window === "undefined" ? serverBase : clientBase;
}

export async function fetchHelloWorld() {
  const res = await fetch(`${getApiBase()}/hello-world`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
