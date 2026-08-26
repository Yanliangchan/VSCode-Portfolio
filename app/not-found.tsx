import Link from 'next/link';
import { VscError } from 'react-icons/vsc';

import styles from '@/styles/ErrorPage.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <VscError className={styles.icon} size={28} />
        </div>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>File Not Found</h1>
        <p className={styles.message}>
          The path you requested doesn&apos;t exist in this workspace.
        </p>
        <Link href="/" className={styles.link}>
          ← Back to home.tsx
        </Link>
      </div>
    </div>
  );
}
