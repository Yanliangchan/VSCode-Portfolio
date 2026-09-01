'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VscTerminal, VscArrowRight } from 'react-icons/vsc';

import { commitLog, type CommitEntry } from '@/lib/sourceControlLog';
import styles from '@/styles/SourceControlPage.module.css';

const SourceControlTimeline = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected: CommitEntry | undefined = commitLog.find((c) => c.id === selectedId);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <VscTerminal className={styles.icon} size={22} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Source Control</h1>
            <p className={styles.subtitle}>
              My story, versioned. Click a commit to see the full diff.
            </p>
          </div>
        </header>

        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalTitle}>yanliang@portfolio — bash</span>
          </div>

          <div className={styles.terminalBody}>
            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>git log --oneline --reverse</span>
            </div>

            <ol className={styles.log}>
              {commitLog.map((commit) => (
                <li key={commit.id}>
                  <button
                    type="button"
                    className={`${styles.logLine} ${
                      selectedId === commit.id ? styles.logLineActive : ''
                    }`}
                    onClick={() =>
                      setSelectedId((prev) => (prev === commit.id ? null : commit.id))
                    }
                  >
                    <span className={styles.logYear}>{commit.year}</span>
                    <span className={`${styles.logType} ${styles[`type-${commit.type}`]}`}>
                      {commit.type}:
                    </span>
                    <span className={styles.logSlug}>{commit.slug}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.headLine}>
              <span className={styles.headBadge}>HEAD -&gt; main</span>
              <span className={styles.headMessage}>WIP: still building.</span>
            </div>

            {selected && (
              <div className={styles.show} key={selected.id}>
                <div className={styles.commandLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.command}>git show {selected.id}</span>
                </div>

                <div className={styles.showBody}>
                  <div className={styles.showCommitLine}>
                    commit{' '}
                    <span className={`${styles[`type-${selected.type}`]}`}>{selected.id}</span>
                  </div>

                  <h2 className={styles.showTitle}>{selected.title}</h2>
                  <p className={styles.showDescription}>{selected.description}</p>

                  {selected.link && (
                    <Link href={selected.link.href} className={styles.showLink}>
                      [ {selected.link.label} <VscArrowRight size={12} /> ]
                    </Link>
                  )}
                </div>
              </div>
            )}

            <div className={styles.commandLine}>
              <span className={styles.prompt}>$</span>
              <span className={styles.cursor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceControlTimeline;
