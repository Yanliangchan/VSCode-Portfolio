'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import styles from '@/styles/Minimap.module.css';

// Deterministic pseudo-random generator so bar widths don't shift on
// every re-render/hydration — seeded by index, not Math.random().
const seededWidth = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const frac = x - Math.floor(x);
  return 30 + frac * 65; // 30–95% width
};

const LINE_HEIGHT = 5;
const LINE_GAP = 3;
const MAX_LINES = 160;

const Minimap = () => {
  const pathname = usePathname();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState({ top: 0, ratio: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.getElementById('main-editor');
    if (!main) return;

    const measure = () => {
      setContentHeight(main.scrollHeight);
      const scrollable = main.scrollHeight - main.clientHeight;
      setScrollProgress({
        top: scrollable <= 0 ? 0 : main.scrollTop / scrollable,
        ratio: main.clientHeight / main.scrollHeight,
      });
    };

    measure();
    main.addEventListener('scroll', measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(main);

    return () => {
      main.removeEventListener('scroll', measure);
      resizeObserver.disconnect();
    };
  }, [pathname]);

  const lineCount = Math.min(
    MAX_LINES,
    Math.max(12, Math.round(contentHeight / 18))
  );

  const bars = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => seededWidth(i + pathname.length)),
    [lineCount, pathname]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const main = document.getElementById('main-editor');
    const root = rootRef.current;
    if (!main || !root) return;

    const rect = root.getBoundingClientRect();
    const clickRatio = (e.clientY - rect.top) / rect.height;
    main.scrollTop = clickRatio * (main.scrollHeight - main.clientHeight);
  };

  return (
    <div className={styles.minimap} ref={rootRef} onClick={handleClick}>
      <div className={styles.lines}>
        {bars.map((width, i) => (
          <div
            key={i}
            className={styles.line}
            style={{
              width: `${width}%`,
              height: `${LINE_HEIGHT}px`,
              marginBottom: `${LINE_GAP}px`,
            }}
          />
        ))}
      </div>
      <div
        className={styles.viewport}
        style={{
          top: `${scrollProgress.top * (1 - scrollProgress.ratio) * 100}%`,
          height: `${scrollProgress.ratio * 100}%`,
        }}
      />
    </div>
  );
};

export default Minimap;
