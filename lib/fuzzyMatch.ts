/**
 * Scores how well `query` fuzzy-matches `target` (VSCode-style: characters
 * must appear in order but need not be contiguous). Returns null when the
 * query doesn't match at all, otherwise a score where higher is a better
 * match — consecutive-character and word-boundary matches score higher.
 */
export function fuzzyScore(query: string, target: string): number | null {
  if (!query.trim()) return 0;

  const q = query.toLowerCase();
  const t = target.toLowerCase();

  let score = 0;
  let queryIndex = 0;
  let lastMatchIndex = -1;

  for (let i = 0; i < t.length && queryIndex < q.length; i++) {
    if (t[i] === q[queryIndex]) {
      let charScore = 1;

      if (i === 0 || /[\s\-_/]/.test(t[i - 1])) {
        charScore += 3;
      }

      if (lastMatchIndex === i - 1) {
        charScore += 3;
      }

      score += charScore;
      lastMatchIndex = i;
      queryIndex++;
    }
  }

  if (queryIndex < q.length) return null;

  return score - target.length * 0.01;
}

/** Filters and sorts `items` by fuzzy match score against `query`. */
export function fuzzyFilter<T>(
  items: T[],
  query: string,
  getText: (item: T) => string
): T[] {
  if (!query.trim()) return items;

  return items
    .map((item) => ({ item, score: fuzzyScore(query, getText(item)) }))
    .filter((entry): entry is { item: T; score: number } => entry.score !== null)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
