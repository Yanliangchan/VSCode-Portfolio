'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { VscChevronRight } from 'react-icons/vsc';

import styles from '@/styles/Breadcrumbs.module.css';

const BREADCRUMB_MAP: Record<string, { filename: string; icon: string; symbol: string }> = {
  '/': { filename: 'home.tsx', icon: '/logos/react_icon.svg', symbol: 'HomePage' },
  '/about': { filename: 'about.html', icon: '/logos/html_icon.svg', symbol: 'AboutPage' },
  '/contact': { filename: 'contact.css', icon: '/logos/css_icon.svg', symbol: 'ContactPage' },
  '/projects': { filename: 'projects.js', icon: '/logos/js_icon.svg', symbol: 'ProjectsPage' },
  '/now': { filename: 'now.txt', icon: '/logos/txt_icon.svg', symbol: 'NowPage' },
  '/github': { filename: 'github.md', icon: '/logos/markdown_icon.svg', symbol: 'GithubPage' },
  '/settings': { filename: 'settings.tsx', icon: '/logos/react_icon.svg', symbol: 'SettingsPage' },
  '/extensions': { filename: 'extensions.tsx', icon: '/logos/react_icon.svg', symbol: 'ExtensionsPage' },
  '/source-control': { filename: 'source-control.tsx', icon: '/logos/react_icon.svg', symbol: 'SourceControlPage' },
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const entry = BREADCRUMB_MAP[pathname];

  if (!entry) return null;

  return (
    <div className={styles.breadcrumbs}>
      <span className={styles.crumb}>Portfolio</span>
      <VscChevronRight className={styles.separator} />
      <span className={styles.crumb}>
        <Image
          src={entry.icon}
          alt=""
          height={14}
          width={14}
          className={styles.crumbIcon}
        />
        {entry.filename}
      </span>
      <VscChevronRight className={styles.separator} />
      <span className={`${styles.crumb} ${styles.symbol}`}>{entry.symbol}</span>
    </div>
  );
};

export default Breadcrumbs;
