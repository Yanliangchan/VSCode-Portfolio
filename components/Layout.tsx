'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Explorer from '@/components/Explorer';
import Bottombar from '@/components/Bottombar';
import Tabsbar from '@/components/Tabsbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Terminal from '@/components/Terminal';
import CommandPalette from '@/components/CommandPalette';
import QuickOpen from '@/components/QuickOpen';
import SplitPane from '@/components/SplitPane';
import Minimap from '@/components/Minimap';
import MatrixRain from '@/components/MatrixRain';

import styles from '@/styles/Layout.module.css';

const KONAMI_SEQUENCE = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get('embed') === '1';
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickOpenOpen, setIsQuickOpenOpen] = useState(false);
  const [quickOpenMode, setQuickOpenMode] = useState<'navigate' | 'split'>('navigate');
  const [chordKey, setChordKey] = useState<string | null>(null);
  const [isMatrixRainOn, setIsMatrixRainOn] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [splitPath, setSplitPath] = useState<string | null>(null);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev);
  }, []);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  const openQuickOpen = useCallback((mode: 'navigate' | 'split' = 'navigate') => {
    setQuickOpenMode(mode);
    setIsQuickOpenOpen(true);
  }, []);

  const closeQuickOpen = useCallback(() => {
    setIsQuickOpenOpen(false);
  }, []);

  const toggleZenMode = useCallback(() => {
    setIsZenMode(prev => !prev);
  }, []);

  const openSplit = useCallback((path: string) => {
    setSplitPath(path);
  }, []);

  const closeSplit = useCallback(() => {
    setSplitPath(null);
  }, []);

  useEffect(() => {
    const main = document.getElementById('main-editor');
    if (main) {
      main.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    console.log(
      '%c' +
        [
          '   __   __          _ _',
          '   \\ \\ / /_ _ _ __  | (_) __ _ _ __   __ _',
          '    \\ V / _` | \'_ \\ | | |/ _` | \'_ \\ / _` |',
          '     | | (_| | | | || | | (_| | | | | (_| |',
          '     |_|\\__,_|_| |_||_|_|\\__,_|_| |_|\\__, |',
          '                                     |___/',
        ].join('\n'),
      'color: #f9826c; font-family: monospace;'
    );
    console.log(
      "Hey, you found the console 👋\nCybersecurity enthusiast, always open to a chat: yanliangchan@gmail.com"
    );
  }, []);

  useEffect(() => {
    const handleToggleMatrix = () => setIsMatrixRainOn(prev => !prev);
    window.addEventListener('toggle-matrix-rain', handleToggleMatrix);
    return () => window.removeEventListener('toggle-matrix-rain', handleToggleMatrix);
  }, []);

  useEffect(() => {
    let buffer: string[] = [];

    const handleKonami = (e: KeyboardEvent) => {
      buffer.push(e.key.toLowerCase());
      buffer = buffer.slice(-KONAMI_SEQUENCE.length);

      if (buffer.join(',') === KONAMI_SEQUENCE.join(',')) {
        document.documentElement.setAttribute('data-theme', 'hacker-green');
        localStorage.setItem('theme', 'hacker-green');
        setIsMatrixRainOn(true);
        window.dispatchEvent(
          new CustomEvent('add-notification', {
            detail: { message: 'Konami code accepted — hidden theme "hacker-green" unlocked.' },
          })
        );
        buffer = [];
      }
    };

    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, []);

  useEffect(() => {
    const navigationRoutes: Record<string, string> = {
      'h': '/',
      'a': '/about',
      'p': '/projects',
      'n': '/now',
      'c': '/contact',
      'g': '/github',
      's': '/settings',
      'e': '/extensions',
      'v': '/source-control',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCommandPaletteOpen || isQuickOpenOpen) return;

      if (isZenMode && e.key === 'Escape') {
        e.preventDefault();
        toggleZenMode();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        openCommandPalette();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        openQuickOpen();
        return;
      }

      const key = e.key.toLowerCase();

      if (chordKey === 'g' && navigationRoutes[key]) {
        e.preventDefault();
        router.push(navigationRoutes[key]);
        setChordKey(null);
        return;
      }

      if (chordKey === 'k' && key === 't') {
        e.preventDefault();
        openCommandPalette();
        setChordKey(null);
        return;
      }

      if (chordKey === 'k' && key === 'z') {
        e.preventDefault();
        toggleZenMode();
        setChordKey(null);
        return;
      }

      if ((key === 'g' || key === 'k') && !(e.target instanceof Element && e.target.closest('input, textarea'))) {
        e.preventDefault();
        setChordKey(key);
        setTimeout(() => setChordKey(null), 2000);
        return;
      }

      if (chordKey && key !== chordKey) {
        setChordKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal, openCommandPalette, openQuickOpen, toggleZenMode, chordKey, router, isCommandPaletteOpen, isQuickOpenOpen, isZenMode]);

  if (isEmbedded) {
    return (
      <main id="main-editor" className={styles.content}>
        {children}
      </main>
    );
  }

  return (
    <div className={styles.layout}>
      {!isZenMode && <Titlebar onOpenCommandPalette={openCommandPalette} />}
      <div className={styles.main}>
        {!isZenMode && <Sidebar />}
        {!isZenMode && <Explorer />}
        <div className={styles.editorContainer}>
          {!isZenMode && <Tabsbar onSplitEditor={() => openQuickOpen('split')} />}
          {!isZenMode && <Breadcrumbs />}
          <div className={styles.editorWithTerminal}>
            <div className={styles.editorRow}>
              <main id="main-editor" className={styles.content}>
                {children}
              </main>
              {splitPath && !isZenMode && (
                <SplitPane path={splitPath} onClose={closeSplit} />
              )}
              {!isZenMode && <Minimap />}
            </div>
            {isTerminalOpen && <Terminal onToggle={toggleTerminal} />}
          </div>
        </div>
      </div>
      {!isZenMode && (
        <Bottombar onTerminalToggle={toggleTerminal} isTerminalOpen={isTerminalOpen} />
      )}
      {isZenMode && (
        <button className={styles.zenExit} onClick={toggleZenMode}>
          Exit Zen Mode (Esc)
        </button>
      )}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={closeCommandPalette}
        onToggleTerminal={toggleTerminal}
        isTerminalOpen={isTerminalOpen}
        onToggleZenMode={toggleZenMode}
        isZenMode={isZenMode}
        onOpenSplit={() => openQuickOpen('split')}
      />
      <QuickOpen
        isOpen={isQuickOpenOpen}
        onClose={closeQuickOpen}
        mode={quickOpenMode}
        onSplitSelect={openSplit}
      />
      {isMatrixRainOn && (
        <MatrixRain onDismiss={() => setIsMatrixRainOn(false)} />
      )}
    </div>
  );
};

export default Layout;
