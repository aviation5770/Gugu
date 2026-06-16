import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types_db";

// Allow both NEXT_PUBLIC_* and non-public env names (some deploys use different names)
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL) as string;
const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY) as string;

if (!supabaseUrl || !supabaseKey) {
  // Fail early with a helpful error during server start / build if vars are missing
  // (don't leak secrets; we only state which variables are missing)
  const missing: string[] = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  if (!supabaseKey)
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY");

  throw new Error(
    `Supabase 환경 변수가 설정되지 않았습니다: ${missing.join(", ")}`,
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
