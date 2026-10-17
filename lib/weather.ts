import { TIME_ZONE } from "@/lib/time";

export const WEATHER_PLACE = "Laurel, MD";
const LAT = 39.0993;
const LON = -76.8483;

export type Forecast = {
  current: { temperature_2m: number };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

export async function getForecast(): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(LAT),
    longitude: String(LON),
    current: "temperature_2m",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    temperature_unit: "fahrenheit",
    timezone: TIME_ZONE,
    forecast_days: "1",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`);
  return res.json();
}
