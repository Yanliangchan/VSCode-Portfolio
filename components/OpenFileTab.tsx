'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { VscClose } from 'react-icons/vsc';

import styles from '@/styles/OpenFileTab.module.css';

interface OpenFileTabProps {
  icon: string;
  filename: string;
  path: string;
}

const OpenFileTab = ({ icon, filename, path }: OpenFileTabProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === path;

  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
  };

  return (
    <Link href={path}>
      <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
        <Image src={icon} alt={filename} height={18} width={18} />
        <p>{filename}</p>
        <span className={styles.tabAction}>
          <span className={styles.dirtyDot} />
          <span
            className={styles.closeButton}
            role="button"
            tabIndex={-1}
            aria-label={`Close ${filename}`}
            onClick={handleClose}
          >
            <VscClose size={14} />
          </span>
        </span>
      </div>
    </Link>
  );
};

export default OpenFileTab;
