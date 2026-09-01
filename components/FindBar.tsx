'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { VscChevronUp, VscChevronDown, VscClose, VscCaseSensitive } from 'react-icons/vsc';

import styles from '@/styles/FindBar.module.css';

interface FindBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HIGHLIGHT_NAME = 'portfolio-find-match';
const HIGHLIGHT_ACTIVE_NAME = 'portfolio-find-match-active';

// The Custom Highlight API paints matches via Range objects rather than
// mutating the DOM (no wrapping <span>s) — the only safe way to highlight
// arbitrary text inside a React-owned subtree without risking a
// reconciliation crash if that subtree re-renders while a match is live.
// Not supported in every browser (older Firefox); find/count/navigate
// still work everywhere, highlighting is just a silent no-op there.
const supportsHighlightApi =
  typeof window !== 'undefined' && 'Highlight' in window && 'highlights' in CSS;

const HIGHLIGHT_STYLE_ID = 'find-bar-highlight-style';

// ::highlight() rules can't live in a CSS module (they're not scoped
// per-component) and Turbopack's CSS parser doesn't yet accept the
// syntax at build time either — inject the rule directly at runtime.
function ensureHighlightStyles() {
  if (document.getElementById(HIGHLIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = HIGHLIGHT_STYLE_ID;
  style.textContent = `
    ::highlight(${HIGHLIGHT_NAME}) {
      background-color: rgba(var(--accent-color-rgb), 0.35);
    }
    ::highlight(${HIGHLIGHT_ACTIVE_NAME}) {
      background-color: rgba(var(--accent-color-rgb), 0.65);
      color: var(--text-color);
    }
  `;
  document.head.appendChild(style);
}

function collectMatches(root: HTMLElement, query: string, caseSensitive: boolean): Range[] {
  if (!query) return [];

  const needle = caseSensitive ? query : query.toLowerCase();
  const ranges: Range[] = [];

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent || parent.closest('script, style')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? '';
    const haystack = caseSensitive ? text : text.toLowerCase();
    let fromIndex = 0;
    let idx = haystack.indexOf(needle, fromIndex);
    while (idx !== -1) {
      const range = document.createRange();
      range.setStart(node, idx);
      range.setEnd(node, idx + needle.length);
      ranges.push(range);
      fromIndex = idx + needle.length;
      idx = haystack.indexOf(needle, fromIndex);
    }
  }

  return ranges;
}

const FindBar = ({ isOpen, onClose }: FindBarProps) => {
  const [query, setQuery] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matches, setMatches] = useState<Range[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearHighlights = useCallback(() => {
    if (!supportsHighlightApi) return;
    CSS.highlights.delete(HIGHLIGHT_NAME);
    CSS.highlights.delete(HIGHLIGHT_ACTIVE_NAME);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      inputRef.current?.select();
    } else {
      setQuery('');
      setMatches([]);
      setActiveIndex(0);
      clearHighlights();
    }
  }, [isOpen, clearHighlights]);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.getElementById('main-editor');
    if (!root) return;

    setMatches(collectMatches(root, query, caseSensitive));
    setActiveIndex(0);
  }, [isOpen, query, caseSensitive]);

  useEffect(() => {
    if (!isOpen || !supportsHighlightApi) return;

    ensureHighlightStyles();

    if (matches.length === 0) {
      clearHighlights();
      return;
    }

    CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...matches));
    const active = matches[activeIndex];
    if (active) {
      CSS.highlights.set(HIGHLIGHT_ACTIVE_NAME, new Highlight(active));
      active.startContainer.parentElement?.scrollIntoView({ block: 'center' });
    }
  }, [isOpen, matches, activeIndex, clearHighlights]);

  // Belt-and-braces: clear highlights if this instance ever unmounts
  // outright (e.g. a route change remounts Layout's find bar by key).
  useEffect(() => () => clearHighlights(), [clearHighlights]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (matches.length === 0 ? 0 : (prev + 1) % matches.length));
  }, [matches.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (matches.length === 0 ? 0 : (prev - 1 + matches.length) % matches.length));
  }, [matches.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) goToPrev();
      else goToNext();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.bar}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find"
        className={styles.input}
        spellCheck={false}
        autoComplete="off"
      />
      <button
        type="button"
        className={`${styles.iconButton} ${caseSensitive ? styles.active : ''}`}
        onClick={() => setCaseSensitive((prev) => !prev)}
        title="Match Case"
      >
        <VscCaseSensitive size={16} />
      </button>
      <span className={styles.count}>
        {query === ''
          ? ''
          : matches.length === 0
            ? 'No results'
            : `${activeIndex + 1} of ${matches.length}`}
      </span>
      <button
        type="button"
        className={styles.iconButton}
        onClick={goToPrev}
        title="Previous Match (Shift+Enter)"
      >
        <VscChevronUp size={16} />
      </button>
      <button type="button" className={styles.iconButton} onClick={goToNext} title="Next Match (Enter)">
        <VscChevronDown size={16} />
      </button>
      <button type="button" className={styles.iconButton} onClick={onClose} title="Close (Escape)">
        <VscClose size={16} />
      </button>
    </div>
  );
};

export default FindBar;
