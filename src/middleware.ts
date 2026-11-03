import { NextResponse, type NextRequest } from "next/server";

/** Lightweight in-memory rate limit for /api/contact (per edge isolate). */
const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 12;

function clientKey(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon"
  );
}

function allow(key: string) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now - row.t > WINDOW_MS) {
    hits.set(key, { n: 1, t: now });
    return true;
  }
  if (row.n >= MAX_HITS) return false;
  row.n += 1;
  return true;
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/contact") {
    if (request.method === "POST" && !allow(clientKey(request))) {
      return NextResponse.json(
        { success: false, error: "rate_limited" },
        { status: 429 },
      );
    }

    // Soft origin check — allow same-host and missing Origin (native apps / curl).
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const o = new URL(origin);
        if (o.host !== host && !o.host.endsWith(".vercel.app")) {
          // Still allow our known production hosts
          const allowed = [
            "davidwebsitebuilder.vercel.app",
            "localhost:43128",
            "127.0.0.1:43128",
          ];
          if (!allowed.includes(o.host) && o.host !== host) {
            return NextResponse.json(
              { success: false, error: "origin_blocked" },
              { status: 403 },
            );
          }
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "origin_blocked" },
          { status: 403 },
        );
      }
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-DNS-Prefetch-Control", "on");
  return res;
}

export const config = {
  matcher: ["/api/contact"],
};
