const HN_API = "https://hacker-news.firebaseio.com/v0";

export type Story = { id: number; title: string; url: string };

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${HN_API}/${path}`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Hacker News responded ${res.status}`);
  return res.json();
}

export async function getTopStories(count = 5): Promise<Story[]> {
  const ids = await getJson<number[]>("topstories.json");

  // Fetch the stories in parallel; if one fails, keep the others.
  const results = await Promise.allSettled(
    ids
      .slice(0, count)
      .map((id) =>
        getJson<{ id: number; title?: string; url?: string } | null>(
          `item/${id}.json`,
        ),
      ),
  );

  return results.flatMap((r) =>
    r.status === "fulfilled" && r.value?.title
      ? [
          {
            id: r.value.id,
            title: r.value.title,
            // "Ask HN" posts have no external URL; link to the discussion.
            url:
              r.value.url ??
              `https://news.ycombinator.com/item?id=${r.value.id}`,
          },
        ]
      : [],
  );
}
