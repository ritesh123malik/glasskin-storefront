import { createServerSupabase } from "@/lib/supabase-server";

export class AdminError extends Error {
  status: number;
  constructor(message: string, status = 403) {
    super(message);
    this.status = status;
  }
}

/**
 * Resolves the current Supabase user and asserts they have the admin role.
 * Uses the cookie-based server client with RLS so the role can only come from
 * the database, never from client-supplied input. Returns the user id when
 * authorized.
 */
export async function requireAdmin(): Promise<string> {
  const supabase = createServerSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new AdminError("Authentication required.", 401);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new AdminError("Admin access required.");
  }

  return user.id;
}

/** True when the current user has the admin role. */
export async function isAdmin(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}

/** Returns the authenticated user id from the request session, or null. */
export async function requireUser(): Promise<string> {
  const supabase = createServerSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new AdminError("Authentication required.", 401);
  return user.id;
}

