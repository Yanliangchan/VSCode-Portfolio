'use client';

import { VscClose, VscSplitHorizontal } from 'react-icons/vsc';

import { explorerItems } from '@/components/Explorer';
import styles from '@/styles/SplitPane.module.css';

interface SplitPaneProps {
  path: string;
  onClose: () => void;
}

const SplitPane = ({ path, onClose }: SplitPaneProps) => {
  const file = explorerItems.find((item) => item.path === path);

  return (
    <div className={styles.splitPane}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <VscSplitHorizontal className={styles.headerIcon} />
          <span>{file?.name ?? path}</span>
        </div>
        <button className={styles.closeButton} onClick={onClose} title="Close split editor">
          <VscClose size={14} />
        </button>
      </div>
      <iframe
        src={`${path}?embed=1`}
        className={styles.frame}
        title={`${file?.name ?? path} (split)`}
      />
    </div>
  );
};

export default SplitPane;
