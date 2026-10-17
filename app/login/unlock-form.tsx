"use client";

import { useActionState } from "react";
import { unlock, type UnlockState } from "@/app/auth-actions";

const initialState: UnlockState = {};

export function UnlockForm() {
  const [state, formAction, pending] = useActionState(unlock, initialState);

  return (
    <form
      action={formAction}
      className="hud-card relative w-full max-w-sm animate-hud-in rounded-sm border border-cyan-400/30 bg-slate-950/70 px-6 py-10 text-center shadow-[0_0_18px_-4px_rgba(34,211,238,0.35)] backdrop-blur-sm sm:px-8"
    >
      {/* Arc-reactor style rings */}
      <div className="relative mx-auto mb-8 size-28">
        <div className="absolute inset-0 rounded-full border border-cyan-400/50 shadow-[0_0_24px_rgba(34,211,238,0.25)]" />
        <div className="absolute inset-3 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-cyan-400/35" />
        <div
          className={`absolute inset-8 rounded-full border transition ${
            state.error
              ? "border-rose-400/80 bg-rose-400/20 shadow-[0_0_20px_rgba(251,113,133,0.5)]"
              : "border-cyan-300/80 bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          }`}
        />
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
        J.A.R.V.I.S. · Morning Briefing
      </p>
      <h1 className="mt-2 text-3xl font-light text-cyan-50 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">
        Briefing locked
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
        Identity verification required
      </p>

      <label htmlFor="passcode" className="sr-only">
        Passcode
      </label>
      <input
        id="passcode"
        name="passcode"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        placeholder="Enter passcode"
        // Remount after each failed attempt so the field clears and the
        // shake replays.
        key={state.attempt ?? 0}
        className={`mt-8 w-full rounded-sm border bg-slate-950 px-5 py-3 text-center font-mono text-base tracking-[0.3em] text-cyan-50 placeholder:tracking-normal placeholder:text-cyan-200/40 outline-none transition ${
          state.error
            ? "animate-shake border-rose-400/70 focus:shadow-[0_0_0_4px_rgba(251,113,133,0.12)]"
            : "border-cyan-400/30 focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_0_20px_rgba(34,211,238,0.12)]"
        }`}
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-full rounded-sm border border-cyan-300/60 bg-cyan-400/15 py-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:bg-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] disabled:cursor-wait disabled:opacity-50"
      >
        {pending ? "Verifying…" : "Unlock"}
      </button>

      <p
        aria-live="polite"
        className="mt-4 min-h-5 font-mono text-sm text-rose-300/90"
      >
        {state.error}
      </p>
    </form>
  );
}
