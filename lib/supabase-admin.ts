import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client with the secret key: bypasses Row Level Security.
 * Server-only — used where no user is signed in but the server must write
 * (the order form and the Byl webhook). Never import it from a Client Component.
 * Returns null when SUPABASE_SECRET_KEY is not set.
 */
export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
