import { connection } from "next/server";
import { CardError, HudCard } from "@/components/hud-card";
import { getTasksForDay, type Task } from "@/lib/tasks";
import { formatTime, todayKey } from "@/lib/time";

export async function TasksCard() {
  // "Today" depends on the clock, so wait for a real request instead of
  // letting Next.js prerender this at build time.
  await connection();

  let tasks: Task[];
  try {
    tasks = await getTasksForDay(todayKey(new Date()));
  } catch (err) {
    console.error("Tasks card:", err);
    return (
      <HudCard title="Today's Tasks">
        <CardError message="Could not reach the task database." />
      </HudCard>
    );
  }

  return (
    <HudCard title="Today's Tasks">
      {tasks.length === 0 ? (
        <p className="font-mono text-sm text-cyan-200/60">
          No open tasks today. Schedule is clear.
        </p>
      ) : (
        <ol className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex gap-4">
              <time
                dateTime={task.starts_at}
                className="w-20 shrink-0 font-mono text-sm text-cyan-300"
              >
                {formatTime(task.starts_at)}
              </time>
              <div className="min-w-0">
                <p className="truncate text-cyan-50">{task.title}</p>
                {task.location && (
                  <p className="truncate text-xs text-cyan-200/50">
                    {task.location}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </HudCard>
  );
}
