import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// A per-request nonce is required so Next.js can allow its own internal
// hydration/streaming inline scripts under a strict CSP, not just the
// hand-written theme-restore script in app/layout.tsx — a static
// hash-only CSP blocks those framework scripts and breaks hydration.
// This is Next.js's documented CSP pattern; it necessarily opts every
// page into dynamic rendering (no static prerendering is possible while
// a per-request nonce is in play).
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

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
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
