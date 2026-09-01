'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import WindowChrome from '@/components/WindowChrome';
import ActivityRail from '@/components/ActivityRail';
import FileTree from '@/components/FileTree';
import StatusLine from '@/components/StatusLine';
import OpenFiles from '@/components/OpenFiles';
import Breadcrumbs from '@/components/Breadcrumbs';
import Terminal from '@/components/Terminal';
import ActionLauncher from '@/components/ActionLauncher';
import GoToFile from '@/components/GoToFile';
import FindBar from '@/components/FindBar';
import SplitView from '@/components/SplitView';
import Minimap from '@/components/Minimap';
import MatrixRain from '@/components/MatrixRain';
import { useSettings } from '@/lib/SettingsContext';

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
  const [isActionLauncherOpen, setIsActionLauncherOpen] = useState(false);
  const [isGoToFileOpen, setIsGoToFileOpen] = useState(false);
  const [goToFileMode, setGoToFileMode] = useState<'navigate' | 'split'>('navigate');
  const [isFindBarOpen, setIsFindBarOpen] = useState(false);
  const [chordKey, setChordKey] = useState<string | null>(null);
  const [isMatrixRainOn, setIsMatrixRainOn] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [splitPath, setSplitPath] = useState<string | null>(null);
  const { minimapEnabled } = useSettings();

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev);
  }, []);

  const openActionLauncher = useCallback(() => {
    setIsActionLauncherOpen(true);
  }, []);

  const closeActionLauncher = useCallback(() => {
    setIsActionLauncherOpen(false);
  }, []);

  const openGoToFile = useCallback((mode: 'navigate' | 'split' = 'navigate') => {
    setGoToFileMode(mode);
    setIsGoToFileOpen(true);
  }, []);

  const closeGoToFile = useCallback(() => {
    setIsGoToFileOpen(false);
  }, []);

  const openFindBar = useCallback(() => {
    setIsFindBarOpen(true);
  }, []);

  const closeFindBar = useCallback(() => {
    setIsFindBarOpen(false);
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
    if (!main) return;

    // #main-editor is its own scroll container, not the window, so the
    // browser's native hash-scroll (which targets window scroll) never
    // reaches it — scroll the target into view within it manually instead.
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;

    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    } else {
      main.scrollTop = 0;
    }

    // Matches are page-specific — don't carry stale highlights/results
    // over to whatever page is navigated to next.
    setIsFindBarOpen(false);
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
      'color: #58a6ff; font-family: monospace;'
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
      if (isActionLauncherOpen || isGoToFileOpen) return;

      if (isZenMode && e.key === 'Escape') {
        e.preventDefault();
        toggleZenMode();
        return;
      }

      if (isFindBarOpen && e.key === 'Escape') {
        closeFindBar();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        if (e.target instanceof Element && e.target.closest('input, textarea')) {
          // Don't steal focus from the terminal input or other fields —
          // the browser's native find still works there as a fallback.
          return;
        }
        e.preventDefault();
        openFindBar();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        openActionLauncher();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        openGoToFile();
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
        openActionLauncher();
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
  }, [toggleTerminal, openActionLauncher, openGoToFile, openFindBar, closeFindBar, toggleZenMode, chordKey, router, isActionLauncherOpen, isGoToFileOpen, isFindBarOpen, isZenMode]);

  if (isEmbedded) {
    return (
      <main id="main-editor" className={styles.content}>
        {children}
      </main>
    );
  }

  return (
    <div className={styles.layout}>
      {!isZenMode && <WindowChrome onOpenCommandPalette={openActionLauncher} />}
      <div className={styles.main}>
        {!isZenMode && <ActivityRail />}
        {!isZenMode && <FileTree />}
        <div className={styles.editorContainer}>
          {!isZenMode && <OpenFiles onSplitEditor={() => openGoToFile('split')} />}
          {!isZenMode && <Breadcrumbs />}
          <div className={styles.editorWithTerminal}>
            <div className={styles.editorRow}>
              <main id="main-editor" className={styles.content}>
                {children}
              </main>
              <FindBar isOpen={isFindBarOpen} onClose={closeFindBar} />
              {splitPath && !isZenMode && (
                <SplitView path={splitPath} onClose={closeSplit} />
              )}
              {!isZenMode && minimapEnabled && <Minimap />}
            </div>
            {isTerminalOpen && <Terminal onToggle={toggleTerminal} />}
          </div>
        </div>
      </div>
      {!isZenMode && (
        <StatusLine onTerminalToggle={toggleTerminal} isTerminalOpen={isTerminalOpen} />
      )}
      {isZenMode && (
        <button className={styles.zenExit} onClick={toggleZenMode}>
          Exit Zen Mode (Esc)
        </button>
      )}
      <ActionLauncher
        isOpen={isActionLauncherOpen}
        onClose={closeActionLauncher}
        onToggleTerminal={toggleTerminal}
        isTerminalOpen={isTerminalOpen}
        onToggleZenMode={toggleZenMode}
        isZenMode={isZenMode}
        onOpenSplit={() => openGoToFile('split')}
      />
      <GoToFile
        isOpen={isGoToFileOpen}
        onClose={closeGoToFile}
        mode={goToFileMode}
        onSplitSelect={openSplit}
      />
      {isMatrixRainOn && (
        <MatrixRain onDismiss={() => setIsMatrixRainOn(false)} />
      )}
    </div>
  );
};

export default Layout;
