'use client';

import { VscClose, VscSplitHorizontal } from 'react-icons/vsc';

import { fileTreeItems } from '@/components/FileTree';
import styles from '@/styles/SplitView.module.css';

interface SplitViewProps {
  path: string;
  onClose: () => void;
}

const SplitView = ({ path, onClose }: SplitViewProps) => {
  const file = fileTreeItems.find((item) => item.path === path);

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

export default SplitView;
