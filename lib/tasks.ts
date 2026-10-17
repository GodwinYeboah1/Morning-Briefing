import "server-only";
import { getSupabase } from "@/lib/supabase";
import { dayRange } from "@/lib/time";

export type Task = {
  id: number;
  title: string;
  location: string | null;
  starts_at: string;
};

// Open tasks starting on `day` ("2026-10-17"), earliest first.
export async function getTasksForDay(day: string): Promise<Task[]> {
  const { start, end } = dayRange(day);

  const { data, error } = await getSupabase()
    .from("tasks")
    .select("id, title, location, starts_at")
    .eq("done", false)
    .gte("starts_at", start.toISOString())
    .lt("starts_at", end.toISOString())
    .order("starts_at", { ascending: true });

  if (error) throw error;
  return data;
}
