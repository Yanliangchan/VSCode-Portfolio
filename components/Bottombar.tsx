'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  VscCheck,
  VscError,
  VscWarning,
  VscSourceControl,
  VscTerminal,
} from 'react-icons/vsc';
import { SiNextdotjs } from 'react-icons/si';

import NotificationBell from '@/components/NotificationBell';
import styles from '@/styles/Bottombar.module.css';

const LANGUAGE_MODES: Record<string, string> = {
  '/': 'TypeScript JSX',
  '/about': 'HTML',
  '/contact': 'CSS',
  '/projects': 'JavaScript',
  '/now': 'Plain Text',
  '/github': 'Markdown',
  '/settings': 'TypeScript JSX',
};

interface BottombarProps {
  onTerminalToggle: () => void;
  isTerminalOpen: boolean;
}

const Bottombar = ({ onTerminalToggle, isTerminalOpen }: BottombarProps) => {
  const pathname = usePathname();
  const [line, setLine] = useState(1);

  useEffect(() => {
    setLine(1);
    const main = document.getElementById('main-editor');
    if (!main) return;

    const handleScroll = () => {
      const scrollable = main.scrollHeight - main.clientHeight;
      const progress = scrollable <= 0 ? 0 : main.scrollTop / scrollable;
      setLine(Math.max(1, Math.round(progress * 240) + 1));
    };

    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const languageMode = LANGUAGE_MODES[pathname] ?? 'Plain Text';

  return (
    <footer className={styles.bottomBar}>
      <div className={styles.container}>
        <a
          href="https://github.com/Yanliangchan"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
        >
          <VscSourceControl className={styles.icon} />
          <p>main</p>
        </a>
        <div className={styles.section}>
          <VscError className={styles.icon} />
          <p className={styles.errorText}>0</p>&nbsp;&nbsp;
          <VscWarning className={styles.icon} />
          <p>0</p>
        </div>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.section} ${isTerminalOpen ? styles.active : ''}`}
          onClick={onTerminalToggle}
          title="Toggle Terminal (Ctrl+`)"
        >
          <VscTerminal className={styles.icon} />
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <SiNextdotjs className={styles.icon} />
          <p>Powered by Next.js</p>
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <VscCheck className={styles.icon} />
          <p>Prettier</p>
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <p>Ln {line}, Col 1</p>
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <p>UTF-8</p>
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <p>LF</p>
        </div>
        <div className={`${styles.section} ${styles.hideOnMobile}`}>
          <p>{languageMode}</p>
        </div>
        <div className={styles.section}>
          <NotificationBell />
        </div>
      </div>
    </footer>
  );
};

export default Bottombar;
