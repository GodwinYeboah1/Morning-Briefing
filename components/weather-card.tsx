import { connection } from "next/server";
import { CardError, HudCard } from "@/components/hud-card";
import { type Forecast, getForecast, WEATHER_PLACE } from "@/lib/weather";
import { requireSession } from "@/lib/session";

const TITLE = `Weather · ${WEATHER_PLACE}`;

export async function WeatherCard() {
  // Only for real requests: the session check reads the clock, which can't
  // run while Next.js prerenders or prefetches.
  await connection();
  // Second check behind proxy.ts. Outside the try: redirect() works by
  // throwing, so catching it would break it.
  await requireSession();

  let forecast: Forecast;
  try {
    forecast = await getForecast();
  } catch (err) {
    console.error("Weather card:", err);
    return (
      <HudCard title={TITLE}>
        <CardError message="Weather feed unavailable." />
      </HudCard>
    );
  }

  const now = Math.round(forecast.current.temperature_2m);
  const high = Math.round(forecast.daily.temperature_2m_max[0]);
  const low = Math.round(forecast.daily.temperature_2m_min[0]);
  const rain = forecast.daily.precipitation_probability_max[0];

  return (
    <HudCard title={TITLE}>
      <p className="font-mono text-6xl font-light text-cyan-50 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
        {now}°F
      </p>
      <dl className="mt-5 grid grid-cols-3 gap-3 font-mono text-sm">
        <Stat label="High" value={`${high}°`} />
        <Stat label="Low" value={`${low}°`} />
        <Stat label="Rain" value={`${rain}%`} />
      </dl>
    </HudCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-cyan-400/30 pl-3">
      <dt className="text-[10px] uppercase tracking-widest text-cyan-400/60">
        {label}
      </dt>
      <dd className="text-lg text-cyan-100">{value}</dd>
    </div>
  );
}
