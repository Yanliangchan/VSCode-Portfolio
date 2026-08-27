'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Explorer from '@/components/Explorer';
import Bottombar from '@/components/Bottombar';
import Tabsbar from '@/components/Tabsbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Terminal from '@/components/Terminal';
import CommandPalette from '@/components/CommandPalette';
import QuickOpen from '@/components/QuickOpen';
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
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickOpenOpen, setIsQuickOpenOpen] = useState(false);
  const [chordKey, setChordKey] = useState<string | null>(null);
  const [isMatrixRainOn, setIsMatrixRainOn] = useState(false);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev);
  }, []);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  const openQuickOpen = useCallback(() => {
    setIsQuickOpenOpen(true);
  }, []);

  const closeQuickOpen = useCallback(() => {
    setIsQuickOpenOpen(false);
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
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCommandPaletteOpen || isQuickOpenOpen) return;

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
  }, [toggleTerminal, openCommandPalette, openQuickOpen, chordKey, router, isCommandPaletteOpen, isQuickOpenOpen]);

  return (
    <div className={styles.layout}>
      <Titlebar onOpenCommandPalette={openCommandPalette} />
      <div className={styles.main}>
        <Sidebar />
        <Explorer />
        <div className={styles.editorContainer}>
          <Tabsbar />
          <Breadcrumbs />
          <div className={styles.editorWithTerminal}>
            <main id="main-editor" className={styles.content}>
              {children}
            </main>
            {isTerminalOpen && <Terminal onToggle={toggleTerminal} />}
          </div>
        </div>
      </div>
      <Bottombar onTerminalToggle={toggleTerminal} isTerminalOpen={isTerminalOpen} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={closeCommandPalette}
        onToggleTerminal={toggleTerminal}
        isTerminalOpen={isTerminalOpen}
      />
      <QuickOpen isOpen={isQuickOpenOpen} onClose={closeQuickOpen} />
      {isMatrixRainOn && (
        <MatrixRain onDismiss={() => setIsMatrixRainOn(false)} />
      )}
    </div>
  );
};

export default Layout;
