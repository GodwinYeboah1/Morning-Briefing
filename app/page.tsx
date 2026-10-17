import { Suspense } from "react";
import { connection } from "next/server";
import { CardSkeleton } from "@/components/hud-card";
import { HeadlinesCard } from "@/components/headlines-card";
import { JarvisCard } from "@/components/jarvis-card";
import { TasksCard } from "@/components/tasks-card";
import { WeatherCard } from "@/components/weather-card";
import { lock } from "@/app/auth-actions";
import { TIME_ZONE } from "@/lib/time";

async function TodayDate() {
  await connection(); // read the clock per request, not at build time
  const today = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return <>{today}</>;
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-10 border-b border-cyan-400/20 pb-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400/70">
            J.A.R.V.I.S. · Morning Briefing
          </p>
          <form action={lock}>
            <button
              type="submit"
              className="rounded-sm border border-cyan-400/40 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 transition hover:bg-cyan-400/15 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
            >
              Lock
            </button>
          </form>
        </div>
        <h1 className="mt-2 text-4xl font-light text-cyan-50 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)] sm:text-5xl">
          Good morning, Godwin
        </h1>
        <p className="mt-2 font-mono text-sm text-cyan-300/80">
          <Suspense fallback={<span className="opacity-0">loading date</span>}>
            <TodayDate />
          </Suspense>
        </p>
      </header>

      {/* Each card is its own Suspense boundary: they load in parallel and a
          slow or failing source never holds up the others. */}
      <div className="mb-6">
        <Suspense fallback={<CardSkeleton title="JARVIS Summary" />}>
          <JarvisCard />
        </Suspense>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardSkeleton title="Weather · Laurel, MD" />}>
          <WeatherCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton title="Today's Tasks" />}>
          <TasksCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton title="Tech Headlines" />}>
          <HeadlinesCard />
        </Suspense>
      </div>
    </main>
  );
}
