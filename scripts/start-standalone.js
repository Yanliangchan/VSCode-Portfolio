// Thin entrypoint around Next's generated .next/standalone/server.js.
//
// V8 doesn't return decommitted heap pages to the OS between requests on a
// long-lived process — RSS sits at the traffic burst's high-water mark
// until a major GC actually runs, and V8's own idle-GC heuristics are
// tuned for throughput, not for a mostly-idle personal site. Requires
// NODE_OPTIONS to include --expose-gc (set in package.json's start
// script); without it this is a no-op and the server still runs normally.
if (global.gc) {
  const IDLE_GC_INTERVAL_MS = 30_000;
  setInterval(() => {
    global.gc();
  }, IDLE_GC_INTERVAL_MS).unref();
} else {
  console.error(
    'scripts/start-standalone.js: global.gc() unavailable — start with NODE_OPTIONS=--expose-gc for idle memory to be reclaimed.'
  );
}

require('../.next/standalone/server.js');
