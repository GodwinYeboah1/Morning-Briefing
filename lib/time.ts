export const TIME_ZONE = process.env.APP_TIME_ZONE ?? "America/New_York";

// Minutes the zone is offset from UTC at a given instant (e.g. -240 for EDT).
function zoneOffsetMinutes(at: Date, timeZone: string): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName")!.value; // "GMT-04:00" or "GMT"

  const match = name.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3]);
  return match[1] === "-" ? -minutes : minutes;
}

// UTC instant of local midnight for a calendar date in the zone.
function zonedMidnight(y: number, m: number, d: number, timeZone: string) {
  const guess = new Date(Date.UTC(y, m - 1, d));
  return new Date(guess.getTime() - zoneOffsetMinutes(guess, timeZone) * 60_000);
}

// Calendar date in the zone, e.g. "2026-10-17".
export function todayKey(now: Date, timeZone = TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

// [start, end) of a calendar day in the zone, as UTC instants for a database query.
export function dayRange(day: string, timeZone = TIME_ZONE) {
  const [y, m, d] = day.split("-").map(Number);
  return {
    start: zonedMidnight(y, m, d, timeZone),
    end: zonedMidnight(y, m, d + 1, timeZone),
  };
}

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

// "9:30 AM" in the app's zone.
export function formatTime(iso: string | Date): string {
  return timeFormat.format(new Date(iso));
}
