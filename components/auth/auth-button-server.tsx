import { createClient } from "@/lib/supabase/server";
import { AuthButtonClient } from "./auth-button-client";

export default async function authButtonServer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AuthButtonClient session={user ?? null} />;
}
