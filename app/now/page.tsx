import { Metadata } from 'next';
import { VscPulse } from 'react-icons/vsc';

import { nowItems } from '@/data/now';

import styles from '@/styles/NowPage.module.css';

export const metadata: Metadata = {
  title: 'Now',
};

const NowPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <VscPulse className={styles.icon} size={24} />
          </div>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>Now</h1>
            <p className={styles.subtitle}>
              What I&apos;m currently working on and learning.
            </p>
          </div>
        </header>

        <div className={styles.list}>
          {nowItems.map((item, index) => (
            <div className={styles.item} key={index}>
              <span className={styles.since}>{item.since}</span>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NowPage;
