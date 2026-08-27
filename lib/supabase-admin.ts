import "server-only";

import { createClient } from "@supabase/supabase-js";

// `server-only` makes Next.js fail the build if this module reaches a client bundle.
// Defer validation until a request uses an operational route so `next build` needs no secrets.
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is required to create the Supabase admin client.");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to create the Supabase admin client.");
  return createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
