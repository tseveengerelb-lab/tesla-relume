import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Supabase client that acts as the signed-in user, for /admin.
 * The session lives in cookies; Row Level Security decides what the user may do.
 * Returns null when the environment variables are not set.
 */
export async function createAuthClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, which cannot set cookies.
          // proxy.ts refreshes the session before the page renders, so this is safe to ignore.
        }
      },
    },
  });
}

type AuthClient = NonNullable<Awaited<ReturnType<typeof createAuthClient>>>;

export type AdminCheck =
  | { status: "ok"; supabase: AuthClient; email: string }
  | { status: "signed-out" }
  | { status: "not-admin" }
  | { status: "not-configured" };

/** The signed-in user, if they are listed in public.admins. */
export async function getAdmin(): Promise<AdminCheck> {
  const supabase = await createAuthClient();
  if (!supabase) return { status: "not-configured" };

  // getClaims verifies the JWT; never trust getSession() on the server.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return { status: "signed-out" };

  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", claims.sub).maybeSingle();
  if (!admin) return { status: "not-admin" };

  return { status: "ok", supabase, email: String(claims.email ?? "") };
}
