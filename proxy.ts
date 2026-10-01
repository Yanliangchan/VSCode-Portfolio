import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Best-effort per-IP rate limiting. This app runs as a single long-lived
// Railway container (not serverless/edge functions), so an in-memory
// window survives across requests within that process — it just resets on
// redeploy and wouldn't be shared if this ever scales to multiple
// replicas. That's an acceptable tradeoff for a portfolio site; a real WAF
// (e.g. Cloudflare in front of Railway) is the stronger fix if abuse
// becomes a real problem.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => t > windowStart);

  timestamps.push(now);
  requestLog.set(ip, timestamps);

  // Opportunistic cleanup so the map doesn't grow unbounded from one-off
  // visitors — cheap relative to request volume, no separate timer needed.
  if (requestLog.size > 5000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => t <= windowStart)) requestLog.delete(key);
    }
  }

  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

// A per-request nonce is required so Next.js can allow its own internal
// hydration/streaming inline scripts under a strict CSP, not just the
// hand-written theme-restore script in app/layout.tsx — a static
// hash-only CSP blocks those framework scripts and breaks hydration.
// This is Next.js's documented CSP pattern; it necessarily opts every
// page into dynamic rendering (no static prerendering is possible while
// a per-request nonce is in play).
// Every route here is a read-only page — no forms, no API routes, nothing
// that acts on anything but GET/HEAD. Rejecting other methods up front
// closes off a surface that has no legitimate use (Next's default page
// rendering otherwise responds to POST/PUT/DELETE/etc. identically to GET).
// OPTIONS is deliberately excluded too: Next's router already 400s it on
// page routes with no handler of its own, so rejecting it here as well
// just makes that an explicit, consistent 405 instead of leaking a
// slightly confusing 400 from deeper in the framework.
const ALLOWED_METHODS = new Set(['GET', 'HEAD']);

export function proxy(request: NextRequest) {
  if (!ALLOWED_METHODS.has(request.method)) {
    return new NextResponse('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD' },
    });
  }

  // Railway sits in front of this app as the one trusted reverse proxy, and
  // (like any standard proxy chain) appends the IP it actually observed
  // rather than replacing the header outright — so the LAST entry is
  // Railway's own observation, while the FIRST is whatever the client sent
  // and can freely forge. Rate-limiting on the first entry let any visitor
  // bypass the limit entirely by sending a different fake value per
  // request; trusting only the one hop adjacent to us closes that.
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',').at(-1)?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  // Only the split-editor view's iframe'd pages (?embed=1) are ever framed,
  // and only by this same site — every other response keeps 'none' so the
  // clickjacking baseline isn't loosened site-wide for one narrow feature.
  const isEmbedded = request.nextUrl.searchParams.get('embed') === '1';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: avatars.githubusercontent.com imgur.com",
    "font-src 'self'",
    // github-contributions-api.jogruber.de: react-github-calendar
    // (used on /github) fetches contribution data from this third-party
    // host client-side, not from api.github.com.
    "connect-src 'self' api.github.com github-contributions-api.jogruber.de",
    `frame-ancestors ${isEmbedded ? "'self'" : "'none'"}`,
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', csp);
  // X-Frame-Options has no per-request scoping (unlike frame-ancestors
  // above), so it stays at the strict global default; browsers that honor
  // CSP2+ use frame-ancestors instead and correctly allow the embed case.
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
