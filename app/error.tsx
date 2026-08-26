'use client';

import { useEffect } from 'react';
import { VscWarning } from 'react-icons/vsc';

import styles from '@/styles/ErrorPage.module.css';

export default function ErrorPage({
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
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <VscWarning className={styles.icon} size={28} />
        </div>
        <p className={styles.code}>Error</p>
        <h1 className={styles.title}>Something Broke</h1>
        <p className={styles.message}>
          An unexpected error occurred while rendering this page.
        </p>
        <button onClick={reset} className={styles.button}>
          Reload
        </button>
      </div>
    </div>
  );
}
