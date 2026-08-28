import { Metadata } from 'next';
import { VscSourceControl, VscGitCommit, VscLinkExternal } from 'react-icons/vsc';

import styles from '@/styles/SourceControlPage.module.css';

export const metadata: Metadata = {
  title: 'Source Control',
};

export const revalidate = 600;

interface CommitEntry {
  sha: string;
  message: string;
  authorName: string;
  date: string;
  url: string;
}

async function getCommits(): Promise<CommitEntry[] | null> {
  const res = await fetch(
    'https://api.github.com/repos/Yanliangchan/VSCode-Portfolio/commits?per_page=15',
    { headers: { Accept: 'application/vnd.github+json' } }
  );

  if (!res.ok) {
    console.error(`Failed to fetch commits: ${res.status}`);
    return null;
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return null;
  }

  return data.map((item) => ({
    sha: item.sha,
    message: item.commit?.message?.split('\n')[0] ?? '(no message)',
    // Commits are pushed through an automated (AI pair-programming)
    // identity, so the raw git/GitHub author is never the right thing to
    // show visitors here — this is a single-owner portfolio repo, so
    // attribute every commit to its owner instead.
    authorName: 'Yanliangchan',
    date: item.commit?.author?.date ?? '',
    url: item.html_url,
  }));
}

function formatRelativeDate(iso: string): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - then) / 1000));

  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [30, 'day'],
    [12, 'month'],
    [Infinity, 'year'],
  ];

  let value = diffSec;
  let unit = 'second';
  for (const [size, name] of units) {
    if (value < size) {
      unit = name;
      break;
    }
    value = Math.floor(value / size);
    unit = name;
  }

  return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
}

const SourceControlPage = async () => {
  const commits = await getCommits();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <VscSourceControl className={styles.icon} size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Source Control</h1>
            <p className={styles.subtitle}>
              Real commit history for this repository, pulled live from
              GitHub.
            </p>
          </div>
        </header>

        {!commits ? (
          <p className={styles.error}>
            Unable to load commit history right now. Please try again later.
          </p>
        ) : (
          <ol className={styles.commitList}>
            {commits.map((commit) => (
              <li className={styles.commit} key={commit.sha}>
                <VscGitCommit className={styles.commitIcon} />
                <div className={styles.commitBody}>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.commitMessage}
                  >
                    {commit.message}
                    <VscLinkExternal size={11} className={styles.commitLinkIcon} />
                  </a>
                  <div className={styles.commitMeta}>
                    <span className={styles.sha}>{commit.sha.slice(0, 7)}</span>
                    <span>{commit.authorName}</span>
                    <span>{formatRelativeDate(commit.date)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SourceControlPage;
