import type { ReactNode } from "react";

export function HudCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="hud-card relative rounded-sm border border-cyan-400/30 bg-slate-950/70 p-5 shadow-[0_0_18px_-4px_rgba(34,211,238,0.35)] backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.9)]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CardError({ message }: { message: string }) {
  return (
    <p className="font-mono text-sm text-rose-300/90">
      <span className="text-rose-400">! SIGNAL LOST</span> — {message}
    </p>
  );
}

export function CardSkeleton({ title }: { title: string }) {
  return (
    <HudCard title={title}>
      <div className="space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-cyan-400/10" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-cyan-400/10" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-cyan-400/10" />
      </div>
    </HudCard>
  );
}
