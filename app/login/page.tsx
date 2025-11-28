"use client";

import { getBrowserSupabase } from "@/lib/supabase/client";
import LoginComponent from "@/components/auth/login/login";

const LoginContainerr = () => {
  const supabase = getBrowserSupabase();

  return (
    <main className="flex flex-col items-center justify-center  min-h-[calc(100vh-80px)] py-8">
      <LoginComponent supabase={supabase} />
    </main>
  );
};

export default LoginContainerr;
