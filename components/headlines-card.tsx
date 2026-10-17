import { CardError, HudCard } from "@/components/hud-card";
import { getTopStories, type Story } from "@/lib/headlines";

export async function HeadlinesCard() {
  let stories: Story[];
  try {
    stories = await getTopStories();
  } catch (err) {
    console.error("Headlines card:", err);
    return (
      <HudCard title="Tech Headlines">
        <CardError message="News feed unavailable." />
      </HudCard>
    );
  }

  return (
    <HudCard title="Tech Headlines">
      <ol className="space-y-3">
        {stories.map((story, i) => (
          <li key={story.id} className="flex gap-3">
            <span className="font-mono text-sm text-cyan-400/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-50 transition-colors hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
            >
              {story.title}
            </a>
          </li>
        ))}
      </ol>
    </HudCard>
  );
}
