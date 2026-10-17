import { connection } from "next/server";
import { HudCard } from "@/components/hud-card";
import { Typewriter } from "@/components/typewriter";
import { type Briefing, getJarvisBriefing } from "@/lib/jarvis";
import { formatTime, todayKey } from "@/lib/time";
import { requireSession } from "@/lib/session";

const TITLE = "JARVIS Summary";

export async function JarvisCard() {
  await connection(); // "today" depends on the clock
  // Second check behind proxy.ts. Outside the try: redirect() works by
  // throwing, so catching it would break it.
  await requireSession();

  let briefing: Briefing;
  try {
    briefing = await getJarvisBriefing(todayKey(new Date()));
  } catch (err) {
    console.error("JARVIS card:", err);
    return (
      <HudCard title={TITLE}>
        <Typewriter
          text="JARVIS is offline, sir."
          className="font-mono text-cyan-200/60"
        />
      </HudCard>
    );
  }

  return (
    <HudCard title={TITLE}>
      {/* Only the finished text crosses to the browser; the key stays here. */}
      <Typewriter
        text={briefing.text}
        className="font-mono text-[15px] leading-7 text-cyan-50"
      />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-cyan-400/50">
        Compiled {formatTime(briefing.generatedAt)} · refreshes hourly
      </p>
    </HudCard>
  );
}
