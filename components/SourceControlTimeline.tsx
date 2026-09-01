'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VscTerminal, VscArrowRight } from 'react-icons/vsc';

import { commitLog, COMMIT_TYPE_LABELS, type CommitEntry, type CommitType } from '@/lib/sourceControlLog';
import styles from '@/styles/SourceControlPage.module.css';

const TYPES_USED = Array.from(new Set(commitLog.map((c) => c.type))) as CommitType[];
const FIRST_YEAR = commitLog[0].year;

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
              My story, versioned. Click a commit to run its diff.
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
                    <span className={styles[`type-${selected.type}`]}>{selected.id}</span>
                  </div>

                  <h2 className={styles.showTitle}>{selected.title}</h2>
                  {selected.meta && <p className={styles.showMeta}>{selected.meta}</p>}
                  <p className={styles.showDescription}>{selected.description}</p>

                  {selected.body?.map((paragraph, i) => (
                    <p className={styles.showParagraph} key={i}>
                      {paragraph}
                    </p>
                  ))}

                  {selected.list && (
                    <div className={styles.subCommand}>
                      <div className={styles.commandLine}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.command}>ls {selected.list.label}/</span>
                      </div>
                      <ul className={styles.listing}>
                        {selected.list.items.map((item) => (
                          <li className={styles.listingItem} key={item.name}>
                            <span className={styles.listingName}>{item.name}</span>
                            <span className={styles.listingDesc}>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selected.quote && (
                    <div className={styles.subCommand}>
                      <div className={styles.commandLine}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.command}>cat {selected.quote.file}</span>
                      </div>
                      <blockquote className={styles.quote}>{selected.quote.text}</blockquote>
                    </div>
                  )}

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
              <span className={styles.command}>git shortlog -s | wc -l</span>
            </div>
            <div className={styles.summaryLine}>
              {commitLog.length} commits since {FIRST_YEAR}
            </div>

            <div className={styles.legend}>
              {TYPES_USED.map((type) => (
                <span className={styles.legendItem} key={type}>
                  <span className={`${styles.legendDot} ${styles[`type-${type}`]}`} />
                  {type} <span className={styles.legendLabel}>· {COMMIT_TYPE_LABELS[type]}</span>
                </span>
              ))}
            </div>

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
