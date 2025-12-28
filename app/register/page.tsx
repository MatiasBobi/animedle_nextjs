"use client";
import { getBrowserSupabase } from "@/lib/supabase/client";
import RegisterComponent from "@/components/auth/register/register";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const RegisterCointaner = () => {
  const supabase = getBrowserSupabase();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
  }, []);

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center  min-h-[calc(100vh-80px)] py-8">
      <RegisterComponent supabase={supabase} />
    </main>
  );
};

export default RegisterCointaner;
