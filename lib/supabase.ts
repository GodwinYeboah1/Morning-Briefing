import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// `server-only` makes the build fail if a Client Component ever imports this
// file, so the secret key can never be bundled into browser JavaScript.

let client: SupabaseClient | undefined;

// Created lazily (not at import time) so a missing env var only breaks the
// card that needs Supabase, not the whole page.
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL or SUPABASE_SECRET_KEY is not set");
  }

  client = createClient(url, key, {
    // No user sessions on the server: we act as the app itself.
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
