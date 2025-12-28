import StatsOverview from "@/components/user_stats/userStats";
import { createClient } from "@/lib/supabase/server";
import { userStats } from "@/types/user_types";
const StatsPage = async () => {
  const supabase = createClient();

  const user = await (await supabase).auth.getUser();
  if (!user.data.user) {
    return (
      <main className="flex flex-col items-center justify-center p-2">
        <p>Usuario no encontrado.</p>
      </main>
    );
  }
  const { data: userData } = await (await supabase)
    .from("user_data")
    .select("*")
    .eq("user_id", user.data.user.id)
    .single();

  if (!userData) {
    return (
      <main className="flex flex-col items-center justify-center p-2">
        <p>Usuario no encontrado.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center p-2">
      <StatsOverview stats={userData} />
    </main>
  );
};

export default StatsPage;
