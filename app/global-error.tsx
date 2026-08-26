'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for debugging only — never render error.message/stack to the page.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: '#24292e',
          color: '#efefef',
          fontFamily: 'monospace',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Fatal Error
        </p>
        <h1 style={{ margin: 0, fontSize: '20px' }}>The application crashed</h1>
        <button
          onClick={reset}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: '#176f2c',
            color: '#dcffe4',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
