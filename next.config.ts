import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Traces only the production dependencies each route actually needs into
  // .next/standalone instead of running the server against the full
  // node_modules tree (646MB, most of it build-only tooling like eslint and
  // typescript) — cuts the module graph Node has to resolve and hold
  // compiled bytecode for at runtime, which is the largest lever on RSS for
  // a Next.js server. See package.json's start script for how this is
  // invoked; see the deploy commit for why the port is hardcoded there
  // rather than left to an env var.
  output: 'standalone',
  // This app has no ISR/static pages to benefit from Next's in-memory Data
  // Cache (proxy.ts's per-request nonce forces every route dynamic; the one
  // timed fetch in app/github/page.tsx is a few KB of JSON). Cap it small
  // rather than leave the 50MB default sitting unused.
  cacheMaxMemorySize: 8 * 1024 * 1024,
  images: {
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com', protocol: 'https' },
      { hostname: 'imgur.com', protocol: 'https' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
