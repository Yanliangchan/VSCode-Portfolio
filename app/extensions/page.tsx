import { Metadata } from 'next';
import { VscExtensions, VscStarFull, VscCloudDownload, VscVerifiedFilled } from 'react-icons/vsc';

import styles from '@/styles/ExtensionsPage.module.css';

export const metadata: Metadata = {
  title: 'Extensions',
};

interface Extension {
  name: string;
  publisher: string;
  description: string;
  installs: string;
  rating: number;
  category: string;
}

const extensions: Extension[] = [
  {
    name: 'Penetration Testing',
    publisher: 'yanliangchan',
    description: 'Offensive security toolkit for identifying and exploiting vulnerabilities.',
    installs: '3.2k',
    rating: 5,
    category: 'Cybersecurity',
  },
  {
    name: 'Network Security',
    publisher: 'yanliangchan',
    description: 'Secure network architecture, monitoring, and defense.',
    installs: '2.8k',
    rating: 5,
    category: 'Cybersecurity',
  },
  {
    name: 'Cyber Risk Management',
    publisher: 'yanliangchan',
    description: 'Assess, prioritise, and mitigate organisational security risk.',
    installs: '1.9k',
    rating: 4,
    category: 'Cybersecurity',
  },
  {
    name: 'Security Automation',
    publisher: 'yanliangchan',
    description: 'Script and automate repetitive security testing workflows.',
    installs: '2.1k',
    rating: 5,
    category: 'Cybersecurity',
  },
  {
    name: 'React + Next.js',
    publisher: 'yanliangchan',
    description: 'Build fast, modern web applications and portfolios (like this one).',
    installs: '4.5k',
    rating: 5,
    category: 'Development',
  },
  {
    name: 'Python',
    publisher: 'yanliangchan',
    description: 'General-purpose scripting, tooling, and automation.',
    installs: '5.1k',
    rating: 5,
    category: 'Development',
  },
  {
    name: 'TypeScript',
    publisher: 'yanliangchan',
    description: 'Typed JavaScript for larger, more maintainable applications.',
    installs: '4.0k',
    rating: 5,
    category: 'Development',
  },
  {
    name: 'Linux & Systems',
    publisher: 'yanliangchan',
    description: 'Comfortable across Linux, Windows, and virtualised environments.',
    installs: '3.6k',
    rating: 4,
    category: 'Systems',
  },
  {
    name: 'Teaching & Leadership',
    publisher: 'yanliangchan',
    description: 'Explaining complex technical topics clearly, and leading teams.',
    installs: '2.4k',
    rating: 5,
    category: 'Other',
  },
  {
    name: 'Artificial Intelligence',
    publisher: 'yanliangchan',
    description: 'Applying AI/ML tools to real workflows and products.',
    installs: '3.0k',
    rating: 4,
    category: 'Other',
  },
];

const ExtensionsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <VscExtensions className={styles.icon} size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Extensions</h1>
            <p className={styles.subtitle}>
              Skills, installed and enabled. Search the marketplace above to
              find more — or scroll, they&apos;re all already here.
            </p>
          </div>
        </header>

        <div className={styles.list}>
          {extensions.map((ext) => (
            <div className={styles.card} key={ext.name}>
              <div className={styles.cardIcon}>
                {ext.name.slice(0, 2).toUpperCase()}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{ext.name}</h3>
                  <VscVerifiedFilled className={styles.verified} title="Verified" />
                </div>
                <p className={styles.cardDesc}>{ext.description}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.publisher}>{ext.publisher}</span>
                  <span className={styles.metaItem}>
                    <VscCloudDownload size={12} /> {ext.installs}
                  </span>
                  <span className={styles.metaItem}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <VscStarFull
                        key={i}
                        size={11}
                        className={i < ext.rating ? styles.starFilled : styles.starEmpty}
                      />
                    ))}
                  </span>
                  <span className={styles.category}>{ext.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPage;
